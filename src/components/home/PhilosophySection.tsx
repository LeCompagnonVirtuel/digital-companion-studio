import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Rocket, Target, Shield, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: Target,
    title: "Focus avant tout",
    description: "Un seul projet, une seule stratégie, exécutée à fond. La diversification prématurée tue plus de business que la concurrence.",
  },
  {
    icon: Rocket,
    title: "Vitesse > Perfection",
    description: "Lancer imparfait et itérer vaut mieux que planifier indéfiniment. Le marché vous dira quoi améliorer.",
  },
  {
    icon: Shield,
    title: "Validation avant construction",
    description: "3 clients qui paient > 100 heures de développement. Validez la demande avant d'investir.",
  },
  {
    icon: Brain,
    title: "L'IA comme avantage injuste",
    description: "L'intelligence artificielle n'est pas un luxe, c'est un multiplicateur de force accessible à tous.",
  },
  {
    icon: Lightbulb,
    title: "Exécution > Connaissance",
    description: "20% d'apprentissage, 80% d'action. Les résultats viennent du terrain, pas des formations.",
  },
  {
    icon: Zap,
    title: "Résultats mesurables",
    description: "Ce qui n'est pas mesuré ne peut pas être amélioré. Chaque action a un KPI, chaque investissement a un ROI.",
  },
];

export function PhilosophySection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-premium mb-6">Notre Philosophie</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Principes qui guident{" "}
            <span className="gradient-text">chaque projet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des convictions fortes, testées sur le terrain avec des entrepreneurs africains. Pas de théorie — que du concret.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-elevated transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <principle.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="heroGhost" size="lg" asChild>
            <Link to="/guide-entrepreneur" className="group">
              Découvrir notre guide entrepreneur
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
