import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "./CartDrawer";
import { useLocation } from "react-router-dom";

export const FloatingCartButton = () => {
  const { itemCount } = useCart();
  const location = useLocation();

  // Only show on mobile, hide on shop checkout/confirmation and admin pages
  const hiddenPaths = ["/boutique/checkout", "/boutique/confirmation", "/admin"];
  const isHidden = hiddenPaths.some(p => location.pathname.startsWith(p));

  if (isHidden || itemCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-3 sm:right-4 z-40 md:hidden">
      <CartDrawer>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label={`Panier (${itemCount} articles)`}
        >
          <ShoppingBag className="w-5 h-5" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </CartDrawer>
    </div>
  );
};
