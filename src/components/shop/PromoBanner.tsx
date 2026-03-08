import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";

export const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden mt-20 sm:mt-24"
        style={{ background: "linear-gradient(135deg, hsl(234 89% 50%), hsl(234 89% 40%), hsl(174 77% 35%))" }}
      >
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container-wide relative py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-white">
            {/* Left: Message */}
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 animate-pulse" />
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-wide">
                  OFFRE LIMITÉE AUJOURD'HUI
                </p>
                <p className="text-[10px] sm:text-xs text-white/80 font-medium">
                  Profitez de <span className="text-amber-300 font-bold">-30%</span> sur nos ressources premium
                </p>
              </div>
            </div>

            {/* Center: Timer */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-white/60 font-medium hidden sm:block">Se termine dans</span>
              <CountdownTimer variant="banner" />
            </div>

            {/* Right: CTA */}
            <Button
              asChild
              size="sm"
              className="bg-white text-primary hover:bg-white/90 rounded-full h-8 sm:h-9 px-4 text-xs sm:text-sm font-bold shadow-lg"
            >
              <Link to="/boutique#produits">
                Voir les offres
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
