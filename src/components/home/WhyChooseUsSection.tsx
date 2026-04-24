import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Headphones, TrendingUp, Zap, Brain, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: MapPin,
    title: "Expertise Locale",
    description: "Basés en Côte d'Ivoire, nous comprenons les réalités du marché africain et créons des solutions adaptées à votre contexte.",
  },
  {
    icon: Zap,
    title: "Livraison Rapide",
    description: "Sites web livrés en 5 à 15 jours. Pas de délais interminables — votre business n'attend pas.",
  },
  {
    icon: Headphones,
    title: "Support Réactif",
    description: "Une équipe disponible pour vous accompagner à chaque étape, avec un temps de réponse moyen inférieur à 2 heures.",
  },
  {
    icon: TrendingUp,
    title: "ROI Garanti",
    description: "Nos solutions sont orientées résultats. Nous mesurons et optimisons en continu pour maximiser votre retour sur investissement.",
  },
  {
    icon: Brain,
    title: "IA Intégrée",
    description: "Chatbots, automatisations et outils IA intégrés dans chaque solution pour vous donner un avantage compétitif.",
  },
  {
    icon: Shield,
    title: "Accompagnement Total",
    description: "Du diagnostic initial à la maintenance post-lancement, nous restons à vos côtés. Formation et transfert de compétences inclus.",
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
              className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 text-center"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <reason.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
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
