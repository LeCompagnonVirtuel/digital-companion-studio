import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User, Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AuthorName = ({ name }: { name: string }) => (
  <span>{name}<span className="text-destructive">.</span></span>
);

const Blog = () => {
  const { posts, isLoading } = useBlogPosts(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return '3 min';
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

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
                Blog & Ressources
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Insights &{" "}
                <span className="gradient-text">actualités</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conseils, guides et tendances pour booster votre présence digitale.
              </p>
            </motion.div>
          </div>
        </section>

        {isLoading ? (
          <section className="section-padding pt-0">
            <div className="container-wide flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </section>
        ) : posts.length === 0 ? (
          <section className="section-padding pt-0">
            <div className="container-wide text-center py-20">
              <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            <section className="section-padding pt-0 -mt-8">
              <div className="container-wide">
                <Link to={`/blog/${posts[0].slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={posts[0].cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                      alt={posts[0].title}
                      className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                        {posts[0].category}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-display font-bold text-background mb-4 max-w-2xl">
                        {posts[0].title}
                      </h2>
                      <p className="text-background/70 mb-6 max-w-xl">{posts[0].excerpt}</p>
                      <div className="flex items-center gap-6 text-background/60 text-sm">
                        <span className="flex items-center gap-2">
                          <User size={16} />
                          <AuthorName name={posts[0].author_name} />
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {formatDate(posts[0].published_at)}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={16} />
                          {estimateReadTime(posts[0].content)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </section>

            {/* Blog Grid */}
            {posts.length > 1 && (
              <section className="section-padding pt-0">
                <div className="container-wide">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, index) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <motion.article
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 cursor-pointer"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={post.cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(post.published_at)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {estimateReadTime(post.content)}
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
