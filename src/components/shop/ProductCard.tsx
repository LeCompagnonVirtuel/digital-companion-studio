import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Zap, Award, Clock, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DigitalProduct } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";
import { useState, useCallback } from "react";

interface ProductCardProps {
  product: DigitalProduct;
  index?: number;
}

const badgeConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  bestseller: {
    icon: Award,
    className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md",
    label: "Best Seller"
  },
  new: {
    icon: Sparkles,
    className: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-md",
    label: "Nouveau"
  },
  limited: {
    icon: Clock,
    className: "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-md",
    label: "Offre Limitée"
  },
  promo: {
    icon: Zap,
    className: "bg-primary text-primary-foreground border-0 shadow-md",
    label: "Promo"
  },
};

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F`;

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 600);
  }, [addItem, product, inCart]);

  const getBadge = () => {
    if (product.is_bestseller) return "bestseller";
    if (product.is_new) return "new";
    if (product.is_limited_offer) return "limited";
    if (product.original_price && product.original_price > product.price) return "promo";
    if (product.badge) return product.badge;
    return null;
  };

  const badge = getBadge();
  const BadgeIcon = badge ? badgeConfig[badge]?.icon : null;
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price!) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border/40 transition-all duration-300 hover:border-primary/20 hover:shadow-[var(--shadow-card)] active:scale-[0.98]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
          <Link to={`/boutique/${product.slug}`} className="absolute inset-0 z-10" aria-label={`Voir ${product.title}`} />

          {product.featured_image ? (
            <img
              src={product.featured_image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04), hsl(var(--accent) / 0.04))' }}>
              <Sparkles className="w-8 h-8 text-muted-foreground/15" />
            </div>
          )}

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent pointer-events-none" />

          {/* Desktop hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 hidden sm:block pointer-events-none" />

          {/* Desktop hover actions */}
          <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-2.5 gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/95 backdrop-blur-md hover:bg-background h-8 text-[11px] rounded-lg shadow-lg"
            >
              <Link to={`/boutique/${product.slug}`}>
                <Eye className="w-3 h-3 mr-1" />
                Voir
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={inCart}
              className="flex-1 h-8 text-[11px] rounded-lg shadow-lg"
            >
              {inCart ? (
                <><Check className="w-3 h-3 mr-1" /> Ajouté</>
              ) : (
                <><ShoppingCart className="w-3 h-3 mr-1" /> Ajouter</>
              )}
            </Button>
          </div>

          {/* Badges */}
          {badge && badgeConfig[badge] && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.03 }}
              className="absolute top-2 left-2 z-20"
            >
              <Badge className={`${badgeConfig[badge].className} text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md`}>
                {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />}
                {badgeConfig[badge].label}
              </Badge>
            </motion.div>
          )}

          {hasDiscount && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.03 }}
              className="absolute top-2 right-2 z-20"
            >
              <Badge className="bg-rose-500 text-white border-0 text-[10px] px-1.5 py-0.5 rounded-md font-bold shadow-md">
                -{discountPercent}%
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1">
          <span className="text-[9px] sm:text-[10px] font-semibold text-primary/60 uppercase tracking-widest mb-1">
            {product.category}
          </span>

          <Link to={`/boutique/${product.slug}`} className="group/title">
            <h3 className="font-display font-semibold text-[13px] sm:text-sm mb-1 line-clamp-2 group-hover/title:text-primary transition-colors duration-200 leading-snug">
              {product.title}
            </h3>
          </Link>

          {product.short_description && (
            <p className="hidden sm:block text-[11px] text-muted-foreground mb-2.5 line-clamp-2 flex-1 leading-relaxed">
              {product.short_description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-2.5 mt-auto">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[9px] sm:text-[10px] text-muted-foreground ml-1">
              ({product.sales_count || 0})
            </span>
          </div>

          {/* Price + Mobile CTA */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border/30 gap-1.5">
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] sm:text-sm font-bold text-foreground leading-tight truncate">
                {formatFCFA(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-[9px] sm:text-[10px] text-muted-foreground/70 line-through">
                  {formatFCFA(product.original_price!)}
                </span>
              )}
            </div>

            <motion.div
              whileTap={{ scale: 0.85 }}
              className="sm:hidden"
            >
              <Button
                size="sm"
                variant={inCart ? "secondary" : "default"}
                onClick={handleAdd}
                disabled={inCart}
                className="h-8 w-8 p-0 rounded-lg shrink-0"
              >
                {isAdding ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                ) : inCart ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ShoppingCart className="w-3.5 h-3.5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
