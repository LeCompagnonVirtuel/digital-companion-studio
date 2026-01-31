import { createContext, useContext, ReactNode } from "react";

// Simple French-only translations
const translations: Record<string, string> = {
  // Navigation
  "nav.home": "Accueil",
  "nav.services": "Services",
  "nav.portfolio": "Réalisations",
  "nav.pricing": "Tarifs",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.shop": "Boutique",
  "nav.blog": "Blog",
  "nav.resources": "Ressources",
  "nav.free_audit": "Audit gratuit",
  "nav.start_project": "Démarrer un projet",
  
  // Common
  "common.loading": "Chargement...",
  "common.error": "Une erreur est survenue",
  "common.success": "Succès",
  "common.submit": "Envoyer",
  "common.cancel": "Annuler",
  "common.save": "Sauvegarder",
  "common.delete": "Supprimer",
  "common.edit": "Modifier",
  "common.view": "Voir",
  "common.close": "Fermer",
  "common.back": "Retour",
  "common.next": "Suivant",
  "common.previous": "Précédent",
  "common.search": "Rechercher",
  "common.filter": "Filtrer",
  "common.all": "Tous",
  "common.none": "Aucun",
  "common.yes": "Oui",
  "common.no": "Non",
  "common.or": "ou",
  "common.and": "et",
  "common.learn_more": "En savoir plus",
  "common.read_more": "Lire la suite",
  "common.see_all": "Voir tout",
  "common.see_more": "Voir plus",
  "common.price": "Prix",
  "common.category": "Catégorie",
  "common.confirm": "Confirmer",
  "common.sort": "Trier",
  
  // Hero Section
  "hero.badge": "Agence Digitale Premium",
  "hero.badge.available": "Disponible",
  "hero.badge.web_dev": "Développement Web",
  "hero.badge.automation": "Automatisation & IA",
  "hero.badge.marketing": "Marketing Digital",
  "hero.badge.design": "Design & UX",
  "hero.badge.mobile": "Applications Mobiles",
  "hero.headline.partner": "Votre partenaire digital",
  "hero.headline.intelligent": "intelligent",
  "hero.headline.automate": "Automatisez vos",
  "hero.headline.processes": "processus",
  "hero.headline.accelerate": "Accélérez votre",
  "hero.headline.growth": "croissance",
  "hero.headline.interfaces": "Des interfaces qui",
  "hero.headline.convert": "convertissent",
  "hero.headline.mobile_apps": "Applications mobiles",
  "hero.headline.performant": "performantes",
  "hero.description.web": "Nous concevons, automatisons et faisons croître des écosystèmes digitaux performants pour les entreprises ambitieuses.",
  "hero.description.ai": "Intégrez l'intelligence artificielle et l'automatisation pour optimiser vos opérations et gagner en productivité.",
  "hero.description.marketing": "Stratégies de marketing digital sur-mesure pour attirer, convertir et fidéliser vos clients idéaux.",
  "hero.description.design": "Design moderne et expérience utilisateur optimisée pour maximiser l'engagement et les conversions.",
  "hero.description.mobile": "Développement d'applications iOS et Android natives ou hybrides pour toucher vos utilisateurs où qu'ils soient.",
  "hero.trust.no_commitment": "Sans engagement",
  "hero.trust.quote_24h": "Devis sous 24h",
  "hero.trust.personalized": "Accompagnement personnalisé",
  "hero.stat.response": "Réponse garantie",
  "hero.stat.projects": "Projets livrés",
  "hero.stat.satisfaction": "Clients satisfaits",
  "hero.title_line1": "Transformez Votre Vision",
  "hero.title_line2": "en Réalité Digitale",
  "hero.subtitle": "Nous créons des expériences digitales exceptionnelles qui propulsent votre entreprise vers le succès.",
  "hero.cta_primary": "Démarrer un projet",
  "hero.cta_secondary": "Découvrir nos services",
  "hero.service_web": "Sites Web",
  "hero.service_marketing": "Marketing Digital",
  "hero.service_design": "Design & Branding",
  "hero.service_ai": "Automatisation IA",
  
  // Services Section
  "services.badge": "Nos Expertises",
  "services.title": "Des Solutions Digitales",
  "services.title_highlight": "Sur Mesure",
  "services.subtitle": "De la stratégie à l'exécution, nous vous accompagnons dans tous les aspects de votre transformation digitale.",
  "services.marketing": "Marketing Digital",
  "services.marketing_desc": "Stratégies sur-mesure pour maximiser votre visibilité et vos conversions.",
  "services.content": "Création de Contenu",
  "services.content_desc": "Visuels, vidéos et rédaction qui captivent votre audience.",
  "services.community": "Community Management",
  "services.community_desc": "Animation et croissance de vos communautés sur les réseaux sociaux.",
  "services.automation": "Automatisation & IA",
  "services.automation_desc": "Optimisez vos process avec l'intelligence artificielle.",
  "services.web_dev": "Développement Web",
  "services.web_dev_desc": "Sites vitrines, landing pages et applications web sur-mesure.",
  "services.ecommerce": "E-commerce",
  "services.ecommerce_desc": "Boutiques en ligne performantes et optimisées pour la conversion.",
  "services.mobile": "Applications Mobiles",
  "services.mobile_desc": "Solutions digitales mobiles adaptées à vos besoins.",
  "services.branding": "Branding & Identité",
  "services.branding_desc": "Création d'identités visuelles mémorables et cohérentes.",
  "services.discover_all": "Découvrir tous nos services",
  
  // Stats Section
  "stats.badge": "Nos résultats",
  "stats.title": "Des chiffres qui",
  "stats.title_highlight": "parlent",
  "stats.projects": "Projets Livrés",
  "stats.projects_desc": "avec succès",
  "stats.clients": "Clients Satisfaits",
  "stats.clients_desc": "nous font confiance",
  "stats.roi": "ROI moyen",
  "stats.roi_desc": "de nos clients",
  "stats.response": "Temps de réponse",
  "stats.response_desc": "garanti",
  "stats.countries": "Pays",
  "stats.countries_desc": "Présence internationale",
  "stats.satisfaction": "Satisfaction",
  "stats.satisfaction_desc": "Note moyenne des clients",
  
  // Process Section
  "process.badge": "Notre Méthode",
  "process.title": "Un Processus",
  "process.title_highlight": "Éprouvé",
  "process.subtitle": "Une méthodologie structurée pour garantir le succès de votre projet digital.",
  "process.step1.title": "Échange & Découverte",
  "process.step1.desc": "Nous analysons vos besoins, objectifs et contraintes lors d'un premier échange approfondi.",
  "process.step2.title": "Stratégie & Conception",
  "process.step2.desc": "Nous élaborons une stratégie sur-mesure et concevons les solutions adaptées à vos enjeux.",
  "process.step3.title": "Développement",
  "process.step3.desc": "Notre équipe donne vie à votre projet avec les technologies les plus performantes.",
  "process.step4.title": "Lancement & Suivi",
  "process.step4.desc": "Mise en production, formation et accompagnement continu pour garantir votre succès.",
  
  // Testimonials Section
  "testimonials.badge": "Témoignages",
  "testimonials.title": "Ce que Disent",
  "testimonials.title_highlight": "Nos Clients",
  "testimonials.subtitle": "Des partenaires satisfaits qui témoignent de la qualité de notre accompagnement.",
  
  // Trust Badges
  "trust.satisfaction": "Garantie Satisfaction",
  "trust.satisfaction_desc": "100% satisfait ou remboursé",
  "trust.delivery": "Livraison Rapide",
  "trust.delivery_desc": "Respect des délais garantis",
  "trust.support": "Support 24/7",
  "trust.support_desc": "Toujours à vos côtés",
  "trust.expertise": "Expertise Certifiée",
  "trust.expertise_desc": "Partenaires officiels",
  "trust.quality": "Qualité Premium",
  "trust.quality_desc": "Standards internationaux",
  "trust.tech": "Technologies Modernes",
  "trust.tech_desc": "Dernières innovations",
  
  // CTA Section
  "cta.badge": "Offre limitée",
  "cta.title": "Prêt à transformer",
  "cta.title_highlight": "votre digital ?",
  "cta.subtitle": "Discutons de votre projet. Audit gratuit et sans engagement pour identifier vos opportunités de croissance.",
  "cta.benefit.audit": "Audit complet de votre présence digitale",
  "cta.benefit.recommendations": "Recommandations personnalisées",
  "cta.benefit.roadmap": "Roadmap de croissance sur-mesure",
  "cta.benefit.no_commitment": "Sans engagement",
  "cta.request_audit": "Demander un audit gratuit",
  "cta.conversion": "Conversion",
  "cta.avg_clients": "Moyenne clients",
  "cta.fast_response": "Réponse rapide",
  "cta.always_available": "Toujours disponible",
  "cta.button_primary": "Démarrer un projet",
  "cta.button_secondary": "Prendre rendez-vous",
  "cta.start_project": "Démarrer mon projet",
  "cta.free_audit": "Audit gratuit",
  "cta.add_to_cart": "Ajouter au panier",
  "cta.buy_now": "Acheter maintenant",
  "cta.download_free": "Télécharger gratuitement",
  "cta.get_started": "Commencer",
  "cta.learn_more": "En savoir plus",
  "cta.view_all": "Voir tout",
  "cta.contact_us": "Nous contacter",
  "cta.discover_services": "Découvrir nos services",
  "cta.view_portfolio": "Voir le portfolio",
  "cta.request_quote": "Demander un devis",
  "cta.talk_project": "Parlons de votre projet",
  
  // Shop
  "shop.badge": "Boutique Digitale",
  "shop.title": "Ressources premium pour",
  "shop.title_highlight": "votre croissance",
  "shop.subtitle": "Templates, formations et outils pour accélérer votre transformation digitale.",
  "shop.add_to_cart": "Ajouter au panier",
  "shop.added": "Ajouté",
  "shop.buy_now": "Acheter maintenant",
  "shop.out_of_stock": "Rupture de stock",
  "shop.free": "Gratuit",
  "shop.bestseller": "Best-seller",
  "shop.new": "Nouveau",
  "shop.featured": "Recommandé",
  "shop.limited_offer": "Offre Limitée",
  "shop.instant_access": "Accès instantané",
  "shop.secure_payment": "Paiement sécurisé",
  "shop.support_24_7": "Support 24/7",
  "shop.category": "Catégorie",
  "shop.all_categories": "Toutes les catégories",
  "shop.search_placeholder": "Rechercher un produit...",
  "shop.no_products": "Aucun produit trouvé",
  "shop.cart": "Panier",
  "shop.cart_empty": "Votre panier est vide",
  "shop.checkout": "Commander",
  "shop.total": "Total",
  "shop.subtotal": "Sous-total",
  "shop.discover_all": "Découvrir toute la boutique",
  "shop.view_product": "Voir le produit",
  "shop.category.templates": "Templates",
  "shop.category.formations": "Formations",
  "shop.category.resources": "Ressources",
  "shop.category.templates_desc": "Sites, landing pages prêts à l'emploi",
  "shop.category.formations_desc": "Cours complets pour maîtriser le digital",
  "shop.category.resources_desc": "Checklists, guides et outils pratiques",
  
  // Guarantee
  "guarantee.title": "Garantie Satisfait ou Remboursé",
  "guarantee.subtitle": "30 jours pour tester nos produits sans risque",
  "guarantee.description": "Si nos produits ne répondent pas à vos attentes, nous vous remboursons intégralement. Aucune question posée.",
  "guarantee.feature.simple_refund": "Remboursement simple",
  "guarantee.feature.simple_refund_desc": "Un email suffit pour demander votre remboursement",
  "guarantee.feature.instant_delivery": "Livraison instantanée",
  "guarantee.feature.instant_delivery_desc": "Accès immédiat après achat",
  "guarantee.feature.premium_support": "Support Premium",
  "guarantee.feature.premium_support_desc": "Aide personnalisée 7j/7",
  "guarantee.feature.secure_payment": "Paiement Sécurisé",
  "guarantee.feature.secure_payment_desc": "Transactions 100% sécurisées",
  
  // FAQ
  "faq.title": "Questions Fréquentes",
  "faq.subtitle": "Tout ce que vous devez savoir",
  
  // Contact
  "contact.title": "Contactez-nous",
  "contact.subtitle": "Discutons de votre projet",
  "contact.form_title": "Envoyez-nous un message",
  "contact.info_title": "Nos coordonnées",
  "contact.form.name": "Nom complet",
  "contact.form.email": "Email",
  "contact.form.phone": "Téléphone",
  "contact.form.company": "Entreprise",
  "contact.form.message": "Message",
  "contact.form.submit": "Envoyer le message",
  "contact.form.success": "Message envoyé avec succès !",
  "contact.form.error": "Erreur lors de l'envoi",
  
  // Pricing
  "pricing.badge": "Nos Tarifs",
  "pricing.title": "Des offres adaptées à",
  "pricing.title_highlight": "vos ambitions",
  "pricing.subtitle": "Choisissez la formule qui correspond à vos besoins et votre budget.",
  "pricing.popular": "Populaire",
  "pricing.choose": "Choisir ce pack",
  "pricing.custom": "Besoin d'un pack sur-mesure ?",
  "pricing.custom_desc": "Discutons de votre projet pour créer une offre adaptée à vos besoins.",
  "pricing.request_quote": "Demander un devis personnalisé",
  "pricing.monthly": "/mois",
  "pricing.starting_at": "À partir de",
  
  // Projects Section
  "projects.badge": "Nos Réalisations",
  "projects.title": "Projets récents qui",
  "projects.title_highlight": "inspirent",
  "projects.subtitle": "Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.",
  "projects.view_all": "Voir tous les projets",
  "projects.view_case": "Voir le case study",
  
  // About Section
  "about.badge": "Qui sommes-nous",
  "about.title": "Une agence",
  "about.title_highlight": "passionnée",
  "about.subtitle": "Nous accompagnons les entreprises dans leur transformation digitale avec expertise et créativité.",
  "about.description": "Le Compagnon Virtuel est né de la conviction que chaque entreprise mérite une présence digitale à la hauteur de son ambition.",
  "about.value.innovation": "Innovation",
  "about.value.quality": "Qualité",
  "about.value.transparency": "Transparence",
  "about.value.commitment": "Engagement",
  
  // About Page
  "about_page.title": "À propos de nous",
  "about_page.subtitle": "Découvrez notre histoire, notre mission et notre équipe.",
  "about_page.mission": "Notre Mission",
  "about_page.values": "Nos Valeurs",
  "about_page.team": "Notre Équipe",
  
  // Product
  "product.problem": "Le problème",
  "product.solution": "La solution",
  "product.results": "Les résultats",
  "product.benefits": "Ce que vous obtenez",
  "product.includes": "Ce qui est inclus",
  
  // Forms
  "form.name": "Nom",
  "form.email": "Email",
  "form.phone": "Téléphone",
  "form.company": "Entreprise",
  "form.message": "Message",
  "form.submit": "Envoyer",
  "form.required": "Champ requis",
  "form.invalid_email": "Email invalide",
  
  // Blog
  "blog.title": "Notre Blog",
  "blog.subtitle": "Conseils, actualités et bonnes pratiques du digital.",
  "blog.read_article": "Lire l'article",
  "blog.published": "Publié le",
  "blog.min_read": "min de lecture",
  "blog.views": "vues",
  
  // Portfolio
  "portfolio.title": "Notre Portfolio",
  "portfolio.subtitle": "Découvrez nos réalisations et les projets qui nous rendent fiers.",
  "portfolio.all_projects": "Tous les projets",
  "portfolio.view_case_study": "Voir le case study",
  
  // 404 Page
  "404.title": "Page non trouvée",
  "404.subtitle": "Oops ! La page que vous recherchez n'existe pas.",
  "404.back_home": "Retour à l'accueil",
  
  // Footer
  "footer.newsletter_title": "Prêt à transformer votre digital ?",
  "footer.newsletter_subtitle": "Discutons de votre projet et trouvons la solution idéale.",
  "footer.newsletter_cta": "Parlons de votre projet",
  "footer.services": "Services",
  "footer.shop": "Boutique",
  "footer.company": "Entreprise",
  "footer.contact": "Contact",
  "footer.legal": "Mentions légales",
  "footer.privacy": "Politique de confidentialité",
  "footer.terms": "CGV",
  "footer.rights": "Tous droits réservés",
  "footer.description": "Votre partenaire digital pour concevoir, automatiser et faire croître des écosystèmes digitaux performants.",
  "footer.resources": "Ressources",
  "footer.cookies": "Cookies",
  "footer.all_rights": "Tous droits réservés.",
};

interface LanguageContextType {
  language: "fr";
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: "fr", t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// For compatibility - no longer used
export const availableLanguages = [
  { code: "fr", name: "Français", flag: "🇫🇷" }
];
