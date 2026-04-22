import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrolled > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 z-50"
        >
          {/* Progress ring */}
          <div className="relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="fill-none stroke-muted/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
              />
              <motion.path
                className="fill-none stroke-primary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - scrollProgress }}
                transition={{ duration: 0.1 }}
              />
            </svg>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="absolute inset-0 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              aria-label="Retour en haut"
            >
              <ArrowUp size={16} className="text-primary" />
            </Button>
          </div>

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <Zap size={10} className="inline mr-1 text-primary" />
            Progression: {Math.round(scrollProgress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}