export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  client: string;
  industry: string;
  duration: string;
  year: string;
  challenge: string;
  solution: string;
  approach: string[];
  results: ProjectMetric[];
  gallery: ProjectImage[];
  testimonial?: ProjectTestimonial;
  technologies: string[];
  services: string[];
  nextProject?: string;
  prevProject?: string;
}

export const projects: Project[] = [
  {
    slug: "boutique-ecommerce-mode",
    title: "Boutique E-commerce Mode",
    category: "E-commerce",
    description: "Refonte complète d'une boutique en ligne avec augmentation de 180% du taux de conversion.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    tags: ["Shopify", "UI/UX", "Marketing"],
    client: "ModaChic Paris",
    industry: "Mode & Luxe",
    duration: "4 mois",
    year: "2024",
    challenge: "ModaChic Paris, une marque de prêt-à-porter haut de gamme, faisait face à un taux de conversion de seulement 0.8% sur leur ancienne boutique. L'expérience mobile était particulièrement problématique avec 70% d'abandons de panier. Ils avaient besoin d'une refonte complète pour rivaliser avec les grandes enseignes du secteur.",
    solution: "Nous avons conçu une expérience d'achat immersive centrée sur le storytelling de la marque. L'interface a été repensée pour mettre en valeur les produits avec des visuels grand format, des animations fluides et un tunnel d'achat optimisé. L'intégration d'un système de recommandation IA personnalisée a permis d'augmenter le panier moyen.",
    approach: [
      "Audit UX complet et analyse des parcours utilisateurs",
      "Création de wireframes et prototypes interactifs",
      "Design system sur-mesure respectant l'ADN de la marque",
      "Développement Shopify avec thème personnalisé",
      "Intégration d'un moteur de recommandation IA",
      "Optimisation des performances et du SEO technique"
    ],
    results: [
      { value: "+180%", label: "Taux de conversion", description: "Passage de 0.8% à 2.2%" },
      { value: "+65%", label: "Panier moyen", description: "De 120€ à 198€" },
      { value: "-45%", label: "Taux de rebond", description: "Amélioration de l'engagement" },
      { value: "2.1s", label: "Temps de chargement", description: "Optimisation des performances" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop", alt: "Homepage desktop", caption: "Page d'accueil avec mise en avant des collections" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop", alt: "Page produit", caption: "Fiche produit immersive avec zoom haute définition" },
      { url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=800&fit=crop", alt: "Mobile experience", caption: "Expérience mobile optimisée" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop", alt: "Checkout", caption: "Tunnel d'achat simplifié en 3 étapes" }
    ],
    testimonial: {
      quote: "Le Compagnon Virtuel a transformé notre présence en ligne. Les résultats ont dépassé toutes nos attentes. Notre boutique est enfin à la hauteur de notre image de marque.",
      author: "Marie Dubois",
      role: "Directrice E-commerce",
      company: "ModaChic Paris"
    },
    technologies: ["Shopify", "Liquid", "JavaScript", "Klaviyo", "Google Analytics 4"],
    services: ["Design UI/UX", "Développement E-commerce", "Stratégie Marketing", "SEO"],
    nextProject: "application-saas-b2b",
    prevProject: "identite-visuelle-startup"
  },
  {
    slug: "application-saas-b2b",
    title: "Application SaaS B2B",
    category: "Application Web",
    description: "Développement d'une plateforme de gestion de projet pour équipes agiles.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
    client: "AgileFlow",
    industry: "Tech / SaaS",
    duration: "8 mois",
    year: "2024",
    challenge: "AgileFlow souhaitait créer une plateforme de gestion de projet nouvelle génération capable de rivaliser avec les leaders du marché. L'enjeu était de proposer une expérience utilisateur intuitive tout en offrant des fonctionnalités avancées d'automatisation et de reporting.",
    solution: "Nous avons développé une application web progressive (PWA) avec une architecture moderne et scalable. L'interface utilise des principes de design thinking pour une adoption rapide par les utilisateurs. Les tableaux Kanban interactifs et les automatisations no-code permettent une personnalisation poussée.",
    approach: [
      "Ateliers de co-création avec les équipes produit",
      "Architecture technique scalable et modulaire",
      "Développement agile avec sprints de 2 semaines",
      "Tests utilisateurs itératifs et amélioration continue",
      "Intégration CI/CD pour déploiements automatisés",
      "Documentation technique et formation des équipes"
    ],
    results: [
      { value: "10K+", label: "Utilisateurs actifs", description: "En seulement 6 mois" },
      { value: "4.8/5", label: "Note utilisateurs", description: "Sur les stores d'apps" },
      { value: "99.9%", label: "Uptime", description: "Disponibilité garantie" },
      { value: "-30%", label: "Temps de gestion", description: "Gain de productivité" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop", alt: "Dashboard principal", caption: "Tableau de bord avec vue d'ensemble des projets" },
      { url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop", alt: "Vue Kanban", caption: "Tableaux Kanban personnalisables" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop", alt: "Reporting", caption: "Rapports et analytics en temps réel" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop", alt: "Collaboration", caption: "Outils de collaboration en temps réel" }
    ],
    testimonial: {
      quote: "Une équipe technique exceptionnelle qui a su comprendre nos besoins et livrer un produit qui dépasse nos attentes. La qualité du code et de l'architecture est remarquable.",
      author: "Thomas Martin",
      role: "CTO",
      company: "AgileFlow"
    },
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    services: ["Architecture technique", "Développement Full-Stack", "UI/UX Design", "DevOps"],
    nextProject: "site-vitrine-cabinet-avocat",
    prevProject: "boutique-ecommerce-mode"
  },
  {
    slug: "site-vitrine-cabinet-avocat",
    title: "Site Vitrine Cabinet Avocat",
    category: "Site Web",
    description: "Site premium avec référencement local optimisé et prise de rendez-vous en ligne.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=600&fit=crop",
    tags: ["WordPress", "SEO", "Branding"],
    client: "Cabinet Legrand & Associés",
    industry: "Juridique",
    duration: "2 mois",
    year: "2024",
    challenge: "Le cabinet Legrand & Associés avait une présence digitale quasi inexistante malgré une excellente réputation. Leur ancien site, daté de 2015, ne reflétait pas leur expertise ni leur positionnement haut de gamme. L'objectif était de générer des leads qualifiés via le SEO local.",
    solution: "Nous avons créé un site vitrine premium qui inspire confiance et professionnalisme. L'intégration d'un système de prise de rendez-vous en ligne a modernisé leur approche client. Une stratégie SEO local agressive a permis de dominer les recherches sur Paris et l'Île-de-France.",
    approach: [
      "Étude de la concurrence et positionnement différenciant",
      "Shooting photo professionnel au cabinet",
      "Design élégant et sobre adapté au secteur juridique",
      "Développement WordPress avec thème sur-mesure",
      "Optimisation SEO local et Google Business Profile",
      "Mise en place du système de réservation Calendly"
    ],
    results: [
      { value: "#1", label: "Position Google", description: "Sur 'avocat droit des affaires Paris'" },
      { value: "+350%", label: "Trafic organique", description: "En 6 mois" },
      { value: "45", label: "Leads/mois", description: "Demandes de consultation" },
      { value: "100", label: "Score PageSpeed", description: "Performance optimale" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=800&fit=crop", alt: "Homepage", caption: "Page d'accueil inspirant confiance" },
      { url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop", alt: "Page équipe", caption: "Présentation de l'équipe d'avocats" },
      { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop", alt: "Page expertise", caption: "Mise en avant des domaines d'expertise" },
      { url: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1200&h=800&fit=crop", alt: "Contact", caption: "Page contact avec prise de RDV intégrée" }
    ],
    testimonial: {
      quote: "Notre nouveau site a complètement transformé notre acquisition client. Nous recevons désormais des demandes de consultation qualifiées chaque jour.",
      author: "Maître Claire Legrand",
      role: "Associée Fondatrice",
      company: "Cabinet Legrand & Associés"
    },
    technologies: ["WordPress", "PHP", "Elementor Pro", "Calendly", "Google Analytics"],
    services: ["Design Web", "Développement WordPress", "SEO Local", "Photographie"],
    nextProject: "campagne-marketing-360",
    prevProject: "application-saas-b2b"
  },
  {
    slug: "campagne-marketing-360",
    title: "Campagne Marketing 360°",
    category: "Marketing",
    description: "Stratégie multicanale avec +500% de leads générés en 6 mois.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop",
    tags: ["SEA", "Social Ads", "Email"],
    client: "GreenTech Solutions",
    industry: "Énergie / CleanTech",
    duration: "6 mois",
    year: "2023",
    challenge: "GreenTech Solutions, spécialiste des panneaux solaires pour professionnels, générait moins de 20 leads par mois malgré un marché en pleine expansion. Leur marketing digital était inexistant et ils dépendaient uniquement du bouche-à-oreille pour leur acquisition.",
    solution: "Nous avons déployé une stratégie marketing 360° combinant SEA, Social Ads, content marketing et automation email. Chaque canal a été optimisé pour cibler les décideurs B2B du secteur. Un scoring intelligent a permis de qualifier automatiquement les leads.",
    approach: [
      "Audit complet de la présence digitale existante",
      "Définition des personas et parcours d'achat B2B",
      "Création de landing pages optimisées pour la conversion",
      "Déploiement de campagnes Google Ads et LinkedIn Ads",
      "Mise en place d'un funnel email nurturing",
      "Suivi et optimisation continue des performances"
    ],
    results: [
      { value: "+500%", label: "Leads générés", description: "De 20 à 120 leads/mois" },
      { value: "-45%", label: "Coût par lead", description: "Optimisation du budget" },
      { value: "4.2x", label: "ROAS", description: "Retour sur investissement publicitaire" },
      { value: "12", label: "Contrats signés", description: "Valeur totale : 2.4M€" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&h=800&fit=crop", alt: "Campaign dashboard", caption: "Dashboard de suivi des campagnes" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop", alt: "Analytics", caption: "Analytics et reporting personnalisé" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop", alt: "Landing page", caption: "Landing page optimisée conversion" },
      { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop", alt: "Email marketing", caption: "Séquences email automatisées" }
    ],
    testimonial: {
      quote: "Les résultats parlent d'eux-mêmes : nous avons multiplié par 6 notre génération de leads tout en réduisant nos coûts d'acquisition. Un partenariat stratégique essentiel pour notre croissance.",
      author: "Pierre Durand",
      role: "Directeur Commercial",
      company: "GreenTech Solutions"
    },
    technologies: ["Google Ads", "LinkedIn Ads", "HubSpot", "Hotjar", "Google Analytics 4"],
    services: ["Stratégie Marketing", "SEA/SMA", "Content Marketing", "Marketing Automation"],
    nextProject: "chatbot-ia-service-client",
    prevProject: "site-vitrine-cabinet-avocat"
  },
  {
    slug: "chatbot-ia-service-client",
    title: "Chatbot IA Service Client",
    category: "Automatisation",
    description: "Assistant virtuel intelligent réduisant de 60% les demandes au support.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    tags: ["IA", "Chatbot", "Intégration"],
    client: "TechSupport Pro",
    industry: "Services IT",
    duration: "3 mois",
    year: "2024",
    challenge: "TechSupport Pro, prestataire de services informatiques, croulait sous les demandes de support niveau 1. Avec plus de 500 tickets par jour, leur équipe était débordée et le temps de réponse moyen atteignait 4 heures, impactant la satisfaction client.",
    solution: "Nous avons développé un chatbot IA capable de comprendre le langage naturel et de résoudre automatiquement les problèmes courants. Intégré à leur base de connaissances et à leur système de ticketing, il assure un support 24/7 et escalade intelligemment vers les humains quand nécessaire.",
    approach: [
      "Analyse des 10 000 derniers tickets pour identifier les patterns",
      "Conception des arbres de décision et intentions",
      "Entraînement du modèle NLP sur le vocabulaire technique",
      "Intégration avec Zendesk et la base de connaissances",
      "Tests utilisateurs et affinage des réponses",
      "Déploiement progressif et monitoring continu"
    ],
    results: [
      { value: "-60%", label: "Tickets support", description: "Résolus automatiquement" },
      { value: "24/7", label: "Disponibilité", description: "Support permanent" },
      { value: "30s", label: "Temps de réponse", description: "Vs 4h auparavant" },
      { value: "92%", label: "Satisfaction", description: "Taux de satisfaction utilisateur" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop", alt: "Chatbot interface", caption: "Interface conversationnelle intuitive" },
      { url: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1200&h=800&fit=crop", alt: "Dashboard analytics", caption: "Analytics des conversations" },
      { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop", alt: "Integration", caption: "Intégration avec les outils existants" },
      { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop", alt: "Training", caption: "Interface d'entraînement IA" }
    ],
    testimonial: {
      quote: "Ce chatbot a révolutionné notre support client. Nos agents peuvent enfin se concentrer sur les cas complexes tandis que l'IA gère efficacement les demandes courantes.",
      author: "Sophie Bernard",
      role: "Directrice Support",
      company: "TechSupport Pro"
    },
    technologies: ["OpenAI GPT", "Python", "Zendesk API", "React", "PostgreSQL"],
    services: ["Développement IA", "Intégration API", "UX Conversationnel", "Formation"],
    nextProject: "identite-visuelle-startup",
    prevProject: "campagne-marketing-360"
  },
  {
    slug: "identite-visuelle-startup",
    title: "Identité Visuelle Startup",
    category: "Branding",
    description: "Création complète de l'univers de marque pour une startup tech innovante.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Logo", "Charte graphique", "Print"],
    client: "NovaTech Labs",
    industry: "Tech / Innovation",
    duration: "2 mois",
    year: "2024",
    challenge: "NovaTech Labs, startup deeptech spécialisée dans l'IA générative, préparait sa levée de fonds Série A. Ils avaient besoin d'une identité de marque forte et mémorable pour se démarquer auprès des investisseurs et attirer les meilleurs talents.",
    solution: "Nous avons créé une identité visuelle moderne et audacieuse qui reflète l'innovation et la vision futuriste de la startup. Le système de design flexible permet une application cohérente sur tous les supports, du digital au print.",
    approach: [
      "Ateliers stratégiques pour définir le positionnement de marque",
      "Exploration créative et moodboards",
      "Création du logo et de ses déclinaisons",
      "Développement de la charte graphique complète",
      "Design du kit pitch deck investisseurs",
      "Création des templates réseaux sociaux et documents"
    ],
    results: [
      { value: "12M€", label: "Levée réussie", description: "Série A bouclée" },
      { value: "+200%", label: "Candidatures", description: "Attractivité employeur" },
      { value: "95%", label: "Reconnaissance", description: "Test de mémorisation logo" },
      { value: "50+", label: "Assets créés", description: "Kit de marque complet" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop", alt: "Brand identity", caption: "Système d'identité visuelle" },
      { url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&h=800&fit=crop", alt: "Logo variations", caption: "Déclinaisons du logo" },
      { url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop", alt: "Brand guidelines", caption: "Extrait de la charte graphique" },
      { url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop", alt: "Applications", caption: "Applications de la marque" }
    ],
    testimonial: {
      quote: "Notre nouvelle identité a joué un rôle clé dans notre levée de fonds. Les investisseurs ont été impressionnés par le professionnalisme et la cohérence de notre image de marque.",
      author: "Alexandre Chen",
      role: "CEO & Co-fondateur",
      company: "NovaTech Labs"
    },
    technologies: ["Figma", "Adobe Creative Suite", "Principle", "Notion"],
    services: ["Direction Artistique", "Design de Logo", "Charte Graphique", "Brand Guidelines"],
    nextProject: "boutique-ecommerce-mode",
    prevProject: "chatbot-ia-service-client"
  },
  {
    slug: "site-restaurant-abidjan",
    title: "Site Restaurant — Saveurs d'Abidjan",
    category: "Site Web",
    description: "Site vitrine premium pour un restaurant haut de gamme à Abidjan avec réservation en ligne et menu interactif.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    tags: ["Restaurant", "Réservation", "Menu Digital"],
    client: "Saveurs d'Abidjan",
    industry: "Restauration",
    duration: "5 jours",
    year: "2025",
    challenge: "Le restaurant Saveurs d'Abidjan souhaitait se démarquer dans un marché concurrentiel en proposant une expérience digitale à la hauteur de sa cuisine gastronomique. Leur présence en ligne se limitait à une page Facebook avec des photos de mauvaise qualité, ne reflétant pas le standing de l'établissement.",
    solution: "Nous avons créé un site vitrine immersif mettant en valeur l'ambiance et la cuisine du restaurant. Un système de réservation en ligne intégré, un menu digital interactif avec photos haute qualité et une section événements privés permettent de convertir les visiteurs en clients.",
    approach: [
      "Shooting photo professionnel des plats et de l'ambiance",
      "Design immersif avec animations fluides",
      "Menu digital interactif avec filtres allergènes",
      "Système de réservation en ligne intégré",
      "Optimisation SEO local pour Abidjan",
      "Intégration Google Maps et avis clients"
    ],
    results: [
      { value: "+280%", label: "Réservations en ligne", description: "Vs bouche-à-oreille seul" },
      { value: "45%", label: "Taux de conversion", description: "Visiteurs → réservations" },
      { value: "#1", label: "Google Local", description: "Restaurant gastronomique Abidjan" },
      { value: "1.8s", label: "Temps de chargement", description: "Performance mobile optimale" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop", alt: "Intérieur restaurant", caption: "Ambiance premium du restaurant" },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop", alt: "Plat gastronomique", caption: "Menu interactif avec photos HD" },
      { url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop", alt: "Réservation mobile", caption: "Système de réservation responsive" },
      { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop", alt: "Événements", caption: "Section événements privés" }
    ],
    testimonial: {
      quote: "Depuis le lancement du site, nos réservations ont explosé. Les clients nous disent qu'ils ont été séduits par les photos et la facilité de réservation. Un investissement qui s'est rentabilisé en 2 semaines.",
      author: "Chef Kouamé",
      role: "Chef & Propriétaire",
      company: "Saveurs d'Abidjan"
    },
    technologies: ["React", "Tailwind CSS", "Supabase", "Google Maps API", "Framer Motion"],
    services: ["Design Web Premium", "Développement Sur-Mesure", "SEO Local", "Photographie"],
    nextProject: "site-spa-eclat-beaute",
    prevProject: "identite-visuelle-startup"
  },
  {
    slug: "site-spa-eclat-beaute",
    title: "Site Spa & Bien-être — Éclat Beauté",
    category: "Site Web",
    description: "Plateforme élégante pour un spa premium avec système de réservation et catalogue de soins interactif.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=800&h=600&fit=crop",
    tags: ["Spa", "Réservation", "Bien-être"],
    client: "Éclat Beauté Spa",
    industry: "Beauté & Bien-être",
    duration: "7 jours",
    year: "2025",
    challenge: "Éclat Beauté, spa haut de gamme à Cocody, perdait des clients potentiels faute de visibilité en ligne. Les clientes cherchaient des soins et des tarifs avant de se déplacer, mais le spa n'avait aucune présence web professionnelle.",
    solution: "Un site vitrine luxueux reflétant l'univers zen du spa avec catalogue de soins détaillé, tarifs transparents, galerie photo immersive et système de prise de rendez-vous en ligne relié directement au planning du spa.",
    approach: [
      "Immersion dans l'univers du spa pour capter l'ambiance",
      "Design épuré et luxueux avec palette zen",
      "Catalogue de soins interactif avec tarifs",
      "Système de réservation avec créneaux en temps réel",
      "Galerie avant/après pour preuves sociales",
      "Optimisation mobile prioritaire"
    ],
    results: [
      { value: "+200%", label: "Prises de RDV", description: "En 3 mois" },
      { value: "60%", label: "Clients via le web", description: "Nouvelle source d'acquisition" },
      { value: "4.9/5", label: "Satisfaction", description: "Note des clientes" },
      { value: "+35%", label: "Panier moyen", description: "Grâce aux packages en ligne" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=1200&h=800&fit=crop", alt: "Ambiance spa", caption: "Design zen reflétant l'univers du spa" },
      { url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop", alt: "Soins", caption: "Catalogue de soins interactif" },
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop", alt: "Réservation", caption: "Réservation en ligne simplifiée" },
      { url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop", alt: "Produits", caption: "Boutique de produits de soins" }
    ],
    testimonial: {
      quote: "Le site a complètement changé notre façon de travailler. Nos clientes réservent en ligne à toute heure et découvrent des soins qu'elles n'auraient jamais demandés au comptoir.",
      author: "Aminata Diallo",
      role: "Directrice",
      company: "Éclat Beauté Spa"
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Calendly API"],
    services: ["Design UI/UX", "Développement Web", "SEO Local", "Stratégie Digitale"],
    nextProject: "site-cabinet-dentaire",
    prevProject: "site-restaurant-abidjan"
  },
  {
    slug: "site-cabinet-dentaire",
    title: "Site Cabinet Dentaire Excellence",
    category: "Site Web",
    description: "Site professionnel pour cabinet dentaire avec prise de rendez-vous et présentation des soins en détail.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop",
    tags: ["Médical", "Rendez-vous", "Santé"],
    client: "Cabinet Dentaire Excellence",
    industry: "Santé / Médical",
    duration: "10 jours",
    year: "2025",
    challenge: "Le cabinet dentaire avait du mal à attirer de nouveaux patients malgré un équipement moderne et des praticiens qualifiés. Les patients potentiels cherchaient des informations en ligne mais ne trouvaient que des annuaires génériques sans détails sur les soins proposés.",
    solution: "Un site professionnel rassurant avec présentation détaillée de chaque soin, tarifs indicatifs, galerie de l'équipement moderne, profils des praticiens et système de prise de rendez-vous intégré avec rappels SMS automatiques.",
    approach: [
      "Étude des parcours patients en ligne",
      "Design rassurant et professionnel",
      "Pages détaillées par type de soin",
      "Galerie équipement pour rassurer",
      "Prise de RDV avec créneaux disponibles",
      "Blog santé dentaire pour le SEO"
    ],
    results: [
      { value: "+180%", label: "Nouveaux patients", description: "Via le canal digital" },
      { value: "85%", label: "RDV en ligne", description: "Vs téléphone" },
      { value: "#2", label: "Google Local", description: "Dentiste Cocody Abidjan" },
      { value: "-50%", label: "No-shows", description: "Grâce aux rappels SMS" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=800&fit=crop", alt: "Cabinet", caption: "Présentation du cabinet moderne" },
      { url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop", alt: "Équipement", caption: "Équipement de pointe" },
      { url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=800&fit=crop", alt: "Équipe", caption: "Équipe de praticiens" },
      { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop", alt: "Soins", caption: "Détail des soins proposés" }
    ],
    testimonial: {
      quote: "Nos patients nous trouvent facilement sur Google maintenant et prennent rendez-vous en 2 clics. Le taux de no-show a chuté grâce aux rappels automatiques.",
      author: "Dr. Yao Konan",
      role: "Chirurgien-Dentiste",
      company: "Cabinet Dentaire Excellence"
    },
    technologies: ["React", "TypeScript", "Supabase", "Twilio SMS", "Google Analytics"],
    services: ["Design Web Médical", "Développement Full-Stack", "SEO Santé", "Automatisation"],
    nextProject: "site-btp-bati-pro",
    prevProject: "site-spa-eclat-beaute"
  },
  {
    slug: "site-btp-bati-pro",
    title: "Site BTP — Bâti Pro CI",
    category: "Site Web",
    description: "Vitrine professionnelle pour entreprise de construction avec portfolio de chantiers et demande de devis.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    tags: ["BTP", "Construction", "Devis"],
    client: "Bâti Pro CI",
    industry: "Construction / BTP",
    duration: "8 jours",
    year: "2025",
    challenge: "Bâti Pro CI, entreprise de construction et rénovation, dépendait uniquement du bouche-à-oreille pour obtenir des contrats. Dans un secteur où la confiance est primordiale, ils n'avaient aucun moyen de montrer leurs réalisations passées aux prospects avant un rendez-vous.",
    solution: "Un site vitrine robuste et professionnel présentant chaque type de prestation avec photos de chantiers réels, un portfolio filtrable par catégorie, des témoignages clients vérifiés et un formulaire de demande de devis détaillé avec estimation automatique.",
    approach: [
      "Reportages photo sur les chantiers en cours",
      "Portfolio interactif filtrable par catégorie",
      "Pages services détaillées avec processus",
      "Formulaire de devis intelligent avec critères",
      "Section certifications et assurances",
      "Optimisation pour recherches locales BTP"
    ],
    results: [
      { value: "+320%", label: "Demandes de devis", description: "Canal digital nouveau" },
      { value: "3x", label: "Chiffre d'affaires", description: "En 6 mois" },
      { value: "70%", label: "Taux de conversion", description: "Devis → signature" },
      { value: "#1", label: "Google Local", description: "Construction Abidjan" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop", alt: "Chantier", caption: "Portfolio de réalisations" },
      { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop", alt: "Construction", caption: "Suivi de chantier détaillé" },
      { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop", alt: "Plan", caption: "Présentation des services" },
      { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop", alt: "Équipe", caption: "L'équipe sur le terrain" }
    ],
    testimonial: {
      quote: "Le portfolio en ligne nous a donné une crédibilité immédiate. Les prospects arrivent déjà convaincus par nos réalisations. Le formulaire de devis nous fait gagner un temps fou.",
      author: "Ibrahim Touré",
      role: "Directeur Général",
      company: "Bâti Pro CI"
    },
    technologies: ["React", "Tailwind CSS", "Supabase", "Google Maps", "Cloudinary"],
    services: ["Design Web", "Développement", "SEO Local", "Photographie Chantier"],
    nextProject: "site-immobilier-ivoire-immo",
    prevProject: "site-cabinet-dentaire"
  },
  {
    slug: "site-immobilier-ivoire-immo",
    title: "Plateforme Immobilière — Ivoire Immo",
    category: "Application Web",
    description: "Plateforme de listings immobiliers avec recherche avancée, visites virtuelles et mise en relation agent-client.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    tags: ["Immobilier", "Listings", "Plateforme"],
    client: "Ivoire Immo",
    industry: "Immobilier",
    duration: "15 jours",
    year: "2025",
    challenge: "Ivoire Immo, agence immobilière en pleine croissance, gérait ses annonces manuellement via WhatsApp et Facebook. Les biens se perdaient dans les fils d'actualité, les clients ne pouvaient pas filtrer par critères, et le suivi des prospects était chaotique.",
    solution: "Une plateforme immobilière complète avec listings structurés, recherche avancée multi-critères (localisation, budget, type de bien), galeries photos immersives, formulaire de contact par bien, et tableau de bord agent pour le suivi des prospects.",
    approach: [
      "Analyse des plateformes immobilières de référence",
      "Système de recherche multi-critères avancé",
      "Galeries photos immersives avec plans",
      "Formulaire de contact contextualisé par bien",
      "Dashboard agent pour suivi prospects",
      "Intégration WhatsApp pour contact direct"
    ],
    results: [
      { value: "500+", label: "Biens listés", description: "En 3 mois" },
      { value: "+400%", label: "Leads qualifiés", description: "Vs WhatsApp seul" },
      { value: "2.5x", label: "Ventes mensuelles", description: "Augmentation directe" },
      { value: "24/7", label: "Disponibilité", description: "Les biens sont toujours visibles" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop", alt: "Plateforme", caption: "Listings immobiliers structurés" },
      { url: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=800&fit=crop", alt: "Recherche", caption: "Recherche avancée multi-critères" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop", alt: "Détail bien", caption: "Fiche bien détaillée avec galerie" },
      { url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop", alt: "Dashboard", caption: "Dashboard agent immobilier" }
    ],
    testimonial: {
      quote: "On est passé du chaos WhatsApp à une plateforme professionnelle. Nos clients trouvent leurs biens en autonomie et nous contactent déjà informés. Nos ventes ont plus que doublé.",
      author: "Awa Koné",
      role: "Directrice Commerciale",
      company: "Ivoire Immo"
    },
    technologies: ["React", "TypeScript", "Supabase", "Mapbox", "Cloudinary", "WhatsApp API"],
    services: ["Conception Plateforme", "Développement Full-Stack", "UX/UI Design", "SEO Immobilier"],
    nextProject: "site-opticien-vue-claire",
    prevProject: "site-btp-bati-pro"
  },
  {
    slug: "site-opticien-vue-claire",
    title: "Site Opticien — Vue Claire",
    category: "Site Web",
    description: "Site e-commerce vitrine pour opticien avec catalogue de montures, prise de rendez-vous et essayage virtuel.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop",
    tags: ["Optique", "E-commerce", "Santé"],
    client: "Vue Claire Optique",
    industry: "Optique / Santé",
    duration: "10 jours",
    year: "2025",
    challenge: "Vue Claire, opticien indépendant, faisait face à la concurrence des chaînes nationales dotées de sites web modernes. Sans présence en ligne, ils ne captaient que la clientèle de passage alors que 80% des acheteurs de lunettes recherchent d'abord en ligne.",
    solution: "Un site combinant vitrine et e-commerce avec catalogue de montures filtrable, système de prise de rendez-vous pour examens de vue, blog santé oculaire pour le SEO, et section promotions pour fidéliser la clientèle existante.",
    approach: [
      "Photographie professionnelle des montures",
      "Catalogue filtrable (marque, style, prix)",
      "Prise de RDV examen de vue en ligne",
      "Blog santé oculaire pour référencement",
      "Section assurances et mutuelles partenaires",
      "Programme de fidélité intégré"
    ],
    results: [
      { value: "+150%", label: "Visites en boutique", description: "Générées par le site" },
      { value: "40%", label: "RDV en ligne", description: "Nouveaux patients" },
      { value: "+90%", label: "Trafic organique", description: "Blog santé oculaire" },
      { value: "4.8/5", label: "Avis Google", description: "Reputation en ligne" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=800&fit=crop", alt: "Montures", caption: "Catalogue de montures interactif" },
      { url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1200&h=800&fit=crop", alt: "Boutique", caption: "Présentation de la boutique" },
      { url: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=1200&h=800&fit=crop", alt: "Examen", caption: "Prise de rendez-vous simplifiée" },
      { url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop", alt: "Blog", caption: "Blog santé oculaire" }
    ],
    testimonial: {
      quote: "Notre site nous a permis de rivaliser avec les grandes chaînes. Les patients prennent rendez-vous en ligne et arrivent en sachant déjà ce qu'ils veulent. Notre chiffre d'affaires a bondi.",
      author: "Dr. Soro Mamadou",
      role: "Optométriste & Gérant",
      company: "Vue Claire Optique"
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Calendly"],
    services: ["Design E-commerce", "Développement Web", "SEO Santé", "Content Marketing"],
    nextProject: "boutique-ecommerce-mode",
    prevProject: "site-immobilier-ivoire-immo"
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsList = () => {
  return projects.map(({ slug, title, category, description, image, tags }) => ({
    slug,
    title,
    category,
    description,
    image,
    tags
  }));
};
