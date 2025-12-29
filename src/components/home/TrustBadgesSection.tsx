import { motion } from "framer-motion";
import { Shield, Award, Clock, Headphones, CheckCircle, Zap } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Garantie Satisfaction",
    description: "100% satisfait ou remboursé",
  },
  {
    icon: Clock,
    title: "Livraison Rapide",
    description: "Respect des délais garantis",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Toujours à vos côtés",
  },
  {
    icon: Award,
    title: "Expertise Certifiée",
    description: "Partenaires officiels",
  },
  {
    icon: CheckCircle,
    title: "Qualité Premium",
    description: "Standards internationaux",
  },
  {
    icon: Zap,
    title: "Technologies Modernes",
    description: "Dernières innovations",
  },
];

export function TrustBadgesSection() {
  return (
    <section className="py-12 border-y border-border bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-12"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <badge.icon size={20} />
              </div>
              <div>
                <div className="font-medium text-sm">{badge.title}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
