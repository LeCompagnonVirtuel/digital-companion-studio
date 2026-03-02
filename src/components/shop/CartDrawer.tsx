import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Trash2, ArrowRight, Package, Sparkles, Shield, Zap,
  CheckCircle, Plus, Minus, X, Gift, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { useDigitalProducts, DigitalProduct } from "@/hooks/useDigitalProducts";
import { Progress } from "@/components/ui/progress";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F CFA`;

const FREE_SHIPPING_THRESHOLD = 50000;

interface CartDrawerProps {
  children: React.ReactNode;
}

const CrossSellItem = ({ product, onAdd }: { product: DigitalProduct; onAdd: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 p-2.5 rounded-xl border border-border/40 bg-card hover:border-primary/20 transition-all group/cs"
  >
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
      {product.featured_image ? (
        <img src={product.featured_image} alt={product.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Package className="w-4 h-4 text-muted-foreground/40" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium line-clamp-1">{product.title}</p>
      <p className="text-xs font-bold text-primary mt-0.5">{formatFCFA(product.price)}</p>
    </div>
    <Button
      size="sm"
      variant="outline"
      className="h-7 px-2.5 text-[10px] rounded-lg shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
      onClick={onAdd}
    >
      <Plus className="w-3 h-3 mr-1" />
      Ajouter
    </Button>
  </motion.div>
);

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, removeItem, addItem, total, itemCount, isLoading, isInCart } = useCart();
  const { data: allProducts } = useDigitalProducts();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Cross-sell: products from same categories not in cart
  const crossSellProducts = allProducts
    ?.filter(p => !isInCart(p.id) && p.status === "published")
    .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
    .slice(0, 3) || [];

  const progressPercent = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  const handleAddCrossSell = (product: DigitalProduct) => {
    addItem(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 2000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full max-w-[92vw] sm:max-w-lg flex flex-col p-0 gap-0">
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2.5 text-lg">
              <motion.div
                className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="w-4.5 h-4.5 text-primary" />
              </motion.div>
              Votre Panier
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Badge variant="secondary" className="ml-1 text-xs rounded-full px-2.5">
                    {itemCount} article{itemCount > 1 ? "s" : ""}
                  </Badge>
                </motion.div>
              )}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Progress bar to bonus */}
        {items.length > 0 && (
          <div className="px-5 pb-4">
            <div className="p-3 rounded-xl bg-muted/40 border border-border/30">
              {remaining > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-3.5 h-3.5 text-primary" />
                    <p className="text-[11px] text-muted-foreground">
                      Plus que <span className="font-bold text-foreground">{formatFCFA(remaining)}</span> pour un bonus exclusif !
                    </p>
                  </div>
                  <Progress value={progressPercent} className="h-1.5" />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                  <p className="text-[11px] font-medium text-emerald-600">
                    🎉 Bonus exclusif débloqué !
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <Separator />

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-7 h-7 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4"
              >
                <Package className="w-10 h-10 text-muted-foreground/30" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">Votre panier est vide</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Découvrez nos produits digitaux premium
              </p>
              <Button asChild className="rounded-xl">
                <Link to="/boutique">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explorer la boutique
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.9, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="flex gap-3 p-3 hover:bg-muted/30 rounded-xl transition-all group/item"
                  >
                    <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden bg-muted shrink-0 relative">
                      {item.product.featured_image ? (
                        <img
                          src={item.product.featured_image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground/40" />
                        </div>
                      )}
                      {/* Quantity badge overlay */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/boutique/${item.product.slug}`}
                        className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-sm text-primary">
                          {formatFCFA(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-60 group-hover/item:opacity-100 transition-opacity"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Complétez votre commande
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {crossSellProducts.map((product) => (
                      <CrossSellItem
                        key={product.id}
                        product={product}
                        onAdd={() => handleAddCrossSell(product)}
                      />
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-t bg-card px-5 py-5 space-y-4"
          >
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Accès instantané</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> Garantie 30j</span>
            </div>

            {/* Subtotal & Total */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Sous-total ({itemCount} article{itemCount > 1 ? "s" : ""})</span>
                <span>{formatFCFA(total)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1 }}
                  className="text-primary"
                >
                  {formatFCFA(total)}
                </motion.span>
              </div>
            </div>

            <Button asChild className="w-full h-12 rounded-xl text-base font-semibold group/cta" size="lg">
              <Link to="/boutique/checkout">
                Passer commande
                <motion.span
                  className="inline-flex ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full h-10 rounded-xl text-sm" size="sm">
              <Link to="/boutique">
                Continuer mes achats
              </Link>
            </Button>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
};
