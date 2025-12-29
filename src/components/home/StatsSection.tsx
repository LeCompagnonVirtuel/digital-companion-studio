import { motion } from "framer-motion";
import { Award, Users, Rocket, Clock } from "lucide-react";

const stats = [
  {
    icon: Rocket,
    value: "150+",
    label: "Projets livrés",
  },
  {
    icon: Users,
    value: "80+",
    label: "Clients satisfaits",
  },
  {
    icon: Award,
    value: "100%",
    label: "Taux de satisfaction",
  },
  {
    icon: Clock,
    value: "24h",
    label: "Réponse garantie",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon size={28} className="text-primary" />
              </div>
              <div className="font-display font-bold text-3xl sm:text-4xl mb-1 gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
