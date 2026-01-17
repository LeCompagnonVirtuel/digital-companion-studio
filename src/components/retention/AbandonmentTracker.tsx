import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AbandonmentData {
  page_path: string;
  time_on_page: number;
  scroll_depth: number;
  exit_type: 'normal' | 'quick' | 'bounce';
  had_cart_items: boolean;
}

export function AbandonmentTracker() {
  const location = useLocation();

  const trackAbandonment = useCallback(async (data: AbandonmentData) => {
    try {
      const sessionId = sessionStorage.getItem('analytics_session_id') || crypto.randomUUID();
      
      await supabase.from('analytics_events').insert({
        event_type: 'page_exit',
        page_path: data.page_path,
        session_id: sessionId,
        metadata: {
          time_on_page: data.time_on_page,
          scroll_depth: data.scroll_depth,
          exit_type: data.exit_type,
          had_cart_items: data.had_cart_items,
        },
      });
    } catch (error) {
      console.error('Error tracking abandonment:', error);
    }
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let scrollDepth = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.max(scrollDepth, Math.round((scrollTop / docHeight) * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      const cartItems = localStorage.getItem('cart_session_id');
      
      let exitType: 'normal' | 'quick' | 'bounce' = 'normal';
      if (timeOnPage < 10) {
        exitType = 'bounce';
      } else if (timeOnPage < 30) {
        exitType = 'quick';
      }

      // Use sendBeacon for reliable tracking on page unload
      const data = {
        page_path: location.pathname,
        time_on_page: timeOnPage,
        scroll_depth: scrollDepth,
        exit_type: exitType,
        had_cart_items: !!cartItems,
      };

      // Track via beacon
      navigator.sendBeacon?.(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-exit`,
        JSON.stringify(data)
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track when navigating away within the app
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if (timeOnPage > 5) {
        trackAbandonment({
          page_path: location.pathname,
          time_on_page: timeOnPage,
          scroll_depth: scrollDepth,
          exit_type: timeOnPage < 30 ? 'quick' : 'normal',
          had_cart_items: !!localStorage.getItem('cart_session_id'),
        });
      }
    };
  }, [location.pathname, trackAbandonment]);

  return null;
}
