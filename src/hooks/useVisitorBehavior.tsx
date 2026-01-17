import { useState, useEffect, useCallback } from 'react';

interface VisitorData {
  isNewVisitor: boolean;
  visitCount: number;
  lastVisit: string | null;
  pagesViewed: string[];
  timeOnSite: number;
  cartAbandoned: boolean;
  interestedCategories: string[];
  scrollDepth: number;
}

const STORAGE_KEY = 'lcv_visitor_data';

export const useVisitorBehavior = () => {
  const [visitorData, setVisitorData] = useState<VisitorData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        ...data,
        isNewVisitor: false,
        visitCount: (data.visitCount || 0) + 1,
        lastVisit: data.currentVisit || null,
        timeOnSite: 0,
        scrollDepth: 0,
      };
    }
    return {
      isNewVisitor: true,
      visitCount: 1,
      lastVisit: null,
      pagesViewed: [],
      timeOnSite: 0,
      cartAbandoned: false,
      interestedCategories: [],
      scrollDepth: 0,
    };
  });

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorData(prev => ({ ...prev, timeOnSite: prev.timeOnSite + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      setVisitorData(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent),
      }));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    const dataToSave = {
      ...visitorData,
      currentVisit: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [visitorData]);

  const trackPageView = useCallback((path: string) => {
    setVisitorData(prev => ({
      ...prev,
      pagesViewed: [...new Set([...prev.pagesViewed, path])],
    }));
  }, []);

  const trackInterest = useCallback((category: string) => {
    setVisitorData(prev => ({
      ...prev,
      interestedCategories: [...new Set([...prev.interestedCategories, category])],
    }));
  }, []);

  const markCartAbandoned = useCallback((abandoned: boolean) => {
    setVisitorData(prev => ({ ...prev, cartAbandoned: abandoned }));
  }, []);

  const getPersonalizedOffer = useCallback(() => {
    if (visitorData.cartAbandoned) {
      return {
        type: 'cart_recovery',
        title: 'Votre panier vous attend !',
        description: 'Finalisez votre commande et bénéficiez de -10% avec le code RETOUR10',
        cta: 'Voir mon panier',
        link: '/boutique/checkout',
      };
    }
    if (visitorData.interestedCategories.includes('services')) {
      return {
        type: 'service_offer',
        title: 'Besoin d\'un accompagnement ?',
        description: 'Profitez d\'un audit gratuit de votre projet digital',
        cta: 'Demander mon audit',
        link: '/audit-gratuit',
      };
    }
    if (visitorData.isNewVisitor) {
      return {
        type: 'welcome',
        title: 'Bienvenue chez Le Compagnon Virtuel !',
        description: 'Découvrez nos ressources gratuites pour booster votre business',
        cta: 'Explorer',
        link: '/boutique',
      };
    }
    return {
      type: 'returning',
      title: 'Content de vous revoir !',
      description: 'Découvrez nos nouveautés et offres exclusives',
      cta: 'Voir les nouveautés',
      link: '/boutique',
    };
  }, [visitorData]);

  return {
    visitorData,
    trackPageView,
    trackInterest,
    markCartAbandoned,
    getPersonalizedOffer,
  };
};
