import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Headphones, TrendingUp, Zap, Brain, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/animations/TiltCard";

const reasons = [
  {
    icon: MapPin,
    title: "Expertise Locale",
    description: "Basés en Côte d'Ivoire, nous comprenons les réalités du marché africain et créons des solutions adaptées.",
    stat: "Abidjan, CI",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Livraison Rapide",
    description: "Sites web livrés en 5 à 15 jours. Votre business n'attend pas.",
    stat: "5-15 jours",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Headphones,
    title: "Support Réactif",
    description: "Temps de réponse moyen inférieur à 2 heures. On vous accompagne à chaque étape.",
    stat: "< 2h réponse",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "ROI Mesurable",
    description: "Solutions orientées résultats. Mesure et optimisation en continu pour maximiser votre investissement.",
    stat: "+200% ROI",
    color: "from-primary to-accent",
  },
  {
    icon: Brain,
    title: "IA Intégrée",
    description: "Chatbots, automatisations et outils IA intégrés pour un avantage compétitif unique.",
    stat: "24/7 actif",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Accompagnement Total",
    description: "Du diagnostic initial à la maintenance post-lancement. Formation et transfert de compétences inclus.",
    stat: "A à Z",
    color: "from-rose-500 to-pink-500",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pourquoi nous ?
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Ce qui nous <span className="gradient-text">différencie</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plus qu'une agence, un véritable partenaire de croissance pour votre entreprise.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard tiltAmount={7} className="h-full">
                <div className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 text-center h-full">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <reason.icon size={28} />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">{reason.title}</h3>
                    <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">{reason.stat}</span>
                    <p className="text-muted-foreground leading-relaxed text-sm">{reason.description}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Pas sûr de ce dont vous avez besoin ?</p>
          <Button variant="heroGhost" size="lg" asChild>
            <Link to="/diagnostic-gratuit" className="group">
              Faire un diagnostic gratuit en 2 minutes
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
