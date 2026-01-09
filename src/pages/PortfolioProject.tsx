import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Tag, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { supabase } from "@/integrations/supabase/client";
import { serviceCategories, type PortfolioProject } from "@/hooks/usePortfolioProjects";

const PortfolioProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      
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
  }, [slug, navigate]);

  const getCategoryLabel = (value: string) => {
    return serviceCategories.find(c => c.value === value)?.label || value;
  };

  const getCategoryHref = (value: string) => {
    return `/services/${value}`;
  };

  const allImages = project ? [project.featured_image, ...project.images].filter(Boolean) as string[] : [];

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
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
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
        {/* Header */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Link */}
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft size={18} />
                Retour au portfolio
              </Link>

              {/* Category */}
              <Link 
                to={getCategoryHref(project.service_category)}
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 hover:bg-primary/20 transition-colors"
              >
                {getCategoryLabel(project.service_category)}
              </Link>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                {project.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{project.client}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(project.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                </div>
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
              className="rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => project.featured_image && openLightbox(0)}
            >
              {project.featured_image ? (
                <img 
                  src={project.featured_image} 
                  alt={project.title}
                  className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl font-display font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                {project.short_description && (
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                    {project.short_description}
                  </p>
                )}
                
                {project.description && (
                  <div className="prose prose-lg max-w-none">
                    {project.description.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-display font-semibold text-xl mb-6">Galerie</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => openLightbox(index + 1)}
                        >
                          <img 
                            src={img} 
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Project Info Card */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold mb-4">Détails du projet</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Service</dt>
                      <dd className="font-medium">{getCategoryLabel(project.service_category)}</dd>
                    </div>
                    {project.client && (
                      <div>
                        <dt className="text-sm text-muted-foreground">Client</dt>
                        <dd className="font-medium">{project.client}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-muted-foreground">Date</dt>
                      <dd className="font-medium">
                        {new Date(project.created_at).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* CTA Card */}
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-display font-semibold mb-2">Un projet similaire ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Parlons de votre projet et voyons comment nous pouvons vous aider.
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
                      className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-elevated transition-all"
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
                            <span className="text-2xl font-display font-bold text-primary/30">
                              {related.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
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
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X size={24} />
          </button>
          
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.img
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={allImages[lightboxIndex]}
            alt={`Image ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioProjectPage;
