import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { getProjectsList } from "@/data/projects";

const projects = getProjectsList();

// Extract unique categories from projects
const categories = ["Tous", ...Array.from(new Set(projects.map(p => p.category)))];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Nos{" "}
                <span className="gradient-text">réalisations</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez une sélection de projets qui illustrent notre expertise et notre créativité.
              </p>
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
                  className={`rounded-full transition-all duration-300 ${
                    activeCategory === category 
                      ? "shadow-md" 
                      : "hover:bg-primary/10 hover:border-primary/30"
                  }`}
                >
                  {category}
                  {activeCategory !== category && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({category === "Tous" ? projects.length : projects.filter(p => p.category === category).length})
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
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                  >
                    {/* Image */}
                    <Link to={`/portfolio/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <Button variant="glass" size="sm" className="w-full text-background border-background/30">
                          Voir l'étude de cas
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <Link to={`/portfolio/${project.slug}`}>
                        <h3 className="font-display font-semibold text-lg mt-2 mb-2 hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aucun projet trouvé dans cette catégorie.</p>
              </div>
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
