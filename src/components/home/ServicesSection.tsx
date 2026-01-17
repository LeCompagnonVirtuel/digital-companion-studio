import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Palette, 
  Users, 
  Bot, 
  Globe, 
  ShoppingCart, 
  Code, 
  Fingerprint,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Stratégies sur-mesure pour maximiser votre visibilité et vos conversions.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    href: "/services/marketing-digital",
  },
  {
    icon: Palette,
    title: "Création de Contenu",
    description: "Visuels, vidéos et rédaction qui captivent votre audience.",
    gradient: "from-pink-500/10 to-rose-500/10",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600",
    href: "/services/creation-contenu",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation et croissance de vos communautés sur les réseaux sociaux.",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
    href: "/services/community-management",
  },
  {
    icon: Bot,
    title: "Automatisation & IA",
    description: "Optimisez vos process avec l'intelligence artificielle.",
    gradient: "from-cyan-500/10 to-teal-500/10",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
    href: "/services/automatisation-ia",
  },
  {
    icon: Globe,
    title: "Développement Web",
    description: "Sites vitrines, landing pages et applications web sur-mesure.",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    href: "/services/developpement-web",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne performantes et optimisées pour la conversion.",
    gradient: "from-orange-500/10 to-amber-500/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    href: "/services/ecommerce",
  },
  {
    icon: Code,
    title: "Applications Mobiles",
    description: "Solutions digitales mobiles adaptées à vos besoins.",
    gradient: "from-slate-500/10 to-gray-500/10",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-600",
    href: "/services/applications-mobiles",
  },
  {
    icon: Fingerprint,
    title: "Branding & Identité",
    description: "Création d'identités visuelles mémorables et cohérentes.",
    gradient: "from-fuchsia-500/10 to-pink-500/10",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-600",
    href: "/services/design-branding",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-3xl" />
      </div>

      <div className="container-wide">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-5 border border-primary/15 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Nos Services
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 md:mb-6 tracking-tight px-4">
            Tout ce dont vous avez besoin{" "}
            <span className="gradient-text block sm:inline mt-1 sm:mt-0">pour réussir</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Une expertise complète pour créer, développer et automatiser votre présence digitale.
          </p>
        </motion.div>

        {/* Services Grid - Enhanced */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <Link 
                to={service.href}
                className="block h-full p-6 md:p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/25 transition-all duration-500 hover:shadow-elevated"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Icon - Enhanced */}
                  <div className={`w-13 h-13 md:w-14 md:h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-400`}>
                    <service.icon size={24} className={`md:w-6 md:h-6 ${service.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg md:text-xl mb-2 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                    <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Button variant="hero" size="lg" asChild className="shadow-lg">
            <Link to="/services" className="group">
              Découvrir tous nos services
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}