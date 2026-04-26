import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Bot, Megaphone, ShoppingCart, CheckCircle, Sparkles, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: Globe,
    title: "Sites Web Premium",
    description: "Sites vitrines et plateformes sur-mesure livrés en 5 à 15 jours.",
    color: "bg-primary/10 text-primary",
    stat: "5-15 jours",
  },
  {
    icon: Bot,
    title: "Automatisation IA",
    description: "Chatbots, automatisations et outils IA pour gagner du temps.",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    stat: "24/7 actif",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Stratégies d'acquisition et publicité pour attirer des clients.",
    color: "bg-accent/10 text-accent",
    stat: "+200% ROI",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne optimisées avec Mobile Money intégré.",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    stat: "Vendre 24/7",
  },
];

const proofs = [
  { text: "50+ projets livrés", icon: Star },
  { text: "12 secteurs d'activité accompagnés", icon: Users },
  { text: "Sites livrés en 5 à 15 jours", icon: Globe },
  { text: "Paiement en 2x ou 3x sans frais", icon: CheckCircle },
];

export function WelcomeSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left — Message d'accueil */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-premium mb-6">
              <Sparkles size={14} className="mr-1.5" /> Bienvenue
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 tracking-tight leading-tight">
              Votre partenaire digital pour{" "}
              <span className="gradient-text">réussir en Afrique</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Nous aidons les entrepreneurs et entreprises africaines à créer une présence digitale
              professionnelle qui attire des clients et génère du chiffre d'affaires. Du site web
              au marketing en passant par l'IA — tout ce qu'il faut pour dominer votre marché.
            </p>
            <ul className="space-y-3 mb-8">
              {proofs.map((proof, i) => (
                <motion.li
                  key={proof.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <proof.icon size={14} className="text-accent" />
                  </div>
                  <span className="font-medium">{proof.text}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link to="/demarrer-projet" className="group">
                  Démarrer mon projet <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/audit-gratuit">Audit gratuit</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — 4 highlights cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-primary/70 bg-primary/5 px-2 py-1 rounded-full">{item.stat}</span>
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
