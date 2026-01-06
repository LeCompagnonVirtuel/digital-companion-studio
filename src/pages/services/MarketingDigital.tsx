import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Mail, 
  Search, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Star,
  PenTool,
  Users,
  Zap
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: Target,
    title: "Génération de Leads",
    description: "Stratégies d'acquisition de prospects qualifiés via tous les canaux digitaux.",
    features: ["Lead magnets", "Landing pages", "Publicités ciblées", "Qualification automatique"],
  },
  {
    icon: Search,
    title: "SEO & Visibilité",
    description: "Optimisation pour les moteurs de recherche et stratégies de visibilité long terme.",
    features: ["Audit technique", "Optimisation on-page", "Netlinking", "Suivi positions"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Campagnes email performantes, séquences automatisées et newsletters engageantes.",
    features: ["Séquences nurturing", "Newsletters", "A/B testing", "Segmentation"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textes persuasifs qui convertissent : pages de vente, emails, publicités.",
    features: ["Pages de vente", "Scripts vidéo", "Publicités", "Storytelling"],
  },
  {
    icon: BarChart3,
    title: "Publicité Digitale",
    description: "Campagnes publicitaires optimisées sur Google, Meta, LinkedIn et TikTok.",
    features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Retargeting"],
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation et croissance de vos communautés sur toutes les plateformes.",
    features: ["Calendrier éditorial", "Création contenu", "Engagement", "Modération"],
  },
];

const results = [
  { value: "+340%", label: "Trafic organique moyen" },
  { value: "x3", label: "Taux de conversion" },
  { value: "-45%", label: "Coût par lead" },
  { value: "+200%", label: "ROI moyen" },
];

const process = [
  { step: "01", title: "Audit", description: "Analyse complète de votre présence digitale" },
  { step: "02", title: "Stratégie", description: "Plan d'action personnalisé et objectifs SMART" },
  { step: "03", title: "Exécution", description: "Mise en œuvre des actions marketing" },
  { step: "04", title: "Optimisation", description: "Analyse des résultats et amélioration continue" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MarketingDigital = () => {
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
          
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Megaphone size={16} />
                  Marketing Digital
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Accélérez votre{" "}
                  <span className="gradient-text">croissance</span>{" "}
                  digitale
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Stratégies marketing sur-mesure pour attirer, convertir et fidéliser vos clients idéaux. 
                  Du SEO aux publicités, nous maximisons votre ROI.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Booster ma visibilité
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex flex-col items-center justify-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp size={48} className="text-primary" />
                    </div>
                    <motion.div 
                      className="w-full h-24 relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg viewBox="0 0 200 60" className="w-full h-full">
                        <motion.path
                          d="M 0 50 Q 50 40 100 25 T 200 10"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {results.map((result, i) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">{result.value}</div>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos expertises marketing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une approche 360° pour maximiser votre présence en ligne.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
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
                        <Check size={14} className="text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Notre méthodologie
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une approche structurée pour des résultats mesurables.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl bg-card border border-border"
                >
                  <span className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2 relative">{item.title}</h3>
                  <p className="text-sm text-muted-foreground relative">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default MarketingDigital;
