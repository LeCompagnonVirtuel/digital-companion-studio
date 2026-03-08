import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Search, TrendingUp, Target, Zap, BarChart3, Shield, Clock, Gift } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const auditIncludes = [
  {
    icon: Search,
    title: "Analyse de votre site actuel",
    description: "Performance, design, expérience utilisateur et compatibilité mobile.",
  },
  {
    icon: Target,
    title: "Évaluation SEO",
    description: "Positionnement, mots-clés, structure technique et optimisations recommandées.",
  },
  {
    icon: TrendingUp,
    title: "Opportunités de croissance",
    description: "Identification des leviers pour améliorer votre visibilité et vos conversions.",
  },
  {
    icon: BarChart3,
    title: "Benchmark concurrentiel",
    description: "Comparaison avec vos principaux concurrents et meilleures pratiques du secteur.",
  },
  {
    icon: Zap,
    title: "Recommandations prioritaires",
    description: "Plan d'action concret avec les actions à fort impact à mettre en place.",
  },
  {
    icon: Shield,
    title: "Sécurité & conformité",
    description: "Vérification des bonnes pratiques RGPD et sécurité de votre site.",
  },
];

const benefits = [
  "100% gratuit et sans engagement",
  "Livré sous 48h par email",
  "Analyse personnalisée par un expert",
  "Recommandations actionnables",
  "Aucune carte bancaire requise",
];

const FreeAudit = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  <Gift size={16} />
                  Offre gratuite
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                  Obtenez votre{" "}
                  <span className="gradient-text">audit digital gratuit</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Découvrez les forces et faiblesses de votre présence en ligne. Un expert analyse votre site et vous livre un rapport complet avec des recommandations concrètes.
                </p>

                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/demarrer-audit" className="group">
                      Demander mon audit gratuit
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                  <div className="relative p-8 rounded-3xl bg-card border border-border shadow-elevated">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <BarChart3 size={24} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold">Rapport d'audit</h3>
                        <p className="text-sm text-muted-foreground">Analyse complète</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {["Performance: 72/100", "SEO: 58/100", "Accessibilité: 89/100", "UX/Design: 65/100"].map((item, i) => (
                        <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-background">
                          <span className="text-sm">{item.split(":")[0]}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${parseInt(item.split(":")[1]) || 0}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                              />
                            </div>
                            <span className="text-sm font-medium w-16 text-right">{item.split(":")[1]}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-2 text-accent font-medium mb-1">
                        <Zap size={16} />
                        Potentiel d'amélioration
                      </div>
                      <p className="text-sm text-muted-foreground">+40% de conversions possibles avec nos recommandations</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="badge-premium mb-4">Contenu de l'audit</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ce que comprend votre audit
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un rapport complet et détaillé pour comprendre exactement où vous en êtes et comment progresser.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {auditIncludes.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <Clock size={16} />
                Livré sous 48h
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à découvrir votre potentiel digital ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Remplissez le formulaire et recevez votre audit personnalisé directement par email.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/demarrer-audit" className="group">
                  Démarrer mon audit gratuit
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FreeAudit;
