import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe, ShoppingCart, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioProjects, serviceCategories } from "@/hooks/usePortfolioProjects";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Fallback static projects if database is empty
const fallbackProjects = [
  {
    id: "1",
    title: "E-commerce BioCosmetics",
    slug: "ecommerce-biocosmetics",
    short_description: "Boutique en ligne premium avec +200% de conversion",
    service_category: "ecommerce",
    featured_image: null,
    icon: ShoppingCart,
    color: "from-emerald-500/20 to-teal-500/20",
    stats: [
      { label: "Conversion", value: "+200%" },
      { label: "Trafic", value: "+350%" },
    ],
  },
  {
    id: "2",
    title: "App SaaS InnovateTech",
    slug: "app-saas-innovatetech",
    short_description: "Plateforme de gestion avec tableau de bord intelligent",
    service_category: "developpement-web",
    featured_image: null,
    icon: Smartphone,
    color: "from-primary/20 to-accent/20",
    stats: [
      { label: "Utilisateurs", value: "10K+" },
      { label: "Rétention", value: "94%" },
    ],
  },
  {
    id: "3",
    title: "Site Corporate FinanceGroup",
    slug: "site-financegroup",
    short_description: "Présence digitale premium pour groupe financier",
    service_category: "developpement-web",
    featured_image: null,
    icon: Globe,
    color: "from-amber-500/20 to-orange-500/20",
    stats: [
      { label: "Leads", value: "+180%" },
      { label: "Temps/page", value: "+45%" },
    ],
  },
];

const getCategoryLabel = (value: string) => {
  return serviceCategories.find(c => c.value === value)?.label || value;
};

const getGradientColor = (category: string) => {
  const gradients: Record<string, string> = {
    'ecommerce': 'from-emerald-500/20 to-teal-500/20',
    'developpement-web': 'from-primary/20 to-accent/20',
    'marketing-digital': 'from-blue-500/20 to-indigo-500/20',
    'design-branding': 'from-fuchsia-500/20 to-pink-500/20',
    'automatisation-ia': 'from-cyan-500/20 to-teal-500/20',
    'applications-mobiles': 'from-violet-500/20 to-purple-500/20',
    'seo': 'from-green-500/20 to-emerald-500/20',
    'community-management': 'from-pink-500/20 to-rose-500/20',
    'creation-contenu': 'from-orange-500/20 to-amber-500/20',
  };
  return gradients[category] || 'from-primary/20 to-accent/20';
};

export function FeaturedProjectsSection() {
  const { projects, isLoading } = usePortfolioProjects(false);

  // Use database projects if available, otherwise use fallback
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : fallbackProjects;

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles size={14} />
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Nos <span className="gradient-text">réalisations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Des projets concrets qui démontrent notre expertise et notre créativité.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild className="self-start md:self-auto">
            <Link to="/portfolio" className="group">
              Voir tous les projets
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-muted animate-pulse">
                <div className="aspect-[4/3]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted-foreground/10 rounded w-24" />
                  <div className="h-6 bg-muted-foreground/10 rounded w-3/4" />
                  <div className="h-4 bg-muted-foreground/10 rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            displayProjects.map((project, index) => {
              const isFromDatabase = 'slug' in project && projects.length > 0;
              const projectLink = isFromDatabase 
                ? `/portfolio/${project.slug}` 
                : '/portfolio';
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative"
                >
                  <Link 
                    to={projectLink} 
                    className="relative h-full rounded-2xl bg-background border border-border overflow-hidden hover:border-primary/30 hover:shadow-elevated transition-all duration-500 block"
                  >
                    {/* Project Image */}
                    <div className={`aspect-[4/3] relative overflow-hidden ${
                      project.featured_image 
                        ? '' 
                        : `bg-gradient-to-br ${getGradientColor(project.service_category)}`
                    }`}>
                      {project.featured_image ? (
                        <img 
                          src={project.featured_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <span className="text-3xl font-display font-bold text-primary">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-primary-foreground font-medium flex items-center gap-2">
                          <ExternalLink size={16} />
                          Voir le projet
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                        {getCategoryLabel(project.service_category)}
                      </span>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.short_description || 'Découvrez ce projet réalisé par notre équipe.'}
                      </p>
                      
                      {/* Stats (for fallback projects) */}
                      {'stats' in project && project.stats && (
                        <div className="flex gap-6 mt-4">
                          {project.stats.map((stat: { label: string; value: string }) => (
                            <div key={stat.label}>
                              <div className="font-display font-bold text-lg gradient-text">{stat.value}</div>
                              <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
