import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Users } from "lucide-react";

interface SocialProofBadgeProps {
  salesCount?: number;
  variant?: "viewers" | "sales";
  className?: string;
}

export const SocialProofBadge = ({ salesCount = 0, variant = "viewers", className = "" }: SocialProofBadgeProps) => {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Simulate realistic viewer count based on time of day
    const base = 8 + Math.floor(Math.random() * 15);
    setViewers(base);

    const interval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(30, prev + delta));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (variant === "sales" && salesCount > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground ${className}`}
      >
        <Users className="w-3 h-3 text-emerald-500" />
        <span><span className="font-semibold text-foreground">{salesCount}</span> personnes ont acheté</span>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewers}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Eye className="w-3 h-3 text-muted-foreground" />
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{viewers}</span> personnes consultent ce produit
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
