import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Filter, BookOpen, Lightbulb, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/home/CTASection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { entrepreneurProblems, getCategories, getPhases } from "@/data/entrepreneurProblems";

const GuideEntrepreneur = () => {
  useDocumentMeta({
    title: "Guide Entrepreneur — 30 problèmes et solutions concrètes",
    description: "Identifiez votre blocage parmi les 30 problèmes les plus fréquents des entrepreneurs et obtenez des solutions actionnables immédiatement.",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);

  const categories = getCategories();
  const phases = getPhases();

  const phaseLabels: Record<string, string> = {
    Find: "Trouver son business",
    PMF: "Product-Market Fit",
    Scale: "Scaler & Croître",
  };

  const filteredProblems = useMemo(() => {
    let result = entrepreneurProblems;
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedPhase) result = result.filter((p) => p.phase === selectedPhase);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.rootCause.toLowerCase().includes(q) ||
          p.solution.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, selectedCategory, selectedPhase]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <BookOpen size={16} />
                Guide Entrepreneur
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                30 problèmes, <span className="gradient-text">30 solutions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Les blocages les plus fréquents des entrepreneurs africains, diagnostiqués et résolus avec des actions concrètes.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un problème..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-border/50 bg-card text-base"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border/50">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Phase :</span>
                <Button variant={!selectedPhase ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedPhase(null)}>
                  Toutes
                </Button>
                {phases.map((phase) => (
                  <Button key={phase} variant={selectedPhase === phase ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedPhase(phase)}>
                    {phaseLabels[phase] || phase}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-sm text-muted-foreground mr-2">Catégorie :</span>
                <Button variant={!selectedCategory ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedCategory(null)}>
                  Toutes
                </Button>
                {categories.map((cat) => (
                  <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="container-wide">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "30", label: "Problèmes identifiés" },
                { value: "6", label: "Catégories" },
                { value: "3", label: "Phases de croissance" },
                { value: "90+", label: "Actions concrètes" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-4 rounded-2xl bg-card border border-border/50">
                  <div className="text-2xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems List */}
        <section className="section-padding pt-4">
          <div className="container-wide max-w-4xl">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2">Aucun problème trouvé</h3>
                <p className="text-muted-foreground mb-6">Essayez un autre terme ou retirez les filtres.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); setSelectedPhase(null); }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProblems.map((problem, index) => {
                  const isExpanded = expandedProblem === problem.id;
                  return (
                    <motion.div
                      key={problem.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                    >
                      <div className={`rounded-2xl border transition-all duration-300 ${isExpanded ? "border-primary/30 shadow-lg bg-card" : "border-border/50 bg-card hover:border-primary/20 hover:shadow-md"}`}>
                        <button
                          className="w-full p-6 flex items-center gap-4 text-left"
                          onClick={() => setExpandedProblem(isExpanded ? null : problem.id)}
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <problem.icon size={22} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{problem.phase}</span>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{problem.category}</span>
                            </div>
                            <h3 className="font-display font-semibold text-lg">
                              <span className="text-muted-foreground mr-2">#{problem.id}</span>
                              {problem.title}
                            </h3>
                          </div>
                          {isExpanded ? <ChevronUp size={20} className="text-muted-foreground shrink-0" /> : <ChevronDown size={20} className="text-muted-foreground shrink-0" />}
                        </button>

                        {isExpanded && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-6 space-y-5">
                            <div className="h-px bg-border" />

                            <div>
                              <h4 className="font-semibold text-sm text-destructive mb-2 flex items-center gap-2">
                                <Lightbulb size={16} /> Signaux d'alerte
                              </h4>
                              <ul className="space-y-1.5">
                                {problem.signals.map((signal, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-destructive mt-1">•</span> {signal}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Cause racine</h4>
                              <p className="text-sm text-muted-foreground">{problem.rootCause}</p>
                            </div>

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                              <h4 className="font-semibold text-sm text-primary mb-2">Solution</h4>
                              <p className="text-sm">{problem.solution}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <CheckCircle size={16} className="text-accent" /> Actions concrètes
                              </h4>
                              <ul className="space-y-2">
                                {problem.actionSteps.map((step, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                    <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                                      {i + 1}
                                    </span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">Vous vous reconnaissez ?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Ne restez pas bloqué. Notre équipe peut vous accompagner avec un diagnostic personnalisé et un plan d'action sur-mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/diagnostic-gratuit">
                    Faire mon diagnostic gratuit <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/parlons-projet">Parler à un expert</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default GuideEntrepreneur;
