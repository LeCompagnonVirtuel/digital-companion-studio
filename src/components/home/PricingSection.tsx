import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Star, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Lancement",
    tagline: "Exister et être crédible",
    price: "150 000",
    currency: "FCFA",
    description: "Idéal pour lancer votre présence digitale avec les bases essentielles.",
    features: [
      "Site vitrine 3-4 pages",
      "Design professionnel",
      "Formulaire de contact",
      "SEO de base",
      "Hébergement 1 an inclus",
      "Responsive mobile",
    ],
    popular: false,
    href: "/contact?pack=lancement",
    icon: Zap,
  },
  {
    name: "Standard",
    tagline: "Attirer et convertir",
    price: "350 000",
    currency: "FCFA",
    description: "Pour les entreprises prêtes à accélérer leur acquisition de clients.",
    features: [
      "Site 5-7 pages",
      "Tout du pack Lancement",
      "SEO local avancé",
      "Blog intégré",
      "Google Analytics",
      "Stratégie marketing de base",
      "4 contenus/mois",
    ],
    popular: true,
    href: "/contact?pack=standard",
    icon: Star,
  },
  {
    name: "Premium",
    tagline: "Performer et automatiser",
    price: "600 000",
    currency: "FCFA",
    description: "Automatisation avancée et IA pour maximiser votre ROI.",
    features: [
      "Site 7-10 pages",
      "Tout du pack Standard",
      "E-commerce ou réservation",
      "Chatbot IA intégré",
      "Automatisations",
      "3 mois maintenance",
      "Formation incluse",
    ],
    popular: false,
    href: "/contact?pack=premium",
    icon: Sparkles,
  },
  {
    name: "Business",
    tagline: "Dominer son marché",
    price: "900 000",
    currency: "FCFA",
    description: "Solution complète pour dominer votre secteur digital.",
    features: [
      "Site 10-15 pages",
      "Tout du pack Premium",
      "SEO avancé complet",
      "Dashboard admin",
      "CRM intégré",
      "6 mois maintenance",
    ],
    popular: false,
    href: "/contact?pack=business",
    icon: Shield,
  },
  {
    name: "VIP",
    tagline: "L'excellence digitale totale",
    price: "1 200 000",
    currency: "FCFA",
    description: "Accompagnement premium 360° avec stratégie personnalisée.",
    features: [
      "Site 15-20 pages",
      "Tout du pack Business",
      "E-commerce avancé",
      "Email marketing",
      "12 mois maintenance",
      "Account manager VIP",
    ],
    popular: false,
    href: "/contact?pack=vip",
    icon: Crown,
  },
];

export function PricingSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-mesh" />
      
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="badge-premium mb-6">
            Nos Packs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Des solutions adaptées{" "}
            <span className="gradient-text">à vos ambitions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le pack qui correspond à votre étape de croissance. Tous nos packs sont personnalisables.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              <div className={`h-full rounded-3xl p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-foreground text-background shadow-premium"
                  : "bg-card border border-border/50 hover:border-primary/20 hover:shadow-elevated"
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold shadow-lg">
                      <Star size={14} fill="currentColor" />
                      Recommandé
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-background/10" : "bg-primary/10"
                  }`}>
                    <plan.icon size={24} className={plan.popular ? "text-background" : "text-primary"} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? "text-background/60" : "text-muted-foreground"}`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">{plan.price}</span>
                    <span className={`text-sm font-medium ${plan.popular ? "text-background/80" : "text-foreground"}`}>
                      FCFA
                    </span>
                  </div>
                  <p className={`text-sm mt-3 ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-accent/20" : "bg-accent/10"
                      }`}>
                        <Check size={12} className={plan.popular ? "text-accent" : "text-accent"} />
                      </div>
                      <span className={`text-sm ${plan.popular ? "text-background/80" : "text-foreground/80"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.popular ? "gold" : "heroOutline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to={`/pack-pro#packs`} className="group">
                    Choisir ce pack
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Pack CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Besoin d'une solution sur-mesure ?
          </p>
          <Button variant="heroGhost" size="lg" asChild>
            <Link to="/devis-personnalise" className="group">
              <Sparkles size={18} className="mr-2" />
              Demander un devis personnalisé
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}