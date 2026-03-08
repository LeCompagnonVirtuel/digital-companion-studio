import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User, Loader2, Search, Mail, X } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/home/CTASection";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AuthorName = ({ name }: { name: string }) => (
  <span>{name}<span className="text-destructive">.</span></span>
);

const Blog = () => {
  useDocumentMeta({
    title: "Blog — Conseils & actualités digitales",
    description: "Guides, tendances et conseils pour booster votre présence digitale en Afrique. Marketing, SEO, IA et développement web.",
  });

  const { posts, isLoading } = useBlogPosts(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!posts.length) return [];
    return [...new Set(posts.map(p => p.category))].sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q));
    }
    return result;
  }, [posts, searchQuery, selectedCategory]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return '3 min';
    return `${Math.ceil(content.split(/\s+/).length / 200)} min`;
  };

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero with search */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Blog & Ressources</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Insights & <span className="gradient-text">actualités</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Conseils, guides et tendances pour booster votre présence digitale.
              </p>
              {/* Search bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
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

        {/* Category chips */}
        {categories.length > 0 && (
          <section className="py-6 border-b border-border/50">
            <div className="container-wide">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button variant={!selectedCategory ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedCategory(null)}>
                  Tous ({posts.length})
                </Button>
                {categories.map(cat => (
                  <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedCategory(cat)}>
                    {cat} ({posts.filter(p => p.category === cat).length})
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {isLoading ? (
          <section className="section-padding pt-0">
            <div className="container-wide flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </section>
        ) : filteredPosts.length === 0 ? (
          <section className="section-padding pt-0">
            <div className="container-wide text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">Aucun article trouvé</h3>
              <p className="text-muted-foreground mb-6">Essayez une autre recherche ou explorez toutes les catégories.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>Voir tous les articles</Button>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="section-padding pt-8 -mt-4">
                <div className="container-wide">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden group cursor-pointer">
                      <OptimizedImage src={featuredPost.cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"} alt={featuredPost.title} className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">{featuredPost.category}</span>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-background mb-4 max-w-2xl">{featuredPost.title}</h2>
                        <p className="text-background/70 mb-6 max-w-xl">{featuredPost.excerpt}</p>
                        <div className="flex items-center gap-6 text-background/60 text-sm">
                          <span className="flex items-center gap-2"><User size={16} /><AuthorName name={featuredPost.author_name} /></span>
                          <span className="flex items-center gap-2"><Calendar size={16} />{formatDate(featuredPost.published_at)}</span>
                          <span className="flex items-center gap-2"><Clock size={16} />{estimateReadTime(featuredPost.content)}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="py-12">
              <div className="container-wide">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail size={20} className="text-primary" />
                      <h3 className="font-display font-bold text-lg">Restez informé</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Recevez nos meilleurs articles et guides directement dans votre boîte mail.</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input placeholder="votre@email.com" className="rounded-full h-11 min-w-[200px]" />
                    <Button className="rounded-full h-11 shrink-0">S'abonner</Button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Blog Grid */}
            {gridPosts.length > 0 && (
              <section className="section-padding pt-0">
                <div className="container-wide">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((post, index) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 cursor-pointer">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img src={post.cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">{post.category}</span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(post.published_at)}</span>
                              <span className="flex items-center gap-1"><Clock size={12} />{estimateReadTime(post.content)}</span>
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
