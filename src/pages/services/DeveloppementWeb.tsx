import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Code, 
  Zap, 
  Shield, 
  Smartphone, 
  Search, 
  ArrowRight, 
  Check, 
  Star,
  Layers,
  Database,
  Cpu
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { ServicePricingSection } from "@/components/services/ServicePricingSection";

const services = [
  {
    icon: Globe,
    title: "Sites Vitrines",
    description: "Sites web professionnels et modernes pour présenter votre activité avec élégance.",
    features: ["Design sur-mesure", "Responsive design", "Optimisation SEO", "Formulaires de contact"],
  },
  {
    icon: Code,
    title: "Applications Web",
    description: "Solutions digitales complexes : SaaS, plateformes, dashboards et outils métiers.",
    features: ["React / Next.js", "Backend robuste", "API & intégrations", "Scalabilité"],
  },
  {
    icon: Layers,
    title: "Landing Pages",
    description: "Pages d'atterrissage optimisées pour la conversion et vos campagnes marketing.",
    features: ["Optimisation conversion", "A/B testing", "Temps de chargement rapide", "Analytics intégrés"],
  },
  {
    icon: Database,
    title: "Portails & Intranets",
    description: "Espaces membres, portails clients et intranets pour votre organisation.",
    features: ["Authentification sécurisée", "Gestion des droits", "Interface intuitive", "Collaboration"],
  },
];

const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion"
];

const benefits = [
  { title: "Performance optimale", description: "Sites ultra-rapides avec des scores Lighthouse > 90" },
  { title: "SEO intégré", description: "Architecture pensée pour le référencement naturel" },
  { title: "Sécurité renforcée", description: "Protocoles de sécurité modernes et mises à jour régulières" },
  { title: "Maintenance incluse", description: "Support technique et évolutions post-lancement" },
];

const pricing = [
  {
    name: "Site Vitrine",
    price: "150 000",
    period: " FCFA",
    description: "Présence en ligne professionnelle",
    features: [
      "Design responsive sur-mesure",
      "5 pages maximum",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Hébergement 1 an inclus",
      "Support 30 jours",
    ],
    popular: false,
  },
  {
    name: "Site Pro",
    price: "350 000",
    period: " FCFA",
    description: "Solution complète pour PME",
    features: [
      "Design premium personnalisé",
      "10 pages maximum",
      "Blog intégré",
      "SEO avancé",
      "Intégrations (CRM, emails)",
      "Analytics avancés",
      "Hébergement 1 an inclus",
      "Support 60 jours",
    ],
    popular: true,
  },
  {
    name: "Application Web",
    price: "À partir de 500 000",
    period: " FCFA",
    description: "Plateforme sur-mesure",
    features: [
      "Architecture personnalisée",
      "Fonctionnalités avancées",
      "Base de données",
      "Authentification utilisateurs",
      "API & intégrations",
      "Dashboard admin",
      "Documentation technique",
      "Support prioritaire 90 jours",
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DeveloppementWeb = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Premium */}
        <section className="pt-32 pb-24 relative overflow-hidden">
          {/* Background premium */}
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
          
          {/* Animated orbs */}
          <motion.div 
            className="absolute top-1/4 left-[5%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl -z-10"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.span 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Globe size={16} />
                  Développement Web Premium
                </motion.span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1]">
                  Sites web{" "}
                  <span className="gradient-text">performants</span>{" "}
                  qui convertissent
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Nous créons des expériences web modernes, ultra-rapides et optimisées pour le SEO. 
                  Du site vitrine à l'application complexe, nous donnons vie à vos ambitions digitales.
                </p>
                
                {/* Trust points */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {["Score Lighthouse 95+", "SEO optimisé", "Support dédié"].map((point, i) => (
                    <motion.div 
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" className="shadow-premium" asChild>
                    <Link to="/demarrer-projet">
                      Démarrer mon projet
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="backdrop-blur-sm" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 rounded-3xl blur-3xl" />
                  
                  {/* Video in browser frame */}
                  <div className="relative bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col shadow-premium">
                    {/* Browser bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <div className="flex-1 h-6 rounded-full bg-muted/50 mx-4" />
                    </div>
                    
                    {/* Video */}
                    <div className="flex-1 relative">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src="/videos/fullstack-demo.mp4" type="video/mp4" />
                      </video>
                    </div>
                    
                    {/* Floating badges */}
                    <motion.div 
                      className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-medium"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      100% Responsive
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Ultra rapide
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos solutions web
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des solutions adaptées à chaque besoin, de la startup au grand groupe.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technologies */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Technologies modernes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous utilisons les technologies les plus performantes du marché.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-3 rounded-full bg-card border border-border font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Pourquoi nous choisir ?
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <ServicePricingSection 
          service="developpement-web"
          plans={pricing.map((plan, i) => ({
            ...plan,
            planId: i === 0 ? "starter" : i === 1 ? "pro" : "premium"
          }))}
        />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default DeveloppementWeb;
