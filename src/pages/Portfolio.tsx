import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const projects = [
  {
    title: "Boutique E-commerce Mode",
    category: "E-commerce",
    description: "Refonte complète d'une boutique en ligne avec augmentation de 180% du taux de conversion.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    tags: ["Shopify", "UI/UX", "Marketing"],
  },
  {
    title: "Application SaaS B2B",
    category: "Application Web",
    description: "Développement d'une plateforme de gestion de projet pour équipes agiles.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Site Vitrine Cabinet Avocat",
    category: "Site Web",
    description: "Site premium avec référencement local optimisé et prise de rendez-vous en ligne.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=600&fit=crop",
    tags: ["WordPress", "SEO", "Branding"],
  },
  {
    title: "Campagne Marketing 360°",
    category: "Marketing",
    description: "Stratégie multicanale avec +500% de leads générés en 6 mois.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop",
    tags: ["SEA", "Social Ads", "Email"],
  },
  {
    title: "Chatbot IA Service Client",
    category: "Automatisation",
    description: "Assistant virtuel intelligent réduisant de 60% les demandes au support.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    tags: ["IA", "Chatbot", "Intégration"],
  },
  {
    title: "Identité Visuelle Startup",
    category: "Branding",
    description: "Création complète de l'univers de marque pour une startup tech innovante.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Logo", "Charte graphique", "Print"],
  },
];

const Portfolio = () => {
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

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <Button variant="glass" size="sm" className="w-full text-background border-background/30">
                        Voir le projet
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-display font-semibold text-lg mt-2 mb-2">{project.title}</h3>
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
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
