import { motion } from "framer-motion";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  className?: string;
}

export function ParticleField({ count = 30, color = "primary", className = "" }: ParticleFieldProps) {
  const isMobile = useIsMobile();
  const actualCount = isMobile ? Math.min(count, 10) : count;

  const particles = useMemo(() =>
    Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      moveX: (Math.random() - 0.5) * 60,
      moveY: (Math.random() - 0.5) * 60,
    })),
  [actualCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full bg-${color}/30`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.moveX, 0],
            y: [0, p.moveY, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
