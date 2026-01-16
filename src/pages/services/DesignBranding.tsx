import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Fingerprint, 
  Layers, 
  PenTool, 
  Image, 
  Eye, 
  ArrowRight, 
  Check, 
  Star,
  Sparkles,
  Monitor,
  Smartphone
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: Fingerprint,
    title: "Branding & Identité",
    description: "Création d'identités visuelles uniques qui reflètent vos valeurs et marquent les esprits.",
    features: ["Logo & variantes", "Charte graphique", "Typographies", "Palette couleurs"],
  },
  {
    icon: Layers,
    title: "Design UI/UX",
    description: "Interfaces utilisateur intuitives et expériences digitales centrées sur l'utilisateur.",
    features: ["Wireframes", "Prototypes interactifs", "User testing", "Design system"],
  },
  {
    icon: Image,
    title: "Design Graphique",
    description: "Visuels percutants pour tous vos supports : print, digital, réseaux sociaux.",
    features: ["Réseaux sociaux", "Supports print", "Présentations", "Infographies"],
  },
  {
    icon: PenTool,
    title: "Illustrations",
    description: "Illustrations sur-mesure pour donner une personnalité unique à votre marque.",
    features: ["Illustrations vectorielles", "Icônes personnalisées", "Mascotte", "Animations"],
  },
];

const portfolio = [
  { title: "Refonte identité visuelle", category: "Branding", color: "from-primary/20 to-accent/20" },
  { title: "Application mobile fintech", category: "UI/UX", color: "from-accent/20 to-primary/20" },
  { title: "Campagne réseaux sociaux", category: "Design", color: "from-gold/20 to-primary/20" },
  { title: "Site e-commerce premium", category: "Web Design", color: "from-primary/20 to-gold/20" },
];

const principles = [
  { icon: Eye, title: "Clarté", description: "Des designs lisibles et compréhensibles instantanément" },
  { icon: Sparkles, title: "Créativité", description: "Des concepts originaux qui vous démarquent" },
  { icon: Monitor, title: "Cohérence", description: "Une identité uniforme sur tous les supports" },
  { icon: Smartphone, title: "Adaptabilité", description: "Des designs qui fonctionnent partout" },
];

const pricing = [
  {
    name: "Logo",
    price: "75 000",
    period: " FCFA",
    description: "L'essentiel pour démarrer",
    features: [
      "3 propositions de logo",
      "2 révisions incluses",
      "Fichiers HD (PNG, JPG, SVG)",
      "Guide d'utilisation basique",
      "Livraison 5-7 jours",
    ],
    popular: false,
  },
  {
    name: "Identité Complète",
    price: "200 000",
    period: " FCFA",
    description: "Identité visuelle professionnelle",
    features: [
      "Logo + variantes",
      "Palette de couleurs",
      "Typographies",
      "Éléments graphiques",
      "Charte graphique PDF",
      "Templates réseaux sociaux",
      "Révisions illimitées",
      "Livraison 10-14 jours",
    ],
    popular: true,
  },
  {
    name: "Brand Book",
    price: "350 000",
    period: " FCFA",
    description: "Stratégie de marque complète",
    features: [
      "Tout du pack Identité",
      "Audit de marque",
      "Positionnement stratégique",
      "Ton de voix & messaging",
      "Brand book complet (30+ pages)",
      "Kit de communication",
      "Accompagnement 1 mois",
      "Livraison 3-4 semaines",
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

const DesignBranding = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gold/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/3 left-[15%] w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl -z-10"
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
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                  <Palette size={16} />
                  Design & Branding
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Des designs qui{" "}
                  <span className="gradient-text">convertissent</span>{" "}
                  et inspirent
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Créez une identité visuelle mémorable et des interfaces qui enchantent vos utilisateurs. 
                  Du branding au design UI/UX, nous donnons forme à vos idées.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Créer mon identité
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/portfolio">Voir le portfolio</Link>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-primary/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[
                        { color: "bg-primary", size: "col-span-2 h-20" },
                        { color: "bg-accent", size: "h-16" },
                        { color: "bg-gold", size: "h-16" },
                        { color: "bg-muted", size: "col-span-2 h-12" },
                      ].map((block, i) => (
                        <motion.div
                          key={i}
                          className={`${block.color} ${block.size} rounded-xl`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                      ))}
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
                Nos expertises design
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Du concept à la réalisation, nous créons des designs qui font la différence.
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
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-gold/30 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-gold-foreground transition-all duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos principes de design
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des valeurs qui guident chacune de nos créations.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, i) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                    <principle.icon size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos réalisations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez quelques-uns de nos projets design.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {portfolio.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                  <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-all duration-300" />
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-xs font-medium text-primary mb-2">{project.category}</span>
                    <h3 className="font-display font-semibold text-lg">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">
                  Voir tout le portfolio
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos tarifs design
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des formules adaptées à vos besoins et votre budget.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-6 rounded-2xl bg-card border ${
                    plan.popular ? "border-gold shadow-lg" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-medium">
                      Populaire
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-gold shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full" 
                    asChild
                  >
                    <Link to={`/demarrer-projet?service=design-branding&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>
                      Choisir ce plan
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
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

export default DesignBranding;
