import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
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
}

const defaultSettings: SiteSettings = {
  site_name: 'Le Compagnon Virtuel',
  site_description: 'Votre partenaire digital pour concevoir, automatiser et faire croître des écosystèmes digitaux performants.',
  contact_email: 'lecompagnonvirtuel@gmail.com',
  social_links: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
  business_info: {
    phone: '+225 0706693038',
    address: 'Côte d\'Ivoire',
    hours: 'Lun-Ven 8h-18h',
  },
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value')
        .in('key', ['site_name', 'site_description', 'contact_email', 'social_links', 'business_info']);

      if (error) {
        console.error('Error fetching site settings:', error);
        return;
      }

      if (data) {
        const newSettings = { ...defaultSettings };
        data.forEach((row) => {
          const key = row.key as keyof SiteSettings;
          if (key in newSettings) {
            try {
              newSettings[key] = typeof row.value === 'string' 
                ? JSON.parse(row.value) 
                : row.value;
            } catch {
              newSettings[key] = row.value as any;
            }
          }
        });
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('site-settings-public')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_settings',
        },
        (payload) => {
          console.log('Site settings changed:', payload);
          if (payload.new && 'key' in payload.new && 'value' in payload.new) {
            const { key, value } = payload.new as { key: string; value: unknown };
            const validKeys: (keyof SiteSettings)[] = ['site_name', 'site_description', 'contact_email', 'social_links', 'business_info'];
            
            if (validKeys.includes(key as keyof SiteSettings)) {
              setSettings((prev) => ({
                ...prev,
                [key]: typeof value === 'string' ? JSON.parse(value) : value,
              }));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSettings]);

  return { settings, isLoading };
}
