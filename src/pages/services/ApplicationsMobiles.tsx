import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Globe, 
  Download, 
  ArrowRight, 
  Check, 
  Star,
  Apple,
  Play,
  Layers
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: Smartphone,
    title: "Applications Natives",
    description: "Applications iOS et Android haute performance avec une expérience utilisateur optimale.",
    features: ["Swift / Kotlin", "Performance native", "Accès hardware", "App Store & Play Store"],
  },
  {
    icon: Layers,
    title: "Applications Hybrides",
    description: "Une seule codebase pour iOS et Android avec React Native ou Flutter.",
    features: ["React Native / Flutter", "Développement rapide", "Maintenance simplifiée", "Coût optimisé"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Mobile",
    description: "Applications de commerce mobile optimisées pour la conversion.",
    features: ["Catalogue produits", "Paiement sécurisé", "Notifications push", "Programme fidélité"],
  },
  {
    icon: Globe,
    title: "Progressive Web Apps",
    description: "Applications web installables avec expérience mobile native.",
    features: ["Installation facile", "Mode hors-ligne", "Notifications", "Mises à jour auto"],
  },
];

const features = [
  { icon: Zap, title: "Performance", description: "Applications fluides et réactives" },
  { icon: Shield, title: "Sécurité", description: "Données utilisateurs protégées" },
  { icon: Download, title: "Distribution", description: "Publication sur les stores" },
  { icon: Star, title: "UX Premium", description: "Interfaces intuitives" },
];

const stats = [
  { value: "50+", label: "Apps publiées" },
  { value: "4.8", label: "Note moyenne stores" },
  { value: "500K+", label: "Téléchargements" },
  { value: "99.9%", label: "Uptime" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ApplicationsMobiles = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  <Smartphone size={16} />
                  Applications Mobiles
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Applications{" "}
                  <span className="gradient-text">mobiles</span>{" "}
                  qui captivent
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Développez des applications iOS et Android performantes pour toucher vos utilisateurs 
                  où qu'ils soient. E-commerce, services, productivité : nous réalisons votre vision.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Créer mon app
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Consultation gratuite</Link>
                  </Button>
                </div>
                
                {/* Store badges */}
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                    <Apple size={20} />
                    <span className="text-sm font-medium">App Store</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                    <Play size={20} />
                    <span className="text-sm font-medium">Play Store</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative max-w-xs mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-[3rem] blur-2xl scale-110" />
                  <div className="relative bg-card border-4 border-border rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                      <div className="h-full flex flex-col">
                        {/* Status bar */}
                        <div className="h-8 bg-muted/50 flex items-center justify-center">
                          <div className="w-20 h-4 bg-background rounded-full" />
                        </div>
                        {/* Content */}
                        <div className="flex-1 p-4 space-y-4">
                          <div className="h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl" />
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded-full w-3/4" />
                            <div className="h-4 bg-muted rounded-full w-1/2" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-20 bg-muted rounded-xl" />
                            <div className="h-20 bg-muted rounded-xl" />
                          </div>
                        </div>
                        {/* Bottom nav */}
                        <div className="h-16 bg-muted/50 flex items-center justify-around px-8">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-6 h-6 bg-muted rounded-full" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos solutions mobiles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                De l'application native à la PWA, nous choisissons la meilleure approche pour votre projet.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ce qui fait la différence
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsMobiles;
