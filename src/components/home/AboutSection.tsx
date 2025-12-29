import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Award, Zap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const benefits = [
  "Expertise full-stack complète",
  "Équipe dédiée à votre projet",
  "Approche orientée résultats",
  "Technologies modernes et scalables",
  "Accompagnement personnalisé",
  "Support réactif et disponible",
];

const values = [
  { icon: Award, title: "Excellence", color: "from-primary to-accent" },
  { icon: Zap, title: "Agilité", color: "from-accent to-primary" },
  { icon: Heart, title: "Passion", color: "from-primary to-accent" },
  { icon: Target, title: "Résultats", color: "from-accent to-primary" },
];

export function AboutSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              À propos
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Une agence digitale{" "}
              <span className="gradient-text">à taille humaine</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Le Compagnon Virtuel, c'est une équipe passionnée qui accompagne les entreprises ambitieuses dans leur transformation digitale. Nous combinons expertise technique, créativité et vision stratégique pour créer des écosystèmes digitaux performants.
            </p>
            <p className="text-muted-foreground mb-8">
              Notre approche est simple : comprendre vos objectifs, concevoir des solutions sur-mesure et vous accompagner dans la durée. Chaque projet est unique, chaque client mérite une attention particulière.
            </p>

            {/* Values Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${value.color} bg-opacity-10`}
                  style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))` }}
                >
                  <value.icon size={16} className="text-primary" />
                  <span className="text-sm font-medium">{value.title}</span>
                </motion.div>
              ))}
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, i) => (
                <motion.li 
                  key={benefit} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/about" className="group">
                  En savoir plus
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1">
              <div className="w-full h-full rounded-[calc(1.5rem-4px)] bg-card flex items-center justify-center relative overflow-hidden">
                {/* Animated Background Pattern */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                
                <div className="text-center p-8 relative z-10">
                  <motion.div 
                    className="w-28 h-28 rounded-3xl overflow-hidden mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px hsl(243 75% 42% / 0.3)",
                        "0 0 40px hsl(243 75% 42% / 0.5)",
                        "0 0 20px hsl(243 75% 42% / 0.3)",
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.3 },
                    }}
                  >
                    <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl mb-2">Le Compagnon <span className="text-destructive">.Virtuel</span></h3>
                  <p className="text-muted-foreground">Votre partenaire digital intelligent</p>
                  
                  {/* Floating Stats */}
                  <div className="flex justify-center gap-6 mt-6">
                    {[
                      { value: "5+", label: "Ans" },
                      { value: "150+", label: "Projets" },
                      { value: "100%", label: "Satisfaits" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-center"
                      >
                        <div className="font-display font-bold text-xl gradient-text">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl" 
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
