import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Expertise full-stack complète",
  "Équipe dédiée à votre projet",
  "Approche orientée résultats",
  "Technologies modernes et scalables",
  "Accompagnement personnalisé",
  "Support réactif et disponible",
];

export function AboutSection() {
  return (
    <section className="section-padding">
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

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <Link to="/about" className="group">
                En savoir plus
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
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
              <div className="w-full h-full rounded-[calc(1.5rem-4px)] bg-card flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-4xl mx-auto mb-6 shadow-glow">
                    CV
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">Le Compagnon Virtuel</h3>
                  <p className="text-muted-foreground">Votre partenaire digital intelligent</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
