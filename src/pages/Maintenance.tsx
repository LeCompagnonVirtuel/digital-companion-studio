import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, ExternalLink, RefreshCw, Clock, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import logo from "@/assets/logo.png";

interface MaintenanceProps {
  title?: string;
  message?: string;
  estimatedReturn?: string | null;
}

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsSupported(false);
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const nodeCount = 50;
    const connectDistance = 120;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 91, 219, 0.6)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 91, 219, ${0.15 * (1 - dist / connectDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 91, 219, 0.08)";
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
      aria-hidden="true"
    />
  );
};

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `hsl(${234 + Math.random() * 20}, 89%, ${54 + Math.random() * 20}%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Maintenance = ({
  title = "Nous améliorons votre expérience",
  message = "Nous mettons à jour notre plateforme pour vous offrir une expérience encore meilleure. Merci de votre patience.",
  estimatedReturn,
}: MaintenanceProps) => {
  const [countdown, setCountdown] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useDocumentMeta({
    title: "Maintenance en cours - Le Compagnon Virtuel",
    description: message,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!estimatedReturn) return;

    const update = () => {
      const now = new Date().getTime();
      const target = new Date(estimatedReturn).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Bientôt");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}min`);
      } else if (minutes > 0) {
        setCountdown(`${minutes}min ${seconds}s`);
      } else {
        setCountdown(`${seconds}s`);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [estimatedReturn]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <AnimatePresence>
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <Suspense fallback={null}>
              <NeuralNetwork />
            </Suspense>
            <ParticleBackground />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-block"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 91, 219, 0.3)",
                  "0 0 40px rgba(59, 91, 219, 0.5)",
                  "0 0 20px rgba(59, 91, 219, 0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={logo}
              alt="Le Compagnon Virtuel"
              className="w-14 h-14 mx-auto mb-6 rounded-xl object-contain"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              {title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-sm mx-auto"
          >
            {message}
          </motion.p>

          {countdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Clock className="w-5 h-5 text-primary animate-pulse" />
              <div className="text-left">
                <p className="text-xs text-primary font-medium uppercase tracking-wider">Retour estimé</p>
                <p className="text-lg font-bold text-foreground font-mono">{countdown}</p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 shadow-lg shadow-primary/20"
            >
              <a href="https://wa.me/2250706693038" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Nous contacter
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6"
              onClick={() => setShowContact(!showContact)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Envoyer un email
            </Button>
          </motion.div>

          <AnimatePresence>
            {showContact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <a
                  href="mailto:lecompagnonvirtuel@gmail.com"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  lecompagnonvirtuel@gmail.com
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-1 pt-4"
          >
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
              className="w-2 h-2 rounded-full bg-gold"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-muted-foreground/60 pt-4"
          >
            Propulsé par l'IA • Le Compagnon Virtuel
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Maintenance;