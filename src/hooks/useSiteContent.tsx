import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface AboutContent {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SiteContent {
  hero: HeroContent | null;
  about: AboutContent | null;
  services: ServiceItem[] | null;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>({
    hero: null,
    about: null,
    services: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;

      const newContent: SiteContent = { hero: null, about: null, services: null };

      data?.forEach((item) => {
        const c = item.content as Record<string, unknown>;
        switch (item.section) {
          case 'hero':
            newContent.hero = c as unknown as HeroContent;
            break;
          case 'about':
            newContent.about = c as unknown as AboutContent;
            break;
          case 'services':
            newContent.services = (c as unknown as { items: ServiceItem[] }).items || null;
            break;
        }
      });

      setContent(newContent);
    } catch (error) {
      console.error('Error fetching site content:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();

    const channel = supabase
      .channel('site-content-public')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_content' },
        () => fetchContent()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchContent]);

  return { content, isLoading };
}
