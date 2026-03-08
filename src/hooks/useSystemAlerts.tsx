import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SystemAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  message: string | null;
  source: string | null;
  status: string;
  metadata: any;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
}

interface AlertFilters {
  alert_type?: string;
  severity?: string;
  status?: string;
}

export function useSystemAlerts(filters: AlertFilters = {}) {
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['system-alerts', filters],
    queryFn: async () => {
      let query = supabase
        .from('system_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      
      if (filters.alert_type && filters.alert_type !== 'all') {
        query = query.eq('alert_type', filters.alert_type);
      }
      if (filters.severity && filters.severity !== 'all') {
        query = query.eq('severity', filters.severity);
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SystemAlert[];
    },
    refetchInterval: 30000,
  });

  const resolveAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('system_alerts')
        .update({ status: 'resolved', resolved_at: new Date().toISOString() })
        .eq('id', alertId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['system-alerts'] }),
  });

  const acknowledgeAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('system_alerts')
        .update({ status: 'acknowledged' })
        .eq('id', alertId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['system-alerts'] }),
  });

  const criticalOpen = alerts.filter(a => a.severity === 'critical' && a.status === 'open').length;
  const totalOpen = alerts.filter(a => a.status === 'open').length;
  const today = new Date().toISOString().split('T')[0];
  const resolvedToday = alerts.filter(a => a.status === 'resolved' && a.resolved_at?.startsWith(today)).length;

  return {
    alerts,
    isLoading,
    resolveAlert,
    acknowledgeAlert,
    stats: { criticalOpen, totalOpen, resolvedToday },
  };
}

export function useCriticalAlertCount() {
  const { data: count = 0 } = useQuery({
    queryKey: ['critical-alert-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('system_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open')
        .eq('severity', 'critical');
      if (error) return 0;
      return count || 0;
    },
    refetchInterval: 30000,
  });
  return count;
}
