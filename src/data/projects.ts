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
