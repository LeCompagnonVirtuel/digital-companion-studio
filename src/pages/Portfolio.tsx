import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, Loader2, FolderOpen, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { usePortfolioProjects, serviceCategories } from "@/hooks/usePortfolioProjects";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Portfolio = () => {
  useDocumentMeta({
    title: "Portfolio — Nos réalisations",
    description: "Découvrez nos projets web, marketing digital et e-commerce réalisés pour des entreprises en Afrique. Études de cas détaillées.",
  });

  const { projects, isLoading } = usePortfolioProjects(false);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = useMemo(() => {
    const projectCategories = projects.map(p => p.service_category);
    return ["Tous", ...Array.from(new Set(projectCategories))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter(p => p.service_category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Nos <span className="gradient-text">réalisations</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Découvrez une sélection de projets qui illustrent notre expertise et notre créativité.
              </p>
              {/* Animated counters */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-6 sm:gap-10 px-6 py-4 rounded-2xl bg-card border border-border/50"
              >
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold gradient-text"><AnimatedCounter target={150} suffix="+" /></p>
                  <p className="text-xs text-muted-foreground">Projets livrés</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold gradient-text"><AnimatedCounter target={80} suffix="+" /></p>
                  <p className="text-xs text-muted-foreground">Clients satisfaits</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold gradient-text"><AnimatedCounter target={100} suffix="%" /></p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border/50">
          <div className="container-wide">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full transition-all duration-300 ${activeCategory === category ? "shadow-md" : "hover:bg-primary/10 hover:border-primary/30"}`}
                >
                  {category}
                  {activeCategory !== category && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({category === "Tous" ? projects.length : projects.filter(p => p.service_category === category).length})
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-wide">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Chargement des projets...</span>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                    >
                      <Link to={`/portfolio/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                        {project.featured_image ? (
                          <img src={project.featured_image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <span className="text-muted-foreground">Pas d'image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <Button variant="glass" size="sm" className="w-full text-background border-background/30">
                            Voir l'étude de cas <ArrowRight size={14} />
                          </Button>
                        </div>
                      </Link>
                      <div className="p-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.service_category}</span>
                        <Link to={`/portfolio/${project.slug}`}>
                          <h3 className="font-display font-semibold text-lg mt-2 mb-2 hover:text-primary transition-colors">{project.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.short_description || project.description}</p>
                        {project.client && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Client:</span>
                            <span className="font-medium">{project.client}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {!isLoading && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <FolderOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2">Aucun projet dans cette catégorie</h3>
                <p className="text-muted-foreground mb-6">Explorez nos autres catégories ou découvrez tous nos projets.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" onClick={() => setActiveCategory("Tous")}>
                    Voir tous les projets
                  </Button>
                  <Button asChild>
                    <Link to="/demarrer-projet" className="group">
                      <Sparkles size={16} className="mr-2" />
                      Démarrer votre projet
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
