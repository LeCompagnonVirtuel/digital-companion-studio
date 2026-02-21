import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Package, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, removeItem, total, itemCount, isLoading } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full max-w-[90vw] sm:max-w-lg flex flex-col p-0">
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2.5 text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              Votre Panier
              {itemCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs rounded-full">
                  {itemCount}
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-7 h-7 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                <Package className="w-10 h-10 text-muted-foreground/30" />
              </div>
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
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="flex gap-3 p-3 hover:bg-muted/30 rounded-xl transition-colors mb-2"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-muted shrink-0">
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
                  </div>

                  {/* Product Info */}
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
                    <p className="font-bold text-sm mt-1.5">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-muted/20 px-5 py-5 space-y-4">
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Accès instantané</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <Button asChild className="w-full h-12 rounded-xl text-base font-semibold" size="lg">
              <Link to="/boutique/checkout">
                Passer commande
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            {/* Continue Shopping */}
            <Button asChild variant="ghost" className="w-full h-10 rounded-xl text-sm" size="sm">
              <Link to="/boutique">
                Continuer mes achats
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
