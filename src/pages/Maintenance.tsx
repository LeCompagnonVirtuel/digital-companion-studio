import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Construction, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import logo from '@/assets/logo.png';

interface MaintenanceProps {
  title?: string;
  message?: string;
  estimatedReturn?: string | null;
}

const Maintenance = ({
  title = '🚧 Site en maintenance',
  message = 'Nous effectuons actuellement une mise à jour pour améliorer votre expérience. Le site sera de retour très bientôt.',
  estimatedReturn,
}: MaintenanceProps) => {
  const [countdown, setCountdown] = useState('');
  useDocumentMeta({ title: 'Maintenance - Site en cours de mise à jour', description: message });

  useEffect(() => {
    if (!estimatedReturn) return;

    const update = () => {
      const now = new Date().getTime();
      const target = new Date(estimatedReturn).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown('Imminent');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}min ${seconds}s`);
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center"
          >
            <Construction className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={logo}
            alt="LCV Digital"
            className="w-16 h-16 mx-auto mb-4 rounded-lg object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-display font-bold text-foreground"
        >
          {title}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Countdown */}
        {estimatedReturn && countdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary border border-border"
          >
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Retour estimé</p>
              <p className="text-lg font-bold text-foreground font-mono">{countdown}</p>
            </div>
          </motion.div>
        )}

        {/* Refresh button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Revenir plus tard
          </Button>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-2 pt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Maintenance;
