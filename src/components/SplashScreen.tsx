import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/logo.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 200);
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(onComplete, 3200);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(222, 47%, 5%) 0%, hsl(234, 50%, 9%) 40%, hsl(222, 47%, 7%) 100%)" }}
      >
        {/* Animated orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(234, 89%, 54%, 0.15) 0%, transparent 70%)", top: "-20%", right: "-10%" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(172, 66%, 50%, 0.12) 0%, transparent 70%)", bottom: "-15%", left: "-10%" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Rotating ring */}
        <motion.div
          className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-white/[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Second ring */}
        <motion.div
          className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full border border-dashed border-white/[0.04]"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative flex flex-col items-center">
          {/* Logo with 3D effect */}
          <motion.div
            initial={{ scale: 0, rotateY: -180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{
                rotateY: [0, 8, -8, 0],
                rotateX: [0, -5, 5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Glow behind logo */}
              <motion.div
                className="absolute -inset-6 rounded-3xl"
                style={{ background: "radial-gradient(circle, hsl(234, 89%, 54%, 0.3) 0%, transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo container */}
              <motion.div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: "0 25px 60px -15px hsl(234 89% 54% / 0.4), 0 0 0 1px hsl(0 0% 100% / 0.1), inset 0 1px 0 0 hsl(0 0% 100% / 0.1)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={logoImage} alt="LCV" className="w-full h-full object-cover" />
              </motion.div>

              {/* 3D floating shadow */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-black/30 blur-md"
                animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-center"
          >
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Le <span className="text-primary">Compagnon</span>{" "}
              <span className="text-destructive">Virtuel.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="text-white/40 text-sm mt-2 tracking-widest uppercase"
            >
              Agence Digitale
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10 w-48 h-[2px] rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
