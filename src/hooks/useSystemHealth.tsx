import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface HealthResult {
  timestamp: string;
  services: {
    database: { status: string; response_time_ms: number; error: string | null };
    storage: { status: string; response_time_ms: number; error: string | null };
    auth: { status: string; response_time_ms: number; error: string | null };
  };
  active_visitors: number;
  orders_24h: number;
  critical_alerts: number;
  total_response_time_ms: number;
  overall_status: string;
}

export function useSystemHealth() {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['system-health'],
    queryFn: async (): Promise<HealthResult> => {
      const { data, error } = await supabase.functions.invoke('health-check');
      if (error) throw error;
      return data as HealthResult;
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });

  return {
    health: data,
    isLoading,
    isFetching,
    refetch,
  };
}
