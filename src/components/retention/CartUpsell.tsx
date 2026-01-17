import { motion } from 'framer-motion';
import { Plus, Zap, Gift, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDigitalProducts } from '@/hooks/useDigitalProducts';
import { useCart } from '@/hooks/useCart';

interface CartUpsellProps {
  cartProductIds: string[];
  cartTotal: number;
}

export function CartUpsell({ cartProductIds, cartTotal }: CartUpsellProps) {
  const { data: allProducts } = useDigitalProducts({ limit: 10 });
  const { addItem } = useCart();

  if (!allProducts?.length) return null;

  // Find products not in cart, prioritize complementary items
  const suggestions = allProducts
    .filter(p => !cartProductIds.includes(p.id))
    .sort((a, b) => {
      // Prioritize bestsellers and featured
      const aScore = (a.is_bestseller ? 2 : 0) + (a.is_featured ? 1 : 0);
      const bScore = (b.is_bestseller ? 2 : 0) + (b.is_featured ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 2);

  if (!suggestions.length) return null;

  // Calculate potential savings for bundle
  const bundleDiscount = cartTotal >= 100 ? 0.1 : cartTotal >= 50 ? 0.05 : 0;
  const showBundleOffer = bundleDiscount > 0;

  return (
    <div className="space-y-4">
      {/* Bundle offer */}
      {showBundleOffer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Gift size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Offre spéciale</p>
              <p className="text-xs text-muted-foreground">
                Ajoutez un produit et économisez {bundleDiscount * 100}% sur votre commande
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Product suggestions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <TrendingUp size={14} />
          <span>Complétez votre commande</span>
        </div>

        {suggestions.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            {/* Image */}
            <div className="w-12 h-12 rounded-lg bg-background overflow-hidden shrink-0">
              {product.featured_image ? (
                <img
                  src={product.featured_image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Zap size={20} className="text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{product.title}</p>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>

            {/* Price & Add */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{product.price}€</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => addItem(product)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
