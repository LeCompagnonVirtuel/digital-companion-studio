import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Trash2, ArrowRight, Package, Sparkles, Shield, Zap,
  CheckCircle, Plus, X, Gift, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { useDigitalProducts, DigitalProduct } from "@/hooks/useDigitalProducts";
import { Progress } from "@/components/ui/progress";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F`;

const FREE_SHIPPING_THRESHOLD = 50000;

interface CartDrawerProps {
  children: React.ReactNode;
}

const CrossSellItem = ({ product, onAdd }: { product: DigitalProduct; onAdd: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2.5 p-2 rounded-xl border border-border/30 bg-muted/20 hover:border-primary/15 transition-all duration-200"
  >
    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
      {product.featured_image ? (
        <img src={product.featured_image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Package className="w-3.5 h-3.5 text-muted-foreground/30" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-medium line-clamp-1 leading-tight">{product.title}</p>
      <p className="text-[11px] font-bold text-primary mt-0.5">{formatFCFA(product.price)}</p>
    </div>
    <Button
      size="sm"
      variant="outline"
      className="h-7 px-2 text-[10px] rounded-lg shrink-0 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
      onClick={onAdd}
    >
      <Plus className="w-3 h-3" />
    </Button>
  </motion.div>
);

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, removeItem, addItem, total, itemCount, isLoading, isInCart } = useCart();
  const { data: allProducts } = useDigitalProducts();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const crossSellProducts = allProducts
    ?.filter(p => !isInCart(p.id) && p.status === "published")
    .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
    .slice(0, 2) || [];

  const progressPercent = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  const handleAddCrossSell = (product: DigitalProduct) => {
    addItem(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 2000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full max-w-[90vw] sm:max-w-md flex flex-col p-0 gap-0 border-border/30">
        {/* Header */}
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              Votre Panier
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Badge variant="secondary" className="text-[10px] rounded-full px-2">
                    {itemCount}
                  </Badge>
                </motion.div>
              )}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Progress bar */}
        {items.length > 0 && (
          <div className="px-4 sm:px-5 pb-3">
            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/20">
              {remaining > 0 ? (
                <>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Gift className="w-3 h-3 text-primary shrink-0" />
                    <p className="text-[10px] text-muted-foreground">
                      Plus que <span className="font-bold text-foreground">{formatFCFA(remaining)}</span> pour un bonus !
                    </p>
                  </div>
                  <Progress value={progressPercent} className="h-1" />
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </motion.div>
                  <p className="text-[10px] font-medium text-emerald-600">🎉 Bonus exclusif débloqué !</p>
                </div>
              )}
            </div>
          </div>
        )}

        <Separator className="opacity-50" />

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 overscroll-contain">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-3"
              >
                <Package className="w-8 h-8 text-muted-foreground/20" />
              </motion.div>
              <h3 className="font-semibold text-base mb-1">Votre panier est vide</h3>
              <p className="text-xs text-muted-foreground mb-5">Découvrez nos produits premium</p>
              <Button asChild className="rounded-xl text-sm h-10">
                <Link to="/boutique">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Explorer la boutique
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="flex gap-2.5 p-2.5 hover:bg-muted/20 rounded-xl transition-colors duration-200 group/item"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted/50 shrink-0 relative">
                      {item.product.featured_image ? (
                        <img src={item.product.featured_image} alt={item.product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground/30" />
                        </div>
                      )}
                      {item.quantity > 1 && (
                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[9px] font-bold">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/boutique/${item.product.slug}`}
                        className="font-medium text-xs sm:text-sm hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-[9px] text-muted-foreground/70 mt-0.5 uppercase tracking-wider">
                        {item.product.category}
                      </p>
                      <p className="font-bold text-xs sm:text-sm text-primary mt-1">
                        {formatFCFA(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <motion.div whileTap={{ scale: 0.85 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-7 w-7 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/8 rounded-lg opacity-0 group-hover/item:opacity-100 transition-all duration-200"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Cross-sell */}
              {crossSellProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-3"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-3 h-3 text-primary" />
                    <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Complétez votre commande
                    </h4>
                  </div>
                  <div className="space-y-1.5">
                    {crossSellProducts.map((product) => (
                      <CrossSellItem key={product.id} product={product} onAdd={() => handleAddCrossSell(product)} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-t border-border/30 bg-card/80 backdrop-blur-sm px-4 sm:px-5 py-4 space-y-3"
          >
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> Sécurisé</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Instantané</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> Garantie 30j</span>
            </div>

            {/* Total */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Sous-total ({itemCount} article{itemCount > 1 ? "s" : ""})</span>
                <span>{formatFCFA(total)}</span>
              </div>
              <div className="flex items-center justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-primary"
                >
                  {formatFCFA(total)}
                </motion.span>
              </div>
            </div>

            <Button asChild className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-semibold" size="lg">
              <Link to="/boutique/checkout">
                Passer commande
                <motion.span
                  className="inline-flex ml-1.5"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full h-9 rounded-xl text-xs text-muted-foreground" size="sm">
              <Link to="/boutique">Continuer mes achats</Link>
            </Button>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
};
