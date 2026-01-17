import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag, BookOpen, FileText, Download, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useDigitalProducts } from '@/hooks/useDigitalProducts';

const categories = [
  { icon: BookOpen, label: 'Formations', description: 'Développez vos compétences' },
  { icon: FileText, label: 'Templates', description: 'Prêts à l\'emploi' },
  { icon: Download, label: 'Ressources', description: 'Guides & outils' },
];

export function ShopSection() {
  const { data: products, isLoading } = useDigitalProducts({ featured: true, limit: 3 });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="badge-premium mb-6">
            <ShoppingBag size={14} />
            Boutique Digitale
          </Badge>
          <h2 className="section-title">
            Des ressources premium pour{' '}
            <span className="gradient-text">booster votre business</span>
          </h2>
          <p className="section-subtitle">
            Formations, templates et outils professionnels créés par nos experts 
            pour vous aider à réussir dans le digital
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/boutique?category=${category.label.toLowerCase()}`}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <category.icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <ArrowRight size={20} className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Featured Products */}
        {!isLoading && products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={`/boutique/${product.slug}`}
                  className="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    {product.featured_image ? (
                      <img
                        src={product.featured_image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <ShoppingBag size={48} className="text-primary/30" />
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {product.is_bestseller && (
                        <Badge className="bg-gold text-gold-foreground shadow-lg">
                          <Star size={12} className="mr-1" />
                          Best Seller
                        </Badge>
                      )}
                      {product.is_new && (
                        <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>
                      )}
                      {product.is_limited_offer && (
                        <Badge variant="destructive">Offre limitée</Badge>
                      )}
                    </div>
                    {/* Price badge */}
                    <div className="absolute bottom-3 right-3">
                      <div className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm shadow-lg">
                        <span className="font-bold text-primary">{product.price}€</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {product.original_price}€
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.short_description || product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Download size={14} />
                        <span>Accès immédiat</span>
                      </div>
                      <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp size={24} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Découvrez toute notre boutique</p>
                <p className="text-sm text-muted-foreground">Formations, templates et ressources pro</p>
              </div>
            </div>
            <Button variant="hero" size="lg" asChild>
              <Link to="/boutique" className="group">
                <ShoppingBag size={18} className="mr-2" />
                Accéder à la boutique
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
