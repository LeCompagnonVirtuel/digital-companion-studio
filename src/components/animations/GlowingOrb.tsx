import { motion } from "framer-motion";

interface GlowingOrbProps {
  color?: "primary" | "accent" | "gold";
  size?: string;
  className?: string;
  blur?: string;
  duration?: number;
}

const colorMap = {
  primary: "hsl(234, 89%, 54%)",
  accent: "hsl(174, 77%, 40%)",
  gold: "hsl(45, 93%, 47%)",
};

export function GlowingOrb({
  color = "primary",
  size = "300px",
  className = "",
  blur = "80px",
  duration = 10,
}: GlowingOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]}20 0%, ${colorMap[color]}08 40%, transparent 70%)`,
        filter: `blur(${blur})`,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
