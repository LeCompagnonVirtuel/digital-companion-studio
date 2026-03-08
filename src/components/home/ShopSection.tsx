import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag, BookOpen, FileText, Download, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useDigitalProducts } from '@/hooks/useDigitalProducts';
import { OptimizedImage } from '@/components/ui/optimized-image';

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
      <div className="absolute top-1/4 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-wide relative px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <Badge className="badge-premium mb-4 sm:mb-6 text-xs sm:text-sm">
            <ShoppingBag size={12} className="sm:w-3.5 sm:h-3.5" />
            Boutique Digitale
          </Badge>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            Des ressources premium pour{' '}
            <span className="gradient-text">booster votre business</span>
          </h2>
          <p className="section-subtitle text-sm sm:text-base mt-3 sm:mt-4">
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/boutique?category=${category.label.toLowerCase()}`}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors shrink-0">
                    <category.icon size={20} className="sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{category.description}</p>
                  </div>
                  <ArrowRight size={18} className="hidden sm:block text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12"
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
                  className="group block bg-card rounded-xl sm:rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500"
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
                        <ShoppingBag size={36} className="sm:w-12 sm:h-12 text-primary/30" />
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
                      {product.is_bestseller && (
                        <Badge className="bg-gold text-gold-foreground shadow-lg text-[10px] sm:text-xs">
                          <Star size={10} className="sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          Best Seller
                        </Badge>
                      )}
                      {product.is_new && (
                        <Badge className="bg-accent text-accent-foreground text-[10px] sm:text-xs">Nouveau</Badge>
                      )}
                      {product.is_limited_offer && (
                        <Badge variant="destructive" className="text-[10px] sm:text-xs">Offre limitée</Badge>
                      )}
                    </div>
                    {/* Price badge */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                      <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-card/90 backdrop-blur-sm shadow-lg">
                        <span className="font-bold text-sm sm:text-base text-primary">{Math.round(product.price).toLocaleString("fr-FR")} F CFA</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-xs sm:text-sm text-muted-foreground line-through ml-1 sm:ml-2">
                            {Math.round(product.original_price).toLocaleString("fr-FR")} F CFA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4">
                      {product.short_description || product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Download size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>Accès immédiat</span>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <TrendingUp size={20} className="sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm sm:text-base">Découvrez toute notre boutique</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Formations, templates et ressources pro</p>
              </div>
            </div>
            <Button variant="hero" size="default" asChild className="w-full sm:w-auto h-10 sm:h-11">
              <Link to="/boutique" className="group">
                <ShoppingBag size={16} className="mr-2" />
                Accéder à la boutique
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
