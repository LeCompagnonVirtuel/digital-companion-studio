import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, removeItem, total, itemCount, isLoading } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Votre Panier
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {itemCount} article{itemCount > 1 ? "s" : ""}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Votre panier est vide</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Découvrez nos produits digitaux et commencez vos achats
              </p>
              <Button asChild>
                <Link to="/boutique">
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
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    {item.product.featured_image ? (
                      <img
                        src={item.product.featured_image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/boutique/${item.product.slug}`}
                      className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.product.category}
                    </p>
                    <p className="font-semibold mt-2">
                      {item.product.price.toFixed(2)}€
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <>
            <Separator />
            <div className="pt-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>

              {/* Checkout Button */}
              <Button asChild className="w-full" size="lg">
                <Link to="/boutique/checkout">
                  Passer commande
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              {/* Continue Shopping */}
              <Button asChild variant="outline" className="w-full">
                <Link to="/boutique">
                  Continuer mes achats
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
