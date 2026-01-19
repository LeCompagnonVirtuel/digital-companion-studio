import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Common translations used across the site
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.shop': 'Boutique',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.resources': 'Ressources Gratuites',
    
    // CTA
    'cta.start_project': 'Démarrer mon projet',
    'cta.free_audit': 'Audit gratuit',
    'cta.add_to_cart': 'Ajouter au panier',
    'cta.buy_now': 'Acheter maintenant',
    'cta.download_free': 'Télécharger gratuitement',
    'cta.get_started': 'Commencer',
    'cta.learn_more': 'En savoir plus',
    'cta.view_all': 'Voir tout',
    'cta.contact_us': 'Nous contacter',
    
    // Shop
    'shop.title': 'Boutique Digitale',
    'shop.subtitle': 'Templates, formations et outils pour accélérer votre croissance',
    'shop.add_to_cart': 'Ajouter au panier',
    'shop.added': 'Ajouté',
    'shop.view_product': 'Voir le produit',
    'shop.bestseller': 'Best Seller',
    'shop.new': 'Nouveau',
    'shop.limited_offer': 'Offre Limitée',
    'shop.instant_access': 'Accès instantané',
    'shop.secure_payment': 'Paiement sécurisé',
    'shop.support_24_7': 'Support 24/7',
    
    // Guarantee
    'guarantee.title': 'Garantie Satisfait ou Remboursé',
    'guarantee.subtitle': '30 jours pour tester nos produits sans risque',
    'guarantee.description': 'Si nos produits ne répondent pas à vos attentes, nous vous remboursons intégralement. Aucune question posée.',
    
    // Trust
    'trust.secure_payment': 'Paiement 100% Sécurisé',
    'trust.instant_delivery': 'Livraison Instantanée',
    'trust.money_back': 'Satisfait ou Remboursé',
    'trust.support': 'Support 7j/7',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions générales',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.success': 'Succès !',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.close': 'Fermer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.sort': 'Trier',
    'common.all': 'Tout',
    'common.price': 'Prix',
    'common.category': 'Catégorie',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.shop': 'Shop',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.resources': 'Free Resources',
    
    // CTA
    'cta.start_project': 'Start My Project',
    'cta.free_audit': 'Free Audit',
    'cta.add_to_cart': 'Add to Cart',
    'cta.buy_now': 'Buy Now',
    'cta.download_free': 'Download Free',
    'cta.get_started': 'Get Started',
    'cta.learn_more': 'Learn More',
    'cta.view_all': 'View All',
    'cta.contact_us': 'Contact Us',
    
    // Shop
    'shop.title': 'Digital Shop',
    'shop.subtitle': 'Templates, courses and tools to accelerate your growth',
    'shop.add_to_cart': 'Add to Cart',
    'shop.added': 'Added',
    'shop.view_product': 'View Product',
    'shop.bestseller': 'Best Seller',
    'shop.new': 'New',
    'shop.limited_offer': 'Limited Offer',
    'shop.instant_access': 'Instant Access',
    'shop.secure_payment': 'Secure Payment',
    'shop.support_24_7': '24/7 Support',
    
    // Guarantee
    'guarantee.title': 'Money-Back Guarantee',
    'guarantee.subtitle': '30 days to test our products risk-free',
    'guarantee.description': 'If our products don\'t meet your expectations, we\'ll refund you in full. No questions asked.',
    
    // Trust
    'trust.secure_payment': '100% Secure Payment',
    'trust.instant_delivery': 'Instant Delivery',
    'trust.money_back': 'Money-Back Guarantee',
    'trust.support': '7/7 Support',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.all': 'All',
    'common.price': 'Price',
    'common.category': 'Category',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('preferred_language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
      return;
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      setLanguageState('en');
    } else {
      setLanguageState('fr'); // Default to French
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred_language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const availableLanguages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' }
];
