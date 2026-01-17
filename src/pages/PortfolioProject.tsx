import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Target,
  Lightbulb,
  Wrench,
  TrendingUp,
  ExternalLink,
  Quote,
  Clock,
  Layers,
  CheckCircle2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { supabase } from "@/integrations/supabase/client";
import { serviceCategories } from "@/hooks/usePortfolioProjects";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  client: string | null;
  service_category: string;
  featured_image: string | null;
  images: string[];
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  objectives: string | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  technologies: string[] | null;
  services_provided: string[] | null;
  project_url: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  duration: string | null;
  year: string | null;
}

const PortfolioProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioProject[]>([]);
  const [allProjects, setAllProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      
      // Fetch current project
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        navigate('/portfolio', { replace: true });
        return;
      }

      setProject(data as PortfolioProject);

      // Fetch all published projects for navigation
      const { data: allData } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      setAllProjects((allData as PortfolioProject[]) || []);

      // Fetch related projects
      const { data: related } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('status', 'published')
        .eq('service_category', data.service_category)
        .neq('id', data.id)
        .limit(3);

      setRelatedProjects((related as PortfolioProject[]) || []);
      setIsLoading(false);
    };

    fetchProject();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`portfolio-project-${slug}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'portfolio_projects',
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          const updated = payload.new as PortfolioProject;
          if (updated.status === 'published') {
            setProject(updated);
          } else {
            navigate('/portfolio', { replace: true });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug, navigate]);

  const getCategoryLabel = (value: string) => {
    return serviceCategories.find(c => c.value === value)?.label || value;
  };

  const getCategoryHref = (value: string) => {
    return `/services/${value}`;
  };

  // Navigation between projects
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const allImages = project ? [project.featured_image, ...(project.images || [])].filter(Boolean) as string[] : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container-narrow">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-12 bg-muted rounded w-2/3" />
              <div className="aspect-video bg-muted rounded-2xl" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-4/6" />
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-muted rounded-2xl" />
                  <div className="h-32 bg-muted rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Header */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
          
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                <span>/</span>
                <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <span>/</span>
                <span className="text-foreground">{project.title}</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  {/* Category Badge */}
                  <Link 
                    to={getCategoryHref(project.service_category)}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 hover:bg-primary/20 transition-colors"
                  >
                    <Layers size={14} />
                    {getCategoryLabel(project.service_category)}
                  </Link>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                    {project.title}
                  </h1>

                  {/* Short description */}
                  {project.short_description && (
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      {project.short_description}
                    </p>
                  )}

                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    {project.client && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                        <User size={16} className="text-primary" />
                        <span className="text-sm">{project.client}</span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                        <Calendar size={16} className="text-primary" />
                        <span className="text-sm">{project.year}</span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                        <Clock size={16} className="text-primary" />
                        <span className="text-sm">{project.duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project URL CTA */}
                {project.project_url && (
                  <Button variant="hero" size="lg" asChild>
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} className="mr-2" />
                      Voir le site
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-12">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-premium cursor-pointer group"
              onClick={() => project.featured_image && openLightbox(0)}
            >
              {project.featured_image ? (
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.featured_image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-8xl font-display font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column - Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2 space-y-12"
              >
                {/* Problem Section */}
                {project.problem && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                        <Target size={20} className="text-destructive" />
                      </div>
                      <h2 className="font-display font-semibold text-xl">Problématique</h2>
                    </div>
                    <div className="pl-[52px]">
                      <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                    </div>
                  </div>
                )}

                {/* Objectives Section */}
                {project.objectives && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Lightbulb size={20} className="text-accent" />
                      </div>
                      <h2 className="font-display font-semibold text-xl">Objectifs</h2>
                    </div>
                    <div className="pl-[52px]">
                      <p className="text-muted-foreground leading-relaxed">{project.objectives}</p>
                    </div>
                  </div>
                )}

                {/* Solution Section */}
                {project.solution && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Wrench size={20} className="text-primary" />
                      </div>
                      <h2 className="font-display font-semibold text-xl">Solution apportée</h2>
                    </div>
                    <div className="pl-[52px]">
                      <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                )}

                {/* Results Section */}
                {project.results && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <TrendingUp size={20} className="text-accent" />
                      </div>
                      <h2 className="font-display font-semibold text-xl">Résultats obtenus</h2>
                    </div>
                    <div className="pl-[52px]">
                      <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                    </div>
                  </div>
                )}

                {/* Full Description (fallback if no structured content) */}
                {project.description && !project.problem && !project.solution && (
                  <div className="prose prose-lg max-w-none">
                    {project.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10 relative"
                  >
                    <Quote size={48} className="absolute top-6 right-6 text-primary/10" />
                    <blockquote className="text-lg italic text-foreground mb-4 relative z-10">
                      "{project.testimonial}"
                    </blockquote>
                    {project.testimonial_author && (
                      <cite className="text-muted-foreground not-italic flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                        {project.testimonial_author}
                      </cite>
                    )}
                  </motion.div>
                )}

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Layers size={20} className="text-primary" />
                      </div>
                      Galerie du projet
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-premium transition-all"
                          onClick={() => openLightbox(index + 1)}
                        >
                          <img 
                            src={img} 
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Right Column - Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Project Info Card */}
                <div className="p-6 rounded-2xl bg-card border border-border sticky top-24">
                  <h3 className="font-display font-semibold mb-6">Détails du projet</h3>
                  <dl className="space-y-5">
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Service</dt>
                      <dd>
                        <Link 
                          to={getCategoryHref(project.service_category)}
                          className="font-medium text-primary hover:underline"
                        >
                          {getCategoryLabel(project.service_category)}
                        </Link>
                      </dd>
                    </div>
                    {project.client && (
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Client</dt>
                        <dd className="font-medium">{project.client}</dd>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Année</dt>
                        <dd className="font-medium">{project.year}</dd>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Durée</dt>
                        <dd className="font-medium">{project.duration}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Services Provided */}
                  {project.services_provided && project.services_provided.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <dt className="text-sm text-muted-foreground mb-3">Services fournis</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.services_provided.map((service, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                          >
                            <CheckCircle2 size={12} />
                            {service}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <dt className="text-sm text-muted-foreground mb-3">Technologies utilisées</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </div>

                {/* CTA Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <h3 className="font-display font-semibold mb-2">Un projet similaire ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Parlons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
                  </p>
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/contact">
                      Discutons ensemble
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="py-8 border-t border-border">
          <div className="container-narrow">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link 
                  to={`/portfolio/${prevProject.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-muted-foreground">Projet précédent</span>
                    <p className="font-medium group-hover:text-primary transition-colors">{prevProject.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Button variant="outline" asChild>
                <Link to="/portfolio">
                  Voir tous les projets
                </Link>
              </Button>

              {nextProject ? (
                <Link 
                  to={`/portfolio/${nextProject.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Projet suivant</span>
                    <p className="font-medium group-hover:text-primary transition-colors">{nextProject.title}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container-wide">
              <h2 className="font-display font-bold text-2xl mb-8">Projets similaires</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/portfolio/${related.slug}`}
                      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elevated transition-all"
                    >
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {related.featured_image ? (
                          <img 
                            src={related.featured_image} 
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                            <span className="text-3xl font-display font-bold text-primary/30">
                              {related.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-primary-foreground font-medium">Voir le projet</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-primary font-medium">
                          {getCategoryLabel(related.service_category)}
                        </span>
                        <h3 className="font-display font-semibold mt-1 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        {related.short_description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {related.short_description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                  className="absolute left-4 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                  className="absolute right-4 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={allImages[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightboxIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioProjectPage;
