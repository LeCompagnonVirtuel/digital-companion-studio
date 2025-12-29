import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Palette, 
  Users, 
  Bot, 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  Code, 
  Paintbrush, 
  Fingerprint, 
  Search, 
  PenTool, 
  Mail, 
  Target, 
  FileCheck, 
  HeartHandshake,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Stratégies sur-mesure pour maximiser votre visibilité et vos conversions.",
    color: "from-primary/20 to-accent/20",
  },
  {
    icon: Palette,
    title: "Création de Contenu",
    description: "Visuels, vidéos et rédaction qui captivent votre audience.",
    color: "from-accent/20 to-primary/20",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Animation et croissance de vos communautés sur les réseaux sociaux.",
    color: "from-primary/20 to-accent/20",
  },
  {
    icon: Bot,
    title: "Automatisation & IA",
    description: "Optimisez vos process avec l'intelligence artificielle.",
    color: "from-accent/20 to-primary/20",
  },
  {
    icon: Globe,
    title: "Développement Web",
    description: "Sites vitrines, landing pages et applications web sur-mesure.",
    color: "from-primary/20 to-accent/20",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne performantes et optimisées pour la conversion.",
    color: "from-accent/20 to-primary/20",
  },
  {
    icon: Code,
    title: "Applications Web",
    description: "Solutions digitales complexes adaptées à vos besoins.",
    color: "from-primary/20 to-accent/20",
  },
  {
    icon: Fingerprint,
    title: "Branding & Identité",
    description: "Création d'identités visuelles mémorables et cohérentes.",
    color: "from-accent/20 to-primary/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
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
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
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
          className="text-center mt-12"
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
