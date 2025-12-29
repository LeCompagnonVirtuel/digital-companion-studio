import { motion, useInView } from "framer-motion";
import { Award, Users, Rocket, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    icon: Rocket,
    value: 150,
    suffix: "+",
    label: "Projets livrés",
  },
  {
    icon: Users,
    value: 80,
    suffix: "+",
    label: "Clients satisfaits",
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    label: "Taux de satisfaction",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "h",
    label: "Réponse garantie",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl gradient-text tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container-wide relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </motion.div>
              <div className="mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
