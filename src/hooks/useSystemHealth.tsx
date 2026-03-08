import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
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
  const queryClient = useQueryClient();

  // Real-time subscription for live updates
  useEffect(() => {
    const analyticsChannel = supabase
      .channel('health-analytics-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_events' }, () => {
        queryClient.invalidateQueries({ queryKey: ['system-health'] });
      })
      .subscribe();

    const ordersChannel = supabase
      .channel('health-orders-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        queryClient.invalidateQueries({ queryKey: ['system-health'] });
      })
      .subscribe();

    const alertsChannel = supabase
      .channel('health-alerts-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'system_alerts' }, () => {
        queryClient.invalidateQueries({ queryKey: ['system-health'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(analyticsChannel);
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(alertsChannel);
    };
  }, [queryClient]);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['system-health'],
    queryFn: async (): Promise<HealthResult> => {
      const { data, error } = await supabase.functions.invoke('health-check');
      if (error) throw error;
      return data as HealthResult;
    },
    refetchInterval: 30000, // Every 30s for more responsive updates
    staleTime: 15000,
  });

  return {
    health: data,
    isLoading,
    isFetching,
    refetch,
  };
}
