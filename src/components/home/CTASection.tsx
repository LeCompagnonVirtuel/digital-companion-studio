import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const benefits = [
  "Audit complet de votre présence digitale",
  "Recommandations personnalisées",
  "Roadmap de croissance sur-mesure",
  "Sans engagement",
];

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated Background */}
          <div 
            className="absolute inset-0 -z-10"
            style={{ background: "var(--gradient-dark)" }}
          />
          <motion.div 
            className="absolute inset-0 -z-10 opacity-40"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/50 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/30 rounded-full blur-3xl" />
          </motion.div>

          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-8 py-16 md:px-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6"
                >
                  <Sparkles size={16} />
                  <span>Offre limitée</span>
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-background mb-6">
                  Prêt à transformer{" "}
                  <span className="text-primary">votre digital ?</span>
                </h2>
                <p className="text-lg text-background/70 mb-8">
                  Discutons de votre projet. Audit gratuit et sans engagement pour identifier vos opportunités de croissance.
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, i) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-background/80"
                    >
                      <CheckCircle size={18} className="text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="hero" size="xl" asChild className="shadow-glow">
                      <Link to="/demarrer-audit" className="group">
                        Demander un audit gratuit
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="glass" 
                      size="xl" 
                      asChild
                      className="border-background/20 text-background hover:bg-background/10"
                    >
                      <Link to="/parlons-projet">
                        <MessageCircle size={20} className="mr-2" />
                        Nous contacter
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-8 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-elevated z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                        +200%
                      </div>
                      <div className="text-foreground text-sm">
                        <div className="font-semibold">Conversion</div>
                        <div className="text-muted-foreground text-xs">Moyenne clients</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-8 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-elevated z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        24h
                      </div>
                      <div className="text-foreground text-sm">
                        <div className="font-semibold">Réponse rapide</div>
                        <div className="text-muted-foreground text-xs">Toujours disponible</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Element */}
                  <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border border-background/10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-background/20"
                    />
                    <div className="absolute w-20 h-20 rounded-2xl bg-background flex items-center justify-center shadow-elevated overflow-hidden">
                      <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
