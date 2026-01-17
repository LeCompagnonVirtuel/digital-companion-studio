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
    <section className="py-16 bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Pourquoi Nous Faire Confiance ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à vous offrir la meilleure expérience d'achat possible
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
