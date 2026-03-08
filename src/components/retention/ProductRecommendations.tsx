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

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F`;

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

  let products: DigitalProduct[] = [];
  
  switch (variant) {
    case 'upsell':
      products = allProducts
        .filter(p => p.id !== currentProductId)
        .sort((a, b) => b.price - a.price)
        .slice(0, maxProducts);
      break;
    case 'cross-sell':
      products = allProducts
        .filter(p => p.id !== currentProductId && p.category === currentCategory)
        .slice(0, maxProducts);
      if (products.length < maxProducts) {
        const others = allProducts
          .filter(p => p.id !== currentProductId && p.category !== currentCategory)
          .slice(0, maxProducts - products.length);
        products = [...products, ...others];
      }
      break;
    case 'popular':
      products = allProducts
        .filter(p => p.id !== currentProductId && (p.is_bestseller || p.is_featured || (p.sales_count || 0) > 0))
        .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
        .slice(0, maxProducts);
      break;
    default:
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
    <section className="py-10 sm:py-14">
      <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
        <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
          <config.icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <Badge variant="secondary" className="text-[10px] mb-0.5">{config.label}</Badge>
          <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {products.map((product, index) => {
          const hasDiscount = product.original_price && product.original_price > product.price;
          const discountPercent = hasDiscount
            ? Math.round((1 - product.price / product.original_price!) * 100)
            : 0;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={`/boutique/${product.slug}`}
                className="group block bg-card rounded-2xl border border-border/40 overflow-hidden hover:border-primary/20 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-muted/50 overflow-hidden">
                  {product.featured_image ? (
                    <img
                      src={product.featured_image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground/15" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent pointer-events-none" />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {product.is_bestseller && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[9px] px-1.5 py-0.5 shadow-md">Best Seller</Badge>
                    )}
                    {product.is_new && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-[9px] px-1.5 py-0.5 shadow-md">Nouveau</Badge>
                    )}
                  </div>
                  {hasDiscount && (
                    <Badge className="absolute top-2 right-2 bg-rose-500 text-white border-0 text-[10px] px-1.5 py-0.5 shadow-md font-bold">
                      -{discountPercent}%
                    </Badge>
                  )}
                </div>

                <div className="p-3 sm:p-3.5">
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold mb-0.5">{product.category}</p>
                  <h4 className="font-semibold text-[13px] sm:text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-foreground">{formatFCFA(product.price)}</span>
                      {hasDiscount && (
                        <span className="text-[10px] text-muted-foreground/60 line-through">
                          {formatFCFA(product.original_price!)}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6 sm:mt-8">
        <Button variant="outline" asChild className="rounded-xl text-sm">
          <Link to="/boutique">
            Voir tous les produits
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
