import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageSEO {
  title: string;
  metaDescription: string;
}

interface SEOData {
  pages: Record<string, PageSEO>;
  siteName: string;
  siteDescription: string;
}

const defaultSEO: SEOData = {
  pages: {},
  siteName: '',
  siteDescription: '',
};

let cachedSEO: SEOData | null = null;
let fetchPromise: Promise<SEOData> | null = null;

async function loadSEO(): Promise<SEOData> {
  if (cachedSEO) return cachedSEO;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value')
        .in('key', ['seo_pages', 'seo_site_name', 'seo_site_description']);

      if (error) throw error;

      const result: SEOData = { ...defaultSEO };

      data?.forEach((row) => {
        const val = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
        switch (row.key) {
          case 'seo_pages':
            result.pages = val || {};
            break;
          case 'seo_site_name':
            result.siteName = val || '';
            break;
          case 'seo_site_description':
            result.siteDescription = val || '';
            break;
        }
      });

      cachedSEO = result;
      return result;
    } catch {
      return defaultSEO;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

export function useSEOSettings() {
  const [seo, setSeo] = useState<SEOData>(cachedSEO || defaultSEO);

  const refresh = useCallback(async () => {
    cachedSEO = null;
    const data = await loadSEO();
    setSeo(data);
  }, []);

  useEffect(() => {
    loadSEO().then(setSeo);

    const channel = supabase
      .channel('seo-settings-public')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admin_settings' },
        (payload) => {
          if (payload.new && 'key' in payload.new) {
            const key = (payload.new as { key: string }).key;
            if (key.startsWith('seo_')) {
              refresh();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  return seo;
}

export function getSEOForPath(seo: SEOData, path: string): PageSEO | null {
  return seo.pages[path] || null;
}
