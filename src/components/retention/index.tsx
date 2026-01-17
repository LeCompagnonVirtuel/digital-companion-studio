import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ExitIntentPopup } from './ExitIntentPopup';
import { SmartSlideIn } from './SmartSlideIn';
import { SocialProofNotification } from './SocialProofNotification';
import { AbandonmentTracker } from './AbandonmentTracker';
import { useVisitorBehavior } from '@/hooks/useVisitorBehavior';

interface RetentionContextValue {
  visitorData: ReturnType<typeof useVisitorBehavior>['visitorData'];
  trackInterest: (category: string) => void;
  getPersonalizedOffer: () => ReturnType<ReturnType<typeof useVisitorBehavior>['getPersonalizedOffer']>;
}

const RetentionContext = createContext<RetentionContextValue | null>(null);

export function useRetention() {
  const context = useContext(RetentionContext);
  if (!context) {
    throw new Error('useRetention must be used within RetentionProvider');
  }
  return context;
}

interface RetentionProviderProps {
  children: ReactNode;
}

export function RetentionProvider({ children }: RetentionProviderProps) {
  const location = useLocation();
  const { 
    visitorData, 
    trackPageView, 
    trackInterest, 
    getPersonalizedOffer 
  } = useVisitorBehavior();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
    
    // Auto-track interest based on page
    if (location.pathname.includes('services')) {
      trackInterest('services');
    } else if (location.pathname.includes('boutique')) {
      trackInterest('products');
    } else if (location.pathname.includes('pricing')) {
      trackInterest('pricing');
    }
  }, [location.pathname, trackPageView, trackInterest]);

  // Don't show retention elements on admin pages
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/auth';

  return (
    <RetentionContext.Provider value={{ visitorData, trackInterest, getPersonalizedOffer }}>
      {children}
      
      {/* Retention Components - Only show on public pages */}
      {!isAdminPage && (
        <>
          <ExitIntentPopup />
          <SmartSlideIn />
          <SocialProofNotification />
          <AbandonmentTracker />
        </>
      )}
    </RetentionContext.Provider>
  );
}

// Export all retention components for direct use
export { ExitIntentPopup } from './ExitIntentPopup';
export { SmartSlideIn } from './SmartSlideIn';
export { SocialProofNotification } from './SocialProofNotification';
export { ProductRecommendations } from './ProductRecommendations';
export { CartUpsell } from './CartUpsell';
export { TrustBadges } from './TrustBadges';
export { SmartCTA, FloatingContactBar } from './SmartCTA';
export { ProgressIndicator } from './ProgressIndicator';
export { AbandonmentTracker } from './AbandonmentTracker';
