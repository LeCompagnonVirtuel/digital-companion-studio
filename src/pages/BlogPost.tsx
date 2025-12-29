import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2, Eye, Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { useBlogPosts, BlogPost as BlogPostType } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPostBySlug, incrementViews, posts } = useBlogPosts(false);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      const fetchedPost = await getPostBySlug(slug);
      
      if (fetchedPost && fetchedPost.status === 'published') {
        setPost(fetchedPost);
        // Increment views
        incrementViews(fetchedPost.id);
      } else {
        setPost(null);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Lien copié !" });
    }
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = posts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container-wide flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center py-20">
            <h1 className="text-3xl font-display font-bold mb-4">Article introuvable</h1>
            <p className="text-muted-foreground mb-8">L'article que vous recherchez n'existe pas ou n'est plus disponible.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                Retour au blog
              </Link>
              
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 max-w-4xl">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-lg text-muted-foreground max-w-3xl mb-8">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author_name}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {estimateReadTime(post.content)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={16} />
                  {post.views} vues
                </span>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 size={16} className="mr-2" />
                  Partager
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cover Image */}
        {post.cover_image && (
          <section className="pb-12">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl overflow-hidden"
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />
              </motion.div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding pt-0">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content?.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-foreground/80 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-secondary/30">
            <div className="container-wide">
              <h2 className="text-2xl font-display font-bold mb-8">Articles similaires</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={relatedPost.cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatDate(relatedPost.published_at)}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
