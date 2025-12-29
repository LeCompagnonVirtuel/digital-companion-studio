import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const blogPosts = [
  {
    slug: "tendances-marketing-digital-2024",
    title: "Les tendances du marketing digital en 2024",
    excerpt: "Découvrez les stratégies incontournables pour rester compétitif dans un paysage digital en constante évolution.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "Marketing",
    author: "Équipe CV",
    date: "15 Mars 2024",
    readTime: "5 min",
  },
  {
    slug: "automatisation-ia-pme",
    title: "Comment l'IA transforme les PME",
    excerpt: "L'intelligence artificielle n'est plus réservée aux grandes entreprises. Voici comment en tirer parti.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    category: "Automatisation",
    author: "Équipe CV",
    date: "10 Mars 2024",
    readTime: "7 min",
  },
  {
    slug: "seo-local-guide-complet",
    title: "Guide complet du SEO local en 2024",
    excerpt: "Optimisez votre présence locale pour attirer des clients à proximité. Stratégies concrètes et actions immédiates.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop",
    category: "SEO",
    author: "Équipe CV",
    date: "5 Mars 2024",
    readTime: "8 min",
  },
  {
    slug: "ecommerce-conversion-secrets",
    title: "Les secrets d'un e-commerce qui convertit",
    excerpt: "UX, copywriting, tunnel de vente : les leviers pour transformer vos visiteurs en clients fidèles.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    category: "E-commerce",
    author: "Équipe CV",
    date: "28 Février 2024",
    readTime: "6 min",
  },
  {
    slug: "branding-startup-guide",
    title: "Créer une identité de marque mémorable",
    excerpt: "De la stratégie de marque au design : comment se démarquer dans un marché saturé.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    category: "Branding",
    author: "Équipe CV",
    date: "20 Février 2024",
    readTime: "5 min",
  },
  {
    slug: "chatbot-service-client",
    title: "Chatbot : révolutionner votre service client",
    excerpt: "Disponibilité 24/7, réponses instantanées : comment un chatbot peut transformer l'expérience client.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop",
    category: "Automatisation",
    author: "Équipe CV",
    date: "15 Février 2024",
    readTime: "6 min",
  },
];

const Blog = () => {
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

        {/* Featured Post */}
        <section className="section-padding pt-0 -mt-8">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-background mb-4 max-w-2xl">
                  {blogPosts[0].title}
                </h2>
                <p className="text-background/70 mb-6 max-w-xl">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-6 text-background/60 text-sm">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {blogPosts[0].readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding pt-0">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
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
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
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

export default Blog;
