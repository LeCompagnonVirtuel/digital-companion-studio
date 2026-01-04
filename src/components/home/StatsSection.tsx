import { motion, useInView } from "framer-motion";
import { Rocket, Users, TrendingUp, Clock } from "lucide-react";
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
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Panorama Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                hsl(var(--background)) 0%, 
                hsl(var(--primary) / 0.03) 10%,
                hsl(var(--primary) / 0.08) 50%,
                hsl(var(--primary) / 0.03) 90%,
                hsl(var(--background)) 100%
              )
            `
          }}
        />
        {/* Mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, hsl(var(--accent) / 0.12), transparent),
              radial-gradient(ellipse 100% 80% at 50% 100%, hsl(var(--primary) / 0.08), transparent)
            `
          }}
        />
        {/* Animated floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.1)" }}
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "hsl(var(--accent) / 0.08)" }}
        />
      </div>
      
      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent hidden lg:block" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      </div>
      
      <div className="container-wide relative py-20 sm:py-28 md:py-36 lg:py-44">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="badge-premium mb-4">Nos résultats</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Des chiffres qui <span className="gradient-text">parlent</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-12">
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
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-500"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </motion.div>
              <div className="mb-2 sm:mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-medium text-foreground text-sm sm:text-base md:text-lg mb-1">{stat.label}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}