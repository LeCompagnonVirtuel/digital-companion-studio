import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  direction?: "vertical" | "horizontal" | "diagonal";
}

const getVariants = (amplitude: number, direction: string): Variants => {
  const base = { transition: { duration: 0, repeat: Infinity, ease: "easeInOut" as const } };

  switch (direction) {
    case "horizontal":
      return {
        animate: { x: [0, amplitude, 0, -amplitude, 0], ...base },
      };
    case "diagonal":
      return {
        animate: { x: [0, amplitude * 0.7, 0], y: [0, -amplitude, 0], rotate: [0, 3, 0], ...base },
      };
    default:
      return {
        animate: { y: [0, -amplitude, 0], ...base },
      };
  }
};

export function FloatingElement({
  children,
  className = "",
  amplitude = 15,
  duration = 6,
  delay = 0,
  direction = "vertical"
}: FloatingElementProps) {
  const variants = getVariants(amplitude, direction);

  return (
    <motion.div
      className={className}
      animate={variants.animate}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
