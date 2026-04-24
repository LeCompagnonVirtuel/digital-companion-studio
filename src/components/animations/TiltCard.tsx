import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
}

export function TiltCard({ children, className = "", tiltAmount = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, hsl(var(--primary) / 0.08), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
