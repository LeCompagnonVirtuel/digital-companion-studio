import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackSessionStart } from '@/hooks/useAnalytics';

export const AnalyticsTracker = () => {
  const location = useLocation();

  // Track session start on first load
  useEffect(() => {
    trackSessionStart();
  }, []);

  // Track page views on route change
  useEffect(() => {
    // Don't track admin routes
    if (location.pathname.startsWith('/admin') || location.pathname === '/auth') {
      return;
    }
    
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};
