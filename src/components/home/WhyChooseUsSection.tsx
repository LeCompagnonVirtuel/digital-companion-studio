import { motion } from "framer-motion";
import { MapPin, Headphones, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Expertise Locale",
    description: "Basés en Côte d'Ivoire, nous comprenons les réalités du marché africain et créons des solutions adaptées à votre contexte.",
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

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
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
      </div>
    </section>
  );
};
