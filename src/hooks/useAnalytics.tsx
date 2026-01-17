import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalPageViews: number;
  todayPageViews: number;
  weekPageViews: number;
  monthPageViews: number;
  totalSessions: number;
  totalFormSubmits: number;
  topPages: { page: string; views: number }[];
  dailyViews: { date: string; views: number }[];
}

interface AnalyticsEvent {
  event_type: string;
  page_path: string;
  created_at: string;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageViews: 0,
    todayPageViews: 0,
    weekPageViews: 0,
    monthPageViews: 0,
    totalSessions: 0,
    totalFormSubmits: 0,
    topPages: [],
    dailyViews: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Fetch all events
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('event_type, page_path, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedEvents = (events || []) as AnalyticsEvent[];

      // Calculate stats
      const pageViews = typedEvents.filter(e => e.event_type === 'page_view');
      const todayViews = pageViews.filter(e => e.created_at >= todayStart);
      const weekViews = pageViews.filter(e => e.created_at >= weekStart);
      const monthViews = pageViews.filter(e => e.created_at >= monthStart);
      const sessions = typedEvents.filter(e => e.event_type === 'session_start');
      const formSubmits = typedEvents.filter(e => e.event_type === 'form_submit');

      // Calculate top pages
      const pageCounts: Record<string, number> = {};
      pageViews.forEach(e => {
        const page = e.page_path || '/';
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });
      const topPages = Object.entries(pageCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Calculate daily views for last 7 days
      const dailyViews: { date: string; views: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
        const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString();
        const views = pageViews.filter(e => e.created_at >= dayStart && e.created_at < dayEnd).length;
        dailyViews.push({ date: dateStr, views });
      }

      setAnalytics({
        totalPageViews: pageViews.length,
        todayPageViews: todayViews.length,
        weekPageViews: weekViews.length,
        monthPageViews: monthViews.length,
        totalSessions: sessions.length,
        totalFormSubmits: formSubmits.length,
        topPages,
        dailyViews,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();

    // Subscribe to realtime analytics updates
    const channel = supabase
      .channel('analytics-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events',
        },
        () => {
          // Refetch analytics on new events
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAnalytics]);

  return { analytics, isLoading, refetch: fetchAnalytics };
};

// Track page view
export const trackPageView = async (pagePath: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    await supabase.from('analytics_events').insert({
      event_type: 'page_view',
      page_path: pagePath,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      session_id: sessionId,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track form submit
export const trackFormSubmit = async (formName: string, pagePath: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    await supabase.from('analytics_events').insert({
      event_type: 'form_submit',
      page_path: pagePath,
      metadata: { form_name: formName },
      session_id: sessionId,
    });
  } catch (error) {
    console.error('Error tracking form submit:', error);
  }
};

// Track session start
export const trackSessionStart = async () => {
  try {
    const sessionId = getOrCreateSessionId();
    const isNewSession = !sessionStorage.getItem('session_tracked');
    
    if (isNewSession) {
      await supabase.from('analytics_events').insert({
        event_type: 'session_start',
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId,
      });
      sessionStorage.setItem('session_tracked', 'true');
    }
  } catch (error) {
    console.error('Error tracking session:', error);
  }
};

const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};
