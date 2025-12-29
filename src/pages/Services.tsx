import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Palette, 
  Users, 
  Bot, 
  Globe, 
  ShoppingCart, 
  Code, 
  Fingerprint, 
  Search, 
  PenTool, 
  Mail, 
  Target, 
  FileCheck, 
  HeartHandshake,
  Wrench,
  Layers,
  ArrowRight,
  Check
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const allServices = [
  {
    icon: Megaphone,
    title: "Marketing Digital & Stratégie",
    description: "Élaborez une stratégie marketing complète adaptée à vos objectifs. SEA, SMA, stratégie de contenu et analyse de données.",
    features: ["Audit marketing complet", "Stratégie multicanale", "Optimisation continue", "Reporting mensuel"],
  },
  {
    icon: Palette,
    title: "Création de Contenu",
    description: "Visuels percutants, vidéos engageantes et rédaction persuasive pour captiver votre audience.",
    features: ["Visuels réseaux sociaux", "Vidéo & motion design", "Rédaction web", "Infographies"],
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation quotidienne et croissance organique de vos communautés sur toutes les plateformes.",
    features: ["Animation quotidienne", "Modération", "Engagement", "Reporting"],
  },
  {
    icon: Bot,
    title: "Automatisation & IA",
    description: "Optimisez vos processus avec l'intelligence artificielle et l'automatisation marketing.",
    features: ["Chatbots IA", "Workflows automatisés", "Intégrations", "Personnalisation"],
  },
  {
    icon: Globe,
    title: "Développement Web",
    description: "Sites vitrines, landing pages et plateformes web sur-mesure avec les dernières technologies.",
    features: ["Sites responsives", "Performance optimisée", "SEO-friendly", "Maintenance incluse"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne performantes, optimisées pour la conversion et l'expérience utilisateur.",
    features: ["Shopify / WooCommerce", "Tunnel de vente", "Paiement sécurisé", "Gestion stocks"],
  },
  {
    icon: Code,
    title: "Applications Web",
    description: "Solutions digitales complexes : SaaS, plateformes, dashboards et outils métiers sur-mesure.",
    features: ["React / Next.js", "Backend robuste", "API & intégrations", "Scalabilité"],
  },
  {
    icon: Layers,
    title: "Design UI/UX",
    description: "Interfaces utilisateur intuitives et expériences digitales mémorables centrées sur l'utilisateur.",
    features: ["Wireframes", "Prototypes", "User testing", "Design system"],
  },
  {
    icon: Fingerprint,
    title: "Branding & Identité",
    description: "Création d'identités visuelles uniques et cohérentes qui marquent les esprits.",
    features: ["Logo & charte graphique", "Guidelines", "Supports print", "Brand book"],
  },
  {
    icon: Search,
    title: "SEO & Visibilité",
    description: "Optimisation pour les moteurs de recherche et stratégies de visibilité long terme.",
    features: ["Audit technique", "Optimisation on-page", "Netlinking", "Suivi positions"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textes persuasifs qui convertissent : pages de vente, emails, publicités et contenus web.",
    features: ["Pages de vente", "Scripts vidéo", "Publicités", "Storytelling"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Campagnes email performantes, séquences automatisées et newsletters engageantes.",
    features: ["Séquences nurturing", "Newsletters", "A/B testing", "Segmentation"],
  },
  {
    icon: Target,
    title: "Génération de Leads",
    description: "Stratégies d'acquisition de prospects qualifiés via tous les canaux digitaux.",
    features: ["Lead magnets", "Landing pages", "Publicités ciblées", "Qualification"],
  },
  {
    icon: FileCheck,
    title: "Audit & Conseil",
    description: "Analyse approfondie de votre écosystème digital et recommandations stratégiques.",
    features: ["Audit complet", "Recommandations", "Roadmap", "Accompagnement"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Accompagnement technique continu, mises à jour et support réactif.",
    features: ["Mises à jour", "Sauvegardes", "Sécurité", "Support prioritaire"],
  },
  {
    icon: HeartHandshake,
    title: "Formation & Coaching",
    description: "Montez en compétences sur les outils digitaux avec nos formations personnalisées.",
    features: ["Formations individuelles", "Ateliers pratiques", "Documentation", "Suivi post-formation"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Nos Services
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Expertise complète pour{" "}
                <span className="gradient-text">votre succès digital</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                De la stratégie à l'exécution, nous couvrons tous les aspects de votre transformation digitale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allServices.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
