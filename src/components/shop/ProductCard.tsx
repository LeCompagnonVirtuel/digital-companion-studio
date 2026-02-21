import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Zap, Award, Clock, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DigitalProduct } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";

interface ProductCardProps {
  product: DigitalProduct;
  index?: number;
}

const badgeConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  bestseller: { 
    icon: Award, 
    className: "bg-amber-500 text-white border-0 shadow-sm",
    label: "Best Seller"
  },
  new: { 
    icon: Sparkles, 
    className: "bg-emerald-500 text-white border-0 shadow-sm",
    label: "Nouveau"
  },
  limited: { 
    icon: Clock, 
    className: "bg-rose-500 text-white border-0 shadow-sm",
    label: "Offre Limitée"
  },
  promo: { 
    icon: Zap, 
    className: "bg-primary text-primary-foreground border-0 shadow-sm",
    label: "Promo"
  },
};

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const { formatPrice } = useCurrency();
  const inCart = isInCart(product.id);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group"
    >
      <div className="relative overflow-hidden h-full flex flex-col rounded-2xl bg-card border border-border/40 transition-all duration-500 hover:border-primary/20 hover:shadow-[var(--shadow-elevated)]">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.featured_image ? (
            <img
              src={product.featured_image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
              <Sparkles className="w-10 h-10 text-muted-foreground/20" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Mobile tap area */}
          <Link 
            to={`/boutique/${product.slug}`}
            className="absolute inset-0 z-10 sm:hidden"
            aria-label={`Voir ${product.title}`}
          />
          
          {/* Desktop hover actions */}
          <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-3 gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-10">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/95 backdrop-blur-sm hover:bg-background h-9 text-xs rounded-lg shadow-lg"
            >
              <Link to={`/boutique/${product.slug}`}>
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Voir
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={() => addItem(product)}
              disabled={inCart}
              className="flex-1 h-9 text-xs rounded-lg shadow-lg"
            >
              {inCart ? (
                <><Check className="w-3.5 h-3.5 mr-1.5" /> Ajouté</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Ajouter</>
              )}
            </Button>
          </div>

          {/* Badge */}
          {badge && badgeConfig[badge] && (
            <div className="absolute top-2.5 left-2.5 z-20">
              <Badge className={`${badgeConfig[badge].className} text-[10px] sm:text-xs px-2 py-0.5 rounded-lg`}>
                {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-1" />}
                {badgeConfig[badge].label}
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <Badge className="bg-rose-500 text-white border-0 text-xs px-2 py-0.5 rounded-lg font-bold shadow-sm">
                -{discountPercent}%
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-5 flex flex-col flex-1">
          {/* Category */}
          <span className="text-[10px] sm:text-xs font-medium text-primary/70 uppercase tracking-wider mb-1.5">
            {product.category}
          </span>

          {/* Title */}
          <Link to={`/boutique/${product.slug}`} className="group/title">
            <h3 className="font-display font-semibold text-sm sm:text-base mb-1.5 line-clamp-2 group-hover/title:text-primary transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short Description - desktop only */}
          {product.short_description && (
            <p className="hidden sm:block text-xs text-muted-foreground mb-3 line-clamp-2 flex-1 leading-relaxed">
              {product.short_description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3 mt-auto">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < 5 ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground ml-0.5">
              ({product.sales_count || 0})
            </span>
          </div>

          {/* Price + Mobile CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40 gap-2">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-foreground leading-tight">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                  {formatPrice(product.original_price!)}
                </span>
              )}
            </div>
            
            {/* Mobile Add to Cart */}
            <Button
              size="sm"
              variant={inCart ? "secondary" : "default"}
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              disabled={inCart}
              className="sm:hidden h-8 w-8 p-0 rounded-lg"
            >
              {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
