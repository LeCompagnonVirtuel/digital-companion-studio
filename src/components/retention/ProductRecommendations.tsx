import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Sparkles, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useDigitalProducts, DigitalProduct } from '@/hooks/useDigitalProducts';

interface ProductRecommendationsProps {
  currentProductId?: string;
  currentCategory?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'upsell' | 'cross-sell' | 'popular';
  maxProducts?: number;
}

export function ProductRecommendations({
  currentProductId,
  currentCategory,
  title = 'Vous pourriez aussi aimer',
  subtitle,
  variant = 'default',
  maxProducts = 3,
}: ProductRecommendationsProps) {
  const { data: allProducts, isLoading } = useDigitalProducts({ limit: 20 });

  if (isLoading || !allProducts?.length) return null;

  // Filter and sort products based on variant
  let products: DigitalProduct[] = [];
  
  switch (variant) {
    case 'upsell':
      // Show premium/higher-priced products
      products = allProducts
        .filter(p => p.id !== currentProductId)
        .sort((a, b) => b.price - a.price)
        .slice(0, maxProducts);
      break;
    case 'cross-sell':
      // Show products from same category
      products = allProducts
        .filter(p => p.id !== currentProductId && p.category === currentCategory)
        .slice(0, maxProducts);
      // Fill with other products if not enough
      if (products.length < maxProducts) {
        const others = allProducts
          .filter(p => p.id !== currentProductId && p.category !== currentCategory)
          .slice(0, maxProducts - products.length);
        products = [...products, ...others];
      }
      break;
    case 'popular':
      // Show bestsellers and featured
      products = allProducts
        .filter(p => p.id !== currentProductId && (p.is_bestseller || p.is_featured))
        .slice(0, maxProducts);
      break;
    default:
      // Random selection
      products = allProducts
        .filter(p => p.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, maxProducts);
  }

  if (!products.length) return null;

  const variantConfig = {
    default: { icon: Sparkles, label: 'Recommandé pour vous' },
    upsell: { icon: TrendingUp, label: 'Version premium' },
    'cross-sell': { icon: Package, label: 'Complétez votre achat' },
    popular: { icon: Star, label: 'Les plus populaires' },
  };

  const config = variantConfig[variant];

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <config.icon size={20} className="text-primary" />
        </div>
        <div>
          <Badge variant="secondary" className="mb-1">{config.label}</Badge>
          <h3 className="text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/boutique/${product.slug}`}
              className="group block bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {product.featured_image ? (
                  <img
                    src={product.featured_image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={48} className="text-muted-foreground/30" />
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {product.is_bestseller && (
                    <Badge className="bg-gold text-gold-foreground">Best Seller</Badge>
                  )}
                  {product.is_new && (
                    <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>
                  )}
                  {product.original_price && product.original_price > product.price && (
                    <Badge variant="destructive">
                      -{Math.round((1 - product.price / product.original_price) * 100)}%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">{product.price}€</span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.original_price}€
                      </span>
                    )}
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link to="/boutique">
            Voir tous les produits
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
