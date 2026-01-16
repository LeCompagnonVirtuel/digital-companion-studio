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
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl -z-10"
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
                  <Globe size={16} />
                  Développement Web
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Sites web{" "}
                  <span className="gradient-text">performants</span>{" "}
                  qui convertissent
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Nous créons des expériences web modernes, rapides et optimisées pour le SEO. 
                  Du site vitrine à l'application complexe, nous donnons vie à vos projets.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Démarrer mon projet
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
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Globe size={48} className="text-primary" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded-full w-3/4 mx-auto" />
                        <div className="h-3 bg-muted rounded-full w-1/2 mx-auto" />
                        <div className="h-3 bg-muted rounded-full w-2/3 mx-auto" />
                      </div>
                    </div>
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
                  <ul className="grid grid-cols-2 gap-3">
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
