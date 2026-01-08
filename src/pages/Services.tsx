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
  Smartphone,
  Search, 
  Zap, 
  FileSearch,
  ArrowRight,
  Check
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Stratégies marketing complètes pour attirer, convertir et fidéliser vos clients. SEO, publicités, email marketing.",
    features: ["Stratégie multicanale", "Publicités Google/Meta", "Email marketing", "Analytics"],
    link: "/services/marketing-digital",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation et croissance de vos communautés sur tous les réseaux sociaux.",
    features: ["Calendrier éditorial", "Engagement quotidien", "Modération", "Reporting"],
    link: "/services/community-management",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Palette,
    title: "Création de Contenus",
    description: "Visuels, vidéos et textes professionnels qui captent l'attention et convertissent.",
    features: ["Visuels réseaux sociaux", "Reels & TikTok", "Copywriting", "Photos produits"],
    link: "/services/creation-contenu",
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Smartphone,
    title: "Branding & Identité",
    description: "Création d'identités visuelles uniques et mémorables qui marquent les esprits.",
    features: ["Logo & charte graphique", "Guidelines", "Supports print", "Brand book"],
    link: "/services/design-branding",
    color: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    icon: Zap,
    title: "Gadgets Numériques",
    description: "Calculateurs, QR codes, formulaires intelligents et outils digitaux sur-mesure.",
    features: ["Calculateurs", "QR codes dynamiques", "Formulaires avancés", "Cartes digitales"],
    link: "/services/gadgets-numeriques",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Globe,
    title: "Sites Internet Pro",
    description: "Sites vitrines et landing pages professionnels, modernes et optimisés SEO.",
    features: ["Design sur-mesure", "Responsive", "SEO optimisé", "Performance"],
    link: "/services/developpement-web",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne complètes avec paiement Mobile Money et gestion des stocks.",
    features: ["Mobile Money intégré", "Gestion stocks", "Multi-devises", "Livraison"],
    link: "/services/ecommerce",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Code,
    title: "Applications Web",
    description: "Plateformes web complexes, SaaS, dashboards et outils métiers sur-mesure.",
    features: ["React / Next.js", "Backend robuste", "API & intégrations", "Scalabilité"],
    link: "/services/applications-mobiles",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: Bot,
    title: "Automatisation & IA",
    description: "Optimisez vos processus avec l'intelligence artificielle et l'automatisation.",
    features: ["Chatbots IA", "Workflows automatisés", "Intégrations", "Agents IA"],
    link: "/services/automatisation-ia",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: FileSearch,
    title: "Audit Digital & Stratégie",
    description: "Analyse complète de votre présence en ligne avec recommandations actionnables.",
    features: ["Audit complet", "Recommandations", "Plan d'action", "Accompagnement"],
    link: "/services/audit-digital",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Search,
    title: "SEO & Visibilité",
    description: "Atteignez la première page de Google et générez du trafic qualifié gratuit.",
    features: ["Audit technique", "Optimisation on-page", "Netlinking", "SEO local"],
    link: "/services/seo",
    color: "from-teal-500/20 to-cyan-500/20",
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
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Nos 11 Services
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Expertise complète pour{" "}
                <span className="text-primary">votre succès digital</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                De la stratégie à l'exécution, nous couvrons tous les aspects de votre transformation digitale 
                avec des tarifs adaptés au marché africain.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Démarrer un projet
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/audit-gratuit">Audit gratuit</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <Link to={service.link} className="block h-full">
                    <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                      
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <service.icon size={24} />
                      </div>
                      
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <Check size={14} className="text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                        En savoir plus
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Besoin d'un service sur-mesure ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nous créons des solutions personnalisées adaptées à vos besoins spécifiques. 
                Discutons de votre projet !
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Démarrer mon projet
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/2250706693038" target="_blank" rel="noopener noreferrer">
                    Discuter sur WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
