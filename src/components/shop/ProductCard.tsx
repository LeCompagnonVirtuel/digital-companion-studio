import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Zap, Award, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DigitalProduct } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: DigitalProduct;
  index?: number;
}

const badgeConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  bestseller: { 
    icon: Award, 
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    label: "Best Seller"
  },
  new: { 
    icon: Sparkles, 
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    label: "Nouveau"
  },
  limited: { 
    icon: Clock, 
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    label: "Offre Limitée"
  },
  promo: { 
    icon: Zap, 
    className: "bg-primary/10 text-primary border-primary/20",
    label: "Promo"
  },
};

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-premium overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.featured_image ? (
            <img
              src={product.featured_image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
              <Sparkles className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-background"
              >
                <Link to={`/boutique/${product.slug}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Voir
                </Link>
              </Button>
              <Button
                size="sm"
                onClick={() => addItem(product)}
                disabled={inCart}
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {inCart ? "Ajouté" : "Ajouter"}
              </Button>
            </div>
          </div>

          {/* Badge */}
          {badge && badgeConfig[badge] && (
            <div className="absolute top-3 left-3">
              <Badge className={`${badgeConfig[badge].className} border backdrop-blur-sm`}>
                {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-1" />}
                {badgeConfig[badge].label}
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-rose-500 text-white border-0">
                -{discountPercent}%
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category */}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {product.category}
          </span>

          {/* Title */}
          <Link 
            to={`/boutique/${product.slug}`}
            className="group/title"
          >
            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover/title:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {product.short_description}
            </p>
          )}

          {/* Rating (placeholder - could be dynamic) */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 5 ? "text-amber-400 fill-amber-400" : "text-muted"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.sales_count || 0} ventes)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {product.price.toFixed(2)}€
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.original_price?.toFixed(2)}€
                </span>
              )}
            </div>
            
            {product.file_format && (
              <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                {product.file_format}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
