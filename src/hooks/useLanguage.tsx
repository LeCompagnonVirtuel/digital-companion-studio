import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Complete translations for the entire site
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
    'nav.pricing': 'Tarifs',
    'nav.careers': 'Carrières',
    
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
    'cta.discover_services': 'Découvrir nos services',
    'cta.view_portfolio': 'Voir le portfolio',
    'cta.request_quote': 'Demander un devis',
    'cta.talk_project': 'Parlons de votre projet',
    
    // Hero Section
    'hero.badge.available': 'Disponible',
    'hero.badge.web_dev': 'Développement Web',
    'hero.badge.automation': 'Automatisation & IA',
    'hero.badge.marketing': 'Marketing Digital',
    'hero.badge.design': 'Design & UX',
    'hero.badge.mobile': 'Applications Mobiles',
    'hero.headline.partner': 'Votre partenaire digital',
    'hero.headline.intelligent': 'intelligent',
    'hero.headline.automate': 'Automatisez vos',
    'hero.headline.processes': 'processus',
    'hero.headline.accelerate': 'Accélérez votre',
    'hero.headline.growth': 'croissance',
    'hero.headline.interfaces': 'Des interfaces qui',
    'hero.headline.convert': 'convertissent',
    'hero.headline.mobile_apps': 'Applications mobiles',
    'hero.headline.performant': 'performantes',
    'hero.description.web': 'Nous concevons, automatisons et faisons croître des écosystèmes digitaux performants pour les entreprises ambitieuses.',
    'hero.description.ai': 'Intégrez l\'intelligence artificielle et l\'automatisation pour optimiser vos opérations et gagner en productivité.',
    'hero.description.marketing': 'Stratégies de marketing digital sur-mesure pour attirer, convertir et fidéliser vos clients idéaux.',
    'hero.description.design': 'Design moderne et expérience utilisateur optimisée pour maximiser l\'engagement et les conversions.',
    'hero.description.mobile': 'Développement d\'applications iOS et Android natives ou hybrides pour toucher vos utilisateurs où qu\'ils soient.',
    'hero.trust.no_commitment': 'Sans engagement',
    'hero.trust.quote_24h': 'Devis sous 24h',
    'hero.trust.personalized': 'Accompagnement personnalisé',
    'hero.stat.response': 'Réponse garantie',
    'hero.stat.projects': 'Projets livrés',
    'hero.stat.satisfaction': 'Clients satisfaits',
    
    // Services Section
    'services.badge': 'Nos Services',
    'services.title': 'Tout ce dont vous avez besoin',
    'services.title_highlight': 'pour réussir',
    'services.subtitle': 'Une expertise complète pour créer, développer et automatiser votre présence digitale.',
    'services.marketing': 'Marketing Digital',
    'services.marketing_desc': 'Stratégies sur-mesure pour maximiser votre visibilité et vos conversions.',
    'services.content': 'Création de Contenu',
    'services.content_desc': 'Visuels, vidéos et rédaction qui captivent votre audience.',
    'services.community': 'Community Management',
    'services.community_desc': 'Animation et croissance de vos communautés sur les réseaux sociaux.',
    'services.automation': 'Automatisation & IA',
    'services.automation_desc': 'Optimisez vos process avec l\'intelligence artificielle.',
    'services.web_dev': 'Développement Web',
    'services.web_dev_desc': 'Sites vitrines, landing pages et applications web sur-mesure.',
    'services.ecommerce': 'E-commerce',
    'services.ecommerce_desc': 'Boutiques en ligne performantes et optimisées pour la conversion.',
    'services.mobile': 'Applications Mobiles',
    'services.mobile_desc': 'Solutions digitales mobiles adaptées à vos besoins.',
    'services.branding': 'Branding & Identité',
    'services.branding_desc': 'Création d\'identités visuelles mémorables et cohérentes.',
    'services.discover_all': 'Découvrir tous nos services',
    
    // Stats Section
    'stats.badge': 'Nos résultats',
    'stats.title': 'Des chiffres qui',
    'stats.title_highlight': 'parlent',
    'stats.projects': 'Projets livrés',
    'stats.projects_desc': 'avec succès',
    'stats.clients': 'Clients satisfaits',
    'stats.clients_desc': 'nous font confiance',
    'stats.roi': 'ROI moyen',
    'stats.roi_desc': 'de nos clients',
    'stats.response': 'Temps de réponse',
    'stats.response_desc': 'garanti',
    
    // Trust Badges Section
    'trust.satisfaction': 'Garantie Satisfaction',
    'trust.satisfaction_desc': '100% satisfait ou remboursé',
    'trust.delivery': 'Livraison Rapide',
    'trust.delivery_desc': 'Respect des délais garantis',
    'trust.support': 'Support 24/7',
    'trust.support_desc': 'Toujours à vos côtés',
    'trust.expertise': 'Expertise Certifiée',
    'trust.expertise_desc': 'Partenaires officiels',
    'trust.quality': 'Qualité Premium',
    'trust.quality_desc': 'Standards internationaux',
    'trust.tech': 'Technologies Modernes',
    'trust.tech_desc': 'Dernières innovations',
    
    // Process Section
    'process.badge': 'Notre Méthode',
    'process.title': 'Un processus',
    'process.title_highlight': 'éprouvé',
    'process.subtitle': 'Une méthodologie claire et transparente pour des projets réussis.',
    'process.step1.title': 'Échange & Découverte',
    'process.step1.desc': 'Nous analysons vos besoins, objectifs et contraintes lors d\'un premier échange approfondi.',
    'process.step2.title': 'Stratégie & Conception',
    'process.step2.desc': 'Nous élaborons une stratégie sur-mesure et concevons les solutions adaptées à vos enjeux.',
    'process.step3.title': 'Développement',
    'process.step3.desc': 'Notre équipe donne vie à votre projet avec les technologies les plus performantes.',
    'process.step4.title': 'Lancement & Suivi',
    'process.step4.desc': 'Mise en production, formation et accompagnement continu pour garantir votre succès.',
    
    // Testimonials Section
    'testimonials.badge': 'Témoignages',
    'testimonials.title': 'Ils nous font',
    'testimonials.title_highlight': 'confiance',
    'testimonials.subtitle': 'Découvrez ce que nos clients disent de notre collaboration.',
    
    // Featured Projects Section
    'projects.badge': 'Nos Réalisations',
    'projects.title': 'Projets récents qui',
    'projects.title_highlight': 'inspirent',
    'projects.subtitle': 'Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.',
    'projects.view_all': 'Voir tous les projets',
    'projects.view_case': 'Voir le case study',
    
    // Shop Section
    'shop.badge': 'Boutique Digitale',
    'shop.title': 'Ressources premium pour',
    'shop.title_highlight': 'votre croissance',
    'shop.subtitle': 'Templates, formations et outils pour accélérer votre transformation digitale.',
    'shop.add_to_cart': 'Ajouter au panier',
    'shop.added': 'Ajouté',
    'shop.view_product': 'Voir le produit',
    'shop.bestseller': 'Best Seller',
    'shop.new': 'Nouveau',
    'shop.limited_offer': 'Offre Limitée',
    'shop.instant_access': 'Accès instantané',
    'shop.secure_payment': 'Paiement sécurisé',
    'shop.support_24_7': 'Support 24/7',
    'shop.discover_all': 'Découvrir toute la boutique',
    'shop.category.templates': 'Templates',
    'shop.category.formations': 'Formations',
    'shop.category.resources': 'Ressources',
    'shop.category.templates_desc': 'Sites, landing pages prêts à l\'emploi',
    'shop.category.formations_desc': 'Cours complets pour maîtriser le digital',
    'shop.category.resources_desc': 'Checklists, guides et outils pratiques',
    
    // Pricing Section
    'pricing.badge': 'Nos Tarifs',
    'pricing.title': 'Des offres adaptées à',
    'pricing.title_highlight': 'vos ambitions',
    'pricing.subtitle': 'Choisissez la formule qui correspond à vos besoins et votre budget.',
    'pricing.popular': 'Populaire',
    'pricing.choose': 'Choisir ce pack',
    'pricing.custom': 'Besoin d\'un pack sur-mesure ?',
    'pricing.custom_desc': 'Discutons de votre projet pour créer une offre adaptée à vos besoins.',
    'pricing.request_quote': 'Demander un devis personnalisé',
    'pricing.monthly': '/mois',
    'pricing.starting_at': 'À partir de',
    
    // About Section
    'about.badge': 'Qui sommes-nous',
    'about.title': 'Une agence',
    'about.title_highlight': 'passionnée',
    'about.subtitle': 'Nous accompagnons les entreprises dans leur transformation digitale avec expertise et créativité.',
    'about.description': 'Le Compagnon Virtuel est né de la conviction que chaque entreprise mérite une présence digitale à la hauteur de son ambition.',
    'about.value.innovation': 'Innovation',
    'about.value.quality': 'Qualité',
    'about.value.transparency': 'Transparence',
    'about.value.commitment': 'Engagement',
    
    // CTA Section
    'cta.badge': 'Offre limitée',
    'cta.title': 'Prêt à transformer',
    'cta.title_highlight': 'votre digital ?',
    'cta.subtitle': 'Discutons de votre projet. Audit gratuit et sans engagement pour identifier vos opportunités de croissance.',
    'cta.benefit.audit': 'Audit complet de votre présence digitale',
    'cta.benefit.recommendations': 'Recommandations personnalisées',
    'cta.benefit.roadmap': 'Roadmap de croissance sur-mesure',
    'cta.benefit.no_commitment': 'Sans engagement',
    'cta.request_audit': 'Demander un audit gratuit',
    'cta.conversion': 'Conversion',
    'cta.avg_clients': 'Moyenne clients',
    'cta.fast_response': 'Réponse rapide',
    'cta.always_available': 'Toujours disponible',
    
    // Guarantee
    'guarantee.title': 'Garantie Satisfait ou Remboursé',
    'guarantee.subtitle': '30 jours pour tester nos produits sans risque',
    'guarantee.description': 'Si nos produits ne répondent pas à vos attentes, nous vous remboursons intégralement. Aucune question posée.',
    'guarantee.feature.simple_refund': 'Remboursement simple',
    'guarantee.feature.simple_refund_desc': 'Un email suffit pour demander votre remboursement',
    'guarantee.feature.instant_delivery': 'Livraison instantanée',
    'guarantee.feature.instant_delivery_desc': 'Accès immédiat après achat',
    'guarantee.feature.premium_support': 'Support Premium',
    'guarantee.feature.premium_support_desc': 'Aide personnalisée 7j/7',
    'guarantee.feature.secure_payment': 'Paiement Sécurisé',
    'guarantee.feature.secure_payment_desc': 'Transactions 100% sécurisées',
    
    // Footer
    'footer.newsletter_title': 'Prêt à transformer votre digital ?',
    'footer.newsletter_subtitle': 'Discutons de votre projet et trouvons la solution idéale.',
    'footer.newsletter_cta': 'Parlons de votre projet',
    'footer.services': 'Services',
    'footer.shop': 'Boutique',
    'footer.company': 'Entreprise',
    'footer.contact': 'Contact',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'CGV',
    'footer.rights': 'Tous droits réservés',
    'footer.description': 'Votre partenaire digital pour concevoir, automatiser et faire croître des écosystèmes digitaux performants.',
    
    // Product Problem Solution
    'product.problem': 'Le problème',
    'product.solution': 'La solution',
    'product.results': 'Les résultats',
    'product.benefits': 'Ce que vous obtenez',
    'product.includes': 'Ce qui est inclus',
    
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
    'common.read_more': 'Lire la suite',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.or': 'ou',
    
    // Forms
    'form.name': 'Nom',
    'form.email': 'Email',
    'form.phone': 'Téléphone',
    'form.company': 'Entreprise',
    'form.message': 'Message',
    'form.submit': 'Envoyer',
    'form.required': 'Champ requis',
    'form.invalid_email': 'Email invalide',
    
    // Contact Page
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Une question ? Un projet ? N\'hésitez pas à nous contacter.',
    'contact.form_title': 'Envoyez-nous un message',
    'contact.info_title': 'Nos coordonnées',
    
    // About Page
    'about_page.title': 'À propos de nous',
    'about_page.subtitle': 'Découvrez notre histoire, notre mission et notre équipe.',
    'about_page.mission': 'Notre Mission',
    'about_page.values': 'Nos Valeurs',
    'about_page.team': 'Notre Équipe',
    
    // Blog
    'blog.title': 'Notre Blog',
    'blog.subtitle': 'Conseils, actualités et bonnes pratiques du digital.',
    'blog.read_article': 'Lire l\'article',
    'blog.published': 'Publié le',
    'blog.min_read': 'min de lecture',
    'blog.views': 'vues',
    
    // Portfolio
    'portfolio.title': 'Notre Portfolio',
    'portfolio.subtitle': 'Découvrez nos réalisations et les projets qui nous rendent fiers.',
    'portfolio.all_projects': 'Tous les projets',
    'portfolio.view_case_study': 'Voir le case study',
    
    // 404 Page
    '404.title': 'Page non trouvée',
    '404.subtitle': 'Oops ! La page que vous recherchez n\'existe pas.',
    '404.back_home': 'Retour à l\'accueil',
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
    'nav.pricing': 'Pricing',
    'nav.careers': 'Careers',
    
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
    'cta.discover_services': 'Discover Our Services',
    'cta.view_portfolio': 'View Portfolio',
    'cta.request_quote': 'Request a Quote',
    'cta.talk_project': 'Let\'s Talk About Your Project',
    
    // Hero Section
    'hero.badge.available': 'Available',
    'hero.badge.web_dev': 'Web Development',
    'hero.badge.automation': 'Automation & AI',
    'hero.badge.marketing': 'Digital Marketing',
    'hero.badge.design': 'Design & UX',
    'hero.badge.mobile': 'Mobile Apps',
    'hero.headline.partner': 'Your digital partner',
    'hero.headline.intelligent': 'intelligent',
    'hero.headline.automate': 'Automate your',
    'hero.headline.processes': 'processes',
    'hero.headline.accelerate': 'Accelerate your',
    'hero.headline.growth': 'growth',
    'hero.headline.interfaces': 'Interfaces that',
    'hero.headline.convert': 'convert',
    'hero.headline.mobile_apps': 'Performant mobile',
    'hero.headline.performant': 'applications',
    'hero.description.web': 'We design, automate and grow performant digital ecosystems for ambitious businesses.',
    'hero.description.ai': 'Integrate artificial intelligence and automation to optimize your operations and boost productivity.',
    'hero.description.marketing': 'Custom digital marketing strategies to attract, convert and retain your ideal customers.',
    'hero.description.design': 'Modern design and optimized user experience to maximize engagement and conversions.',
    'hero.description.mobile': 'Development of native or hybrid iOS and Android applications to reach your users wherever they are.',
    'hero.trust.no_commitment': 'No commitment',
    'hero.trust.quote_24h': 'Quote within 24h',
    'hero.trust.personalized': 'Personalized support',
    'hero.stat.response': 'Guaranteed response',
    'hero.stat.projects': 'Projects delivered',
    'hero.stat.satisfaction': 'Satisfied clients',
    
    // Services Section
    'services.badge': 'Our Services',
    'services.title': 'Everything you need',
    'services.title_highlight': 'to succeed',
    'services.subtitle': 'Complete expertise to create, develop and automate your digital presence.',
    'services.marketing': 'Digital Marketing',
    'services.marketing_desc': 'Custom strategies to maximize your visibility and conversions.',
    'services.content': 'Content Creation',
    'services.content_desc': 'Visuals, videos and copywriting that captivate your audience.',
    'services.community': 'Community Management',
    'services.community_desc': 'Animation and growth of your communities on social networks.',
    'services.automation': 'Automation & AI',
    'services.automation_desc': 'Optimize your processes with artificial intelligence.',
    'services.web_dev': 'Web Development',
    'services.web_dev_desc': 'Showcase sites, landing pages and custom web applications.',
    'services.ecommerce': 'E-commerce',
    'services.ecommerce_desc': 'High-performance online stores optimized for conversion.',
    'services.mobile': 'Mobile Apps',
    'services.mobile_desc': 'Mobile digital solutions tailored to your needs.',
    'services.branding': 'Branding & Identity',
    'services.branding_desc': 'Creation of memorable and coherent visual identities.',
    'services.discover_all': 'Discover all our services',
    
    // Stats Section
    'stats.badge': 'Our Results',
    'stats.title': 'Numbers that',
    'stats.title_highlight': 'speak',
    'stats.projects': 'Projects delivered',
    'stats.projects_desc': 'successfully',
    'stats.clients': 'Satisfied clients',
    'stats.clients_desc': 'trust us',
    'stats.roi': 'Average ROI',
    'stats.roi_desc': 'for our clients',
    'stats.response': 'Response time',
    'stats.response_desc': 'guaranteed',
    
    // Trust Badges Section
    'trust.satisfaction': 'Satisfaction Guarantee',
    'trust.satisfaction_desc': '100% satisfied or refunded',
    'trust.delivery': 'Fast Delivery',
    'trust.delivery_desc': 'Guaranteed deadline respect',
    'trust.support': '24/7 Support',
    'trust.support_desc': 'Always by your side',
    'trust.expertise': 'Certified Expertise',
    'trust.expertise_desc': 'Official partners',
    'trust.quality': 'Premium Quality',
    'trust.quality_desc': 'International standards',
    'trust.tech': 'Modern Technologies',
    'trust.tech_desc': 'Latest innovations',
    
    // Process Section
    'process.badge': 'Our Method',
    'process.title': 'A proven',
    'process.title_highlight': 'process',
    'process.subtitle': 'A clear and transparent methodology for successful projects.',
    'process.step1.title': 'Discovery & Exchange',
    'process.step1.desc': 'We analyze your needs, objectives and constraints during an in-depth first exchange.',
    'process.step2.title': 'Strategy & Design',
    'process.step2.desc': 'We develop a custom strategy and design solutions adapted to your challenges.',
    'process.step3.title': 'Development',
    'process.step3.desc': 'Our team brings your project to life with the most powerful technologies.',
    'process.step4.title': 'Launch & Follow-up',
    'process.step4.desc': 'Production launch, training and continuous support to guarantee your success.',
    
    // Testimonials Section
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'They trust',
    'testimonials.title_highlight': 'us',
    'testimonials.subtitle': 'Discover what our clients say about our collaboration.',
    
    // Featured Projects Section
    'projects.badge': 'Our Work',
    'projects.title': 'Recent projects that',
    'projects.title_highlight': 'inspire',
    'projects.subtitle': 'Discover how we helped our clients achieve their goals.',
    'projects.view_all': 'View all projects',
    'projects.view_case': 'View case study',
    
    // Shop Section
    'shop.badge': 'Digital Shop',
    'shop.title': 'Premium resources for',
    'shop.title_highlight': 'your growth',
    'shop.subtitle': 'Templates, courses and tools to accelerate your digital transformation.',
    'shop.add_to_cart': 'Add to Cart',
    'shop.added': 'Added',
    'shop.view_product': 'View Product',
    'shop.bestseller': 'Best Seller',
    'shop.new': 'New',
    'shop.limited_offer': 'Limited Offer',
    'shop.instant_access': 'Instant Access',
    'shop.secure_payment': 'Secure Payment',
    'shop.support_24_7': '24/7 Support',
    'shop.discover_all': 'Discover the full shop',
    'shop.category.templates': 'Templates',
    'shop.category.formations': 'Courses',
    'shop.category.resources': 'Resources',
    'shop.category.templates_desc': 'Ready-to-use sites and landing pages',
    'shop.category.formations_desc': 'Complete courses to master digital',
    'shop.category.resources_desc': 'Checklists, guides and practical tools',
    
    // Pricing Section
    'pricing.badge': 'Our Pricing',
    'pricing.title': 'Plans adapted to',
    'pricing.title_highlight': 'your ambitions',
    'pricing.subtitle': 'Choose the plan that matches your needs and budget.',
    'pricing.popular': 'Popular',
    'pricing.choose': 'Choose this plan',
    'pricing.custom': 'Need a custom plan?',
    'pricing.custom_desc': 'Let\'s discuss your project to create an offer tailored to your needs.',
    'pricing.request_quote': 'Request a custom quote',
    'pricing.monthly': '/month',
    'pricing.starting_at': 'Starting at',
    
    // About Section
    'about.badge': 'Who we are',
    'about.title': 'A passionate',
    'about.title_highlight': 'agency',
    'about.subtitle': 'We support companies in their digital transformation with expertise and creativity.',
    'about.description': 'Le Compagnon Virtuel was born from the conviction that every business deserves a digital presence that matches its ambition.',
    'about.value.innovation': 'Innovation',
    'about.value.quality': 'Quality',
    'about.value.transparency': 'Transparency',
    'about.value.commitment': 'Commitment',
    
    // CTA Section
    'cta.badge': 'Limited offer',
    'cta.title': 'Ready to transform',
    'cta.title_highlight': 'your digital?',
    'cta.subtitle': 'Let\'s discuss your project. Free and no-obligation audit to identify your growth opportunities.',
    'cta.benefit.audit': 'Complete audit of your digital presence',
    'cta.benefit.recommendations': 'Personalized recommendations',
    'cta.benefit.roadmap': 'Custom growth roadmap',
    'cta.benefit.no_commitment': 'No commitment',
    'cta.request_audit': 'Request a free audit',
    'cta.conversion': 'Conversion',
    'cta.avg_clients': 'Client average',
    'cta.fast_response': 'Fast response',
    'cta.always_available': 'Always available',
    
    // Guarantee
    'guarantee.title': 'Money-Back Guarantee',
    'guarantee.subtitle': '30 days to test our products risk-free',
    'guarantee.description': 'If our products don\'t meet your expectations, we\'ll refund you in full. No questions asked.',
    'guarantee.feature.simple_refund': 'Simple Refund',
    'guarantee.feature.simple_refund_desc': 'One email is all it takes to request your refund',
    'guarantee.feature.instant_delivery': 'Instant Delivery',
    'guarantee.feature.instant_delivery_desc': 'Immediate access after purchase',
    'guarantee.feature.premium_support': 'Premium Support',
    'guarantee.feature.premium_support_desc': 'Personalized help 7 days a week',
    'guarantee.feature.secure_payment': 'Secure Payment',
    'guarantee.feature.secure_payment_desc': '100% secure transactions',
    
    // Footer
    'footer.newsletter_title': 'Ready to transform your digital?',
    'footer.newsletter_subtitle': 'Let\'s discuss your project and find the ideal solution.',
    'footer.newsletter_cta': 'Let\'s talk about your project',
    'footer.services': 'Services',
    'footer.shop': 'Shop',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved',
    'footer.description': 'Your digital partner to design, automate and grow performant digital ecosystems.',
    
    // Product Problem Solution
    'product.problem': 'The Problem',
    'product.solution': 'The Solution',
    'product.results': 'The Results',
    'product.benefits': 'What you get',
    'product.includes': 'What\'s included',
    
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
    'common.read_more': 'Read more',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.or': 'or',
    
    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.company': 'Company',
    'form.message': 'Message',
    'form.submit': 'Submit',
    'form.required': 'Required field',
    'form.invalid_email': 'Invalid email',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have a question? A project? Don\'t hesitate to contact us.',
    'contact.form_title': 'Send us a message',
    'contact.info_title': 'Our contact details',
    
    // About Page
    'about_page.title': 'About Us',
    'about_page.subtitle': 'Discover our story, our mission and our team.',
    'about_page.mission': 'Our Mission',
    'about_page.values': 'Our Values',
    'about_page.team': 'Our Team',
    
    // Blog
    'blog.title': 'Our Blog',
    'blog.subtitle': 'Tips, news and digital best practices.',
    'blog.read_article': 'Read article',
    'blog.published': 'Published on',
    'blog.min_read': 'min read',
    'blog.views': 'views',
    
    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Discover our achievements and the projects we\'re proud of.',
    'portfolio.all_projects': 'All projects',
    'portfolio.view_case_study': 'View case study',
    
    // 404 Page
    '404.title': 'Page Not Found',
    '404.subtitle': 'Oops! The page you\'re looking for doesn\'t exist.',
    '404.back_home': 'Back to Home',
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
