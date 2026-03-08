import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MaintenanceState {
  isMaintenanceActive: boolean;
  title: string;
  message: string;
  estimatedReturn: string | null;
  isLoading: boolean;
}

export function useMaintenanceMode(): MaintenanceState {
  const [state, setState] = useState<MaintenanceState>({
    isMaintenanceActive: false,
    title: '🚧 Site en maintenance',
    message: 'Nous effectuons actuellement une mise à jour pour améliorer votre expérience.',
    estimatedReturn: null,
    isLoading: true,
  });

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value')
        .in('key', ['maintenance_mode', 'maintenance_title', 'maintenance_message', 'maintenance_estimated_return']);

      if (error) throw error;

      if (data) {
        const settings: Record<string, unknown> = {};
        data.forEach((row) => {
          try {
            settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
          } catch {
            settings[row.key] = row.value;
          }
        });

        setState((prev) => ({
          ...prev,
          isMaintenanceActive: settings.maintenance_mode === true,
          title: (settings.maintenance_title as string) || prev.title,
          message: (settings.maintenance_message as string) || prev.message,
          estimatedReturn: (settings.maintenance_estimated_return as string) || null,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching maintenance settings:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    const channel = supabase
      .channel('maintenance-mode-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_settings',
          filter: 'key=in.(maintenance_mode,maintenance_title,maintenance_message,maintenance_estimated_return)',
        },
        () => {
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSettings]);

  return state;
}
