import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Zap, 
  Crown,
  Rocket,
  Shield,
  Clock,
  Users,
  Headphones,
  BarChart3,
  Code,
  Palette,
  Megaphone,
  Bot
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const proFeatures = [
  {
    icon: Code,
    title: "Développement Sur-Mesure",
    description: "Solutions techniques adaptées à vos besoins spécifiques"
  },
  {
    icon: Palette,
    title: "Design Premium",
    description: "Identité visuelle unique et professionnelle"
  },
  {
    icon: Megaphone,
    title: "Marketing Avancé",
    description: "Stratégies multicanal pour maximiser votre ROI"
  },
  {
    icon: Bot,
    title: "Automatisation IA",
    description: "Intégration d'outils intelligents pour optimiser vos process"
  },
  {
    icon: Shield,
    title: "Sécurité Renforcée",
    description: "Protection avancée de vos données et systèmes"
  },
  {
    icon: Headphones,
    title: "Support Prioritaire",
    description: "Assistance dédiée avec temps de réponse garanti"
  }
];

const packs = [
  {
    name: "Starter",
    tagline: "Exister et être crédible",
    price: "150 000",
    icon: Zap,
    popular: false,
    features: [
      "Site vitrine responsive (5 pages)",
      "Design moderne personnalisé",
      "Optimisation SEO de base",
      "Formulaire de contact",
      "Hébergement 1 an inclus",
      "Support par email"
    ]
  },
  {
    name: "Croissance",
    tagline: "Attirer et convertir",
    price: "350 000",
    icon: Star,
    popular: true,
    features: [
      "Tout du pack Starter",
      "Stratégie marketing digital",
      "Création de contenu (4/mois)",
      "Gestion réseaux sociaux",
      "Landing pages optimisées",
      "Analytics & reporting mensuel",
      "Support prioritaire"
    ]
  },
  {
    name: "Scale",
    tagline: "Performer et automatiser",
    price: "750 000",
    icon: Crown,
    popular: false,
    features: [
      "Tout du pack Croissance",
      "Automatisation marketing IA",
      "Chatbot intelligent 24/7",
      "Intégrations CRM/outils",
      "Funnels de conversion avancés",
      "A/B testing continu",
      "Account manager dédié",
      "Audit trimestriel complet"
    ]
  }
];

const benefits = [
  {
    icon: Rocket,
    title: "Lancement rapide",
    description: "Votre projet livré en 2-4 semaines selon la complexité"
  },
  {
    icon: Clock,
    title: "Accompagnement continu",
    description: "Support et maintenance inclus pendant 1 an"
  },
  {
    icon: Users,
    title: "Équipe dédiée",
    description: "Des experts à votre écoute du début à la fin"
  },
  {
    icon: BarChart3,
    title: "Résultats mesurables",
    description: "Reporting mensuel avec KPIs clairs"
  }
];

const PackPro = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 bg-mesh" />
          
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="badge-premium mb-6">
                <Crown size={14} className="mr-1" />
                Offres Professionnelles
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                Des solutions <span className="gradient-text">sur-mesure</span> pour votre croissance
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Choisissez le pack qui correspond à votre ambition. Tous nos packs sont personnalisables selon vos besoins spécifiques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/devis-personnalise" className="group">
                    <Sparkles size={18} className="mr-2" />
                    Demander un devis personnalisé
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="#packs">
                    Voir les packs
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packs */}
        <section id="packs" className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos <span className="gradient-text">packs</span> professionnels
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Chaque pack est conçu pour répondre à une étape précise de votre croissance digitale.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {packs.map((pack, index) => (
                <motion.div
                  key={pack.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${pack.popular ? "md:-mt-4 md:mb-4" : ""}`}
                >
                  <div className={`h-full rounded-3xl p-8 transition-all duration-500 ${
                    pack.popular
                      ? "bg-foreground text-background shadow-premium"
                      : "bg-card border border-border hover:border-primary/20 hover:shadow-elevated"
                  }`}>
                    {pack.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold shadow-lg">
                          <Star size={14} fill="currentColor" />
                          Recommandé
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                        pack.popular ? "bg-background/10" : "bg-primary/10"
                      }`}>
                        <pack.icon size={28} className={pack.popular ? "text-background" : "text-primary"} />
                      </div>
                      <h3 className="font-display font-bold text-2xl">{pack.name}</h3>
                      <p className={`text-sm ${pack.popular ? "text-background/60" : "text-muted-foreground"}`}>
                        {pack.tagline}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-bold">{pack.price}</span>
                        <span className={`text-sm font-medium ${pack.popular ? "text-background/80" : ""}`}>FCFA</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pack.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            pack.popular ? "bg-accent/20" : "bg-accent/10"
                          }`}>
                            <Check size={12} className="text-accent" />
                          </div>
                          <span className={`text-sm ${pack.popular ? "text-background/80" : "text-foreground/80"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={pack.popular ? "gold" : "heroOutline"}
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <Link to={`/demarrer-projet?service=pack-${pack.name.toLowerCase()}&plan=${pack.name.toLowerCase()}`}>
                        Choisir ce pack
                        <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ce que vous <span className="gradient-text">obtenez</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Des services complets pour construire et développer votre présence digitale.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {proFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-elevated transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Quote CTA */}
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                Besoin d'une solution sur-mesure ?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Nos packs ne correspondent pas exactement à vos besoins ? Demandez un devis personnalisé et nous construirons ensemble la solution idéale.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/devis-personnalise" className="group">
                  <Sparkles size={18} className="mr-2" />
                  Demander un devis personnalisé
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default PackPro;
