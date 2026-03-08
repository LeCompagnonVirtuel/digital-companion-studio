import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  notifications: {
    newLeads: boolean;
    weeklyReport: boolean;
    marketingEmails: boolean;
  };
  social_links: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  business_info: {
    phone: string;
    address: string;
    hours: string;
  };
  maintenance_mode: boolean;
  maintenance_title: string;
  maintenance_message: string;
  maintenance_estimated_return: string | null;
}

const defaultSettings: AdminSettings = {
  site_name: 'LCV Digital',
  site_description: 'Agence digitale full-stack',
  contact_email: 'contact@lcvdigital.com',
  notifications: {
    newLeads: true,
    weeklyReport: true,
    marketingEmails: false,
  },
  social_links: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
  business_info: {
    phone: '',
    address: '',
    hours: '',
  },
  maintenance_mode: false,
  maintenance_title: '🚧 Site en maintenance',
  maintenance_message: 'Nous effectuons actuellement une mise à jour pour améliorer votre expérience.',
  maintenance_estimated_return: null,
};

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Fetch settings from database
  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const newSettings = { ...defaultSettings };
        data.forEach((row) => {
          const key = row.key as keyof AdminSettings;
          if (key in newSettings) {
            try {
              (newSettings as any)[key] = typeof row.value === 'string' 
                ? JSON.parse(row.value) 
                : row.value;
            } catch {
              (newSettings as any)[key] = row.value;
            }
          }
        });
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    fetchSettings();

    const channel = supabase
      .channel('admin-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_settings',
        },
        (payload) => {
          console.log('Settings changed:', payload);
          if (payload.new && 'key' in payload.new && 'value' in payload.new) {
            const { key, value } = payload.new as { key: string; value: unknown };
            setSettings((prev) => ({
              ...prev,
              [key]: typeof value === 'string' ? JSON.parse(value) : value,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSettings]);

  // Update a single setting
  const updateSetting = useCallback(
    async <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
      setIsSaving(true);
      try {
        const { error } = await supabase
          .from('admin_settings')
          .upsert({ key, value: JSON.stringify(value), updated_at: new Date().toISOString() }, { onConflict: 'key' });

        if (error) throw error;

        // Local update will be handled by realtime subscription
        toast({
          title: 'Paramètre mis à jour',
          description: 'Les modifications ont été sauvegardées',
        });
      } catch (error) {
        console.error('Error updating setting:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de sauvegarder les modifications',
        });
      } finally {
        setIsSaving(false);
      }
    },
    [toast]
  );

  // Update multiple settings at once
  const updateSettings = useCallback(
    async (updates: Partial<AdminSettings>) => {
      setIsSaving(true);
      try {
        const promises = Object.entries(updates).map(([key, value]) =>
          supabase
            .from('admin_settings')
            .upsert({ key, value: JSON.stringify(value), updated_at: new Date().toISOString() }, { onConflict: 'key' })
        );

        const results = await Promise.all(promises);
        const errors = results.filter((r) => r.error);

        if (errors.length > 0) {
          throw new Error('Some settings failed to update');
        }

        toast({
          title: 'Paramètres mis à jour',
          description: 'Toutes les modifications ont été sauvegardées',
        });
      } catch (error) {
        console.error('Error updating settings:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de sauvegarder certaines modifications',
        });
      } finally {
        setIsSaving(false);
      }
    },
    [toast]
  );

  return {
    settings,
    isLoading,
    isSaving,
    updateSetting,
    updateSettings,
    refetch: fetchSettings,
  };
}
