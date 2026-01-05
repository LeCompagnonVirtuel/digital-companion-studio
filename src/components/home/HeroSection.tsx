import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, TrendingUp, Play, CheckCircle, Star, Code, Palette, Megaphone, Bot, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

// Slides showcasing different services/domains
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    icon: Globe,
    badge: "Développement Web",
    headline: "Votre partenaire digital",
    highlight: "intelligent",
    description: "Nous concevons, automatisons et faisons croître des écosystèmes digitaux performants pour les entreprises ambitieuses.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
    icon: Bot,
    badge: "Automatisation & IA",
    headline: "Automatisez vos",
    highlight: "processus",
    description: "Intégrez l'intelligence artificielle et l'automatisation pour optimiser vos opérations et gagner en productivité.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    icon: Megaphone,
    badge: "Marketing Digital",
    headline: "Accélérez votre",
    highlight: "croissance",
    description: "Stratégies de marketing digital sur-mesure pour attirer, convertir et fidéliser vos clients idéaux.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2064&auto=format&fit=crop",
    icon: Palette,
    badge: "Design & UX",
    headline: "Des interfaces qui",
    highlight: "convertissent",
    description: "Design moderne et expérience utilisateur optimisée pour maximiser l'engagement et les conversions.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    icon: Smartphone,
    badge: "Applications Mobiles",
    headline: "Applications mobiles",
    highlight: "performantes",
    description: "Développement d'applications iOS et Android natives ou hybrides pour toucher vos utilisateurs où qu'ils soient.",
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Enhanced parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 0.95]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Panorama Background with Parallax */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: backgroundY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Ken Burns effect on background */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${currentSlideData.image}')`,
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dynamic overlay based on scroll */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Colored gradient overlay that changes with slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`gradient-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
          />
        </AnimatePresence>
      </motion.div>
      
      {/* Premium Animated Background with Enhanced Parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: contentY }}>
        {/* Animated Orbs with depth */}
        <motion.div 
          className="absolute top-1/4 left-[15%] w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(234 89% 54% / 0.15) 0%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-[15%] w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(174 77% 40% / 0.15) 0%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(234 89% 54% / 0.08) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle Grid with parallax */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Floating Elements with enhanced animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content with Parallax */}
      <motion.div className="container-wide py-16 sm:py-20 pt-24 sm:pt-28" style={{ opacity, scale }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Badge - Animated with slide change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-5 sm:mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <currentSlideData.icon size={16} className="text-primary" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-foreground/80">{currentSlideData.badge}</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Disponible
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Headline - Animated with slide change */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] mb-5 sm:mb-6 tracking-tight px-4"
            >
              <span className="block">{currentSlideData.headline}</span>
              <span className="gradient-text mt-1 sm:mt-2 block">{currentSlideData.highlight}</span>
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle - Animated with slide change */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
            >
              {currentSlideData.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/demarrer-projet" className="group">
                Démarrer mon projet
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/audit-gratuit" className="group">
                <Play size={16} className="mr-1" />
                Audit gratuit
              </Link>
            </Button>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2"
          >
            {["Sans engagement", "Devis sous 24h", "Accompagnement personnalisé"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <CheckCircle size={14} className="sm:w-4 sm:h-4 text-accent shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto px-2"
          >
            {[
              { icon: Zap, value: "24h", label: "Réponse garantie", color: "text-primary" },
              { icon: TrendingUp, value: "150+", label: "Projets livrés", color: "text-accent" },
              { icon: Star, value: "100%", label: "Clients satisfaits", color: "text-gold" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-2 sm:p-3 md:p-4 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-card transition-all duration-300"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5 sm:mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={14} className={`sm:w-4 sm:h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
                <div className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-0.5">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "bg-primary w-8" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
            }`}
            aria-label={`Slide ${index + 1}: ${slide.badge}`}
          />
        ))}
      </div>

      {/* Service Icons Carousel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4"
      >
        {heroSlides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <motion.button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`p-2 sm:p-2.5 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-primary/20 border-primary/40 scale-110" 
                  : "bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80"
              }`}
              whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={slide.badge}
            >
              <Icon size={16} className={`sm:w-5 sm:h-5 ${index === currentSlide ? "text-primary" : "text-muted-foreground"}`} />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5 sm:p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
