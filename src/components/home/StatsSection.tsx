import { motion, useInView } from "framer-motion";
import { Award, Users, Rocket, Clock, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    icon: Rocket,
    value: 150,
    suffix: "+",
    label: "Projets livrés",
    description: "avec succès",
  },
  {
    icon: Users,
    value: 80,
    suffix: "+",
    label: "Clients satisfaits",
    description: "nous font confiance",
  },
  {
    icon: TrendingUp,
    value: 200,
    suffix: "%",
    label: "ROI moyen",
    description: "de nos clients",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "h",
    label: "Temps de réponse",
    description: "garanti",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const steps = 80;
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
    <span ref={ref} className="font-display font-bold text-4xl sm:text-5xl gradient-text tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-muted/30 to-background" />
      
      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5 group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-500"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <stat.icon size={28} className="text-primary" />
              </motion.div>
              <div className="mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}