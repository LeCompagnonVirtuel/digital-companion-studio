import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Target, Brain, Package, Megaphone, Heart, Cog, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Target, name: "Choix", count: 5, color: "bg-blue-500/10 text-blue-600" },
  { icon: Brain, name: "Exécution", count: 5, color: "bg-purple-500/10 text-purple-600" },
  { icon: Package, name: "Offre", count: 4, color: "bg-amber-500/10 text-amber-600" },
  { icon: Megaphone, name: "Acquisition", count: 1, color: "bg-green-500/10 text-green-600" },
  { icon: Heart, name: "Mindset", count: 9, color: "bg-rose-500/10 text-rose-600" },
  { icon: Cog, name: "Opérations", count: 6, color: "bg-cyan-500/10 text-cyan-600" },
];

const featuredProblems = [
  { number: 1, title: "Mauvais business pour son profil", phase: "Find" },
  { number: 5, title: "Procrastination productive", phase: "PMF" },
  { number: 8, title: "Offre pas claire ni structurée", phase: "PMF" },
  { number: 24, title: "Pas de système d'acquisition", phase: "PMF" },
];

export function EntrepreneurGuideSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-mesh" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-premium mb-6">
              <BookOpen size={14} className="mr-1.5" /> Guide Exclusif
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 tracking-tight">
              30 problèmes d'entrepreneurs,{" "}
              <span className="gradient-text">30 solutions concrètes</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Identifiez votre blocage parmi les problèmes les plus fréquents des entrepreneurs africains.
              Chaque problème est diagnostiqué avec des signaux d'alerte, une cause racine et des actions immédiates.
            </p>

            {/* Featured problems */}
            <div className="space-y-3 mb-8">
              {featuredProblems.map((problem, i) => (
                <motion.div
                  key={problem.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    #{problem.number}
                  </span>
                  <span className="text-sm font-medium flex-1">{problem.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{problem.phase}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link to="/guide-entrepreneur" className="group">
                  Voir les 30 problèmes <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/diagnostic-gratuit" className="group">
                  <Sparkles size={18} className="mr-2" /> Diagnostic gratuit
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right - Categories Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                    <cat.icon size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-sm mb-1">{cat.name}</h4>
                  <p className="text-xs text-muted-foreground">{cat.count} problèmes</p>
                </motion.div>
              ))}
            </div>

            {/* Diagnostic CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 text-center"
            >
              <Sparkles size={24} className="text-primary mx-auto mb-2" />
              <h4 className="font-display font-semibold mb-1">Diagnostic en 2 min</h4>
              <p className="text-xs text-muted-foreground mb-3">Identifiez votre blocage n°1 avec notre outil interactif gratuit.</p>
              <Button size="sm" variant="default" asChild>
                <Link to="/diagnostic-gratuit">Commencer</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
