import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Building2, 
  Tag, 
  ExternalLink,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { getProjectBySlug, projects } from "@/data/projects";
import { useState } from "react";

function ImageGallery({ images, projectTitle }: { images: { url: string; alt: string; caption?: string }[]; projectTitle: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-background text-sm font-medium">{image.caption}</p>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink size={18} className="text-background" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <X size={24} className="text-background" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
              }}
              className="absolute left-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <ChevronLeft size={24} className="text-background" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev !== null ? (prev + 1) % images.length : null);
              }}
              className="absolute right-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <ChevronRight size={24} className="text-background" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="w-full h-full object-contain"
              />
              {images[selectedImage].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                  <p className="text-background text-center">{images[selectedImage].caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const nextProject = project.nextProject ? getProjectBySlug(project.nextProject) : null;
  const prevProject = project.prevProject ? getProjectBySlug(project.prevProject) : null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft size={16} />
                Retour au portfolio
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    {project.category}
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                    {project.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                      <Building2 size={20} className="text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Client</p>
                        <p className="font-medium text-sm">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                      <Tag size={20} className="text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Secteur</p>
                        <p className="font-medium text-sm">{project.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                      <Clock size={20} className="text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Durée</p>
                        <p className="font-medium text-sm">{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                      <Calendar size={20} className="text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Année</p>
                        <p className="font-medium text-sm">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Résultats obtenus</h2>
              <p className="text-background/70">Les chiffres clés de ce projet</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-background/5 border border-background/10"
                >
                  <p className="text-4xl font-display font-bold text-primary mb-2">{result.value}</p>
                  <p className="font-semibold text-background mb-1">{result.label}</p>
                  <p className="text-sm text-background/60">{result.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-display font-bold mb-6">Le défi</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-display font-bold mb-6">Notre solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </motion.div>
            </div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-2xl font-display font-bold mb-8">Notre approche</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.approach.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <p className="text-sm">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Galerie du projet</h2>
              <p className="text-muted-foreground">Découvrez les réalisations en détail</p>
            </motion.div>

            <ImageGallery images={project.gallery} projectTitle={project.title} />
          </div>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="section-padding">
            <div className="container-narrow">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 lg:p-12 rounded-3xl bg-primary/5 border border-primary/20"
              >
                <Quote size={48} className="text-primary/20 absolute top-6 left-6" />
                <div className="relative">
                  <blockquote className="text-xl lg:text-2xl font-display leading-relaxed mb-8">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-bold text-primary">
                        {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{project.testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.testimonial.role} — {project.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Technologies & Services */}
        <section className="section-padding bg-card">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-display font-bold text-xl mb-4">Technologies utilisées</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-xl mb-4">Services fournis</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4">
              {prevProject ? (
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="flex-1 group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <ArrowLeft size={16} />
                    <span className="text-sm">Projet précédent</span>
                  </div>
                  <p className="font-display font-semibold group-hover:text-primary transition-colors">
                    {prevProject.title}
                  </p>
                </Link>
              ) : <div className="flex-1" />}

              {nextProject ? (
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="flex-1 group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                    <span className="text-sm">Projet suivant</span>
                    <ArrowRight size={16} />
                  </div>
                  <p className="font-display font-semibold group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </p>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
