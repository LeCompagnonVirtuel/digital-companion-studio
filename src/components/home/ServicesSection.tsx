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
  },
  {
    icon: Palette,
    title: "Création de Contenu",
    description: "Visuels, vidéos et rédaction qui captivent votre audience.",
    gradient: "from-pink-500/10 to-rose-500/10",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation et croissance de vos communautés sur les réseaux sociaux.",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    icon: Bot,
    title: "Automatisation & IA",
    description: "Optimisez vos process avec l'intelligence artificielle.",
    gradient: "from-cyan-500/10 to-teal-500/10",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
  },
  {
    icon: Globe,
    title: "Développement Web",
    description: "Sites vitrines, landing pages et applications web sur-mesure.",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne performantes et optimisées pour la conversion.",
    gradient: "from-orange-500/10 to-amber-500/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    icon: Code,
    title: "Applications Web",
    description: "Solutions digitales complexes adaptées à vos besoins.",
    gradient: "from-slate-500/10 to-gray-500/10",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-600",
  },
  {
    icon: Fingerprint,
    title: "Branding & Identité",
    description: "Création d'identités visuelles mémorables et cohérentes.",
    gradient: "from-fuchsia-500/10 to-pink-500/10",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-600",
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="badge-premium mb-6">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Tout ce dont vous avez besoin{" "}
            <span className="gradient-text">pour réussir</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expertise complète pour créer, développer et automatiser votre présence digitale.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-elevated">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={24} className={service.iconColor} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/services" className="group">
              Découvrir tous nos services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}