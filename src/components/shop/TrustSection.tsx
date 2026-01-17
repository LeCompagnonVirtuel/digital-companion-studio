import { motion } from "framer-motion";
import { Shield, Zap, HeadphonesIcon, RefreshCcw, CreditCard, Lock } from "lucide-react";

const trustFeatures = [
  {
    icon: Zap,
    title: "Accès Instantané",
    description: "Téléchargez vos produits immédiatement après l'achat",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Vos transactions sont 100% sécurisées et cryptées",
  },
  {
    icon: RefreshCcw,
    title: "Garantie 30 Jours",
    description: "Satisfait ou remboursé, sans condition",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Réactif",
    description: "Une équipe dédiée pour vous accompagner",
  },
  {
    icon: CreditCard,
    title: "Paiement Flexible",
    description: "Plusieurs options de paiement disponibles",
  },
  {
    icon: Lock,
    title: "Données Protégées",
    description: "Vos informations personnelles sont sécurisées",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-10 sm:py-16 bg-muted/30">
      <div className="container-wide px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 sm:mb-4">
            Pourquoi Nous Faire Confiance ?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à vous offrir la meilleure expérience d'achat possible
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="text-center p-3 sm:p-4"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{feature.title}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed hidden sm:block">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
