import { motion, useInView, AnimatePresence } from "framer-motion";
import { Rocket, Users, TrendingUp, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { TiltCard } from "@/components/animations/TiltCard";

const panoramaSlides = [
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    gradient: "from-primary/20 via-primary/10 to-accent/15",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-accent/20 via-primary/15 to-primary/10",
  },
  {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-primary/15 via-accent/20 to-primary/10",
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
    <span ref={ref} className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl gradient-text tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const stats = [
    {
      icon: Rocket,
      value: 150,
      suffix: "+",
      labelKey: 'stats.projects',
      descKey: 'stats.projects_desc',
    },
    {
      icon: Users,
      value: 80,
      suffix: "+",
      labelKey: 'stats.clients',
      descKey: 'stats.clients_desc',
    },
    {
      icon: TrendingUp,
      value: 200,
      suffix: "%",
      labelKey: 'stats.roi',
      descKey: 'stats.roi_desc',
    },
    {
      icon: Clock,
      value: 24,
      suffix: "h",
      labelKey: 'stats.response',
      descKey: 'stats.response_desc',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % panoramaSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated Panorama Slides */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          {panoramaSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image with Ken Burns effect */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-background/85" />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-60`} />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
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
          className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.1)" }}
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full blur-3xl"
          style={{ background: "hsl(var(--accent) / 0.08)" }}
        />
      </div>
      
      {/* Decorative Lines - hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent hidden lg:block" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {panoramaSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary w-6 sm:w-8" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="container-wide relative py-12 sm:py-16 md:py-24 lg:py-32">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="badge-premium mb-3 sm:mb-4 text-xs sm:text-sm">{t('stats.badge')}</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold px-4">
            {t('stats.title')} <span className="gradient-text">{t('stats.title_highlight')}</span>
          </h2>
        </motion.div>

        {/* Stats Grid - Improved responsive layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard tiltAmount={8} className="h-full">
                <div className="text-center group p-3 sm:p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-500 h-full">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:border-primary/40 group-hover:shadow-glow transition-all duration-500"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                  </motion.div>
                  <div className="mb-1 sm:mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-medium text-foreground text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">{t(stat.labelKey)}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">{t(stat.descKey)}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
