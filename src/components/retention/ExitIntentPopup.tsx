import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on admin or auth pages
  const shouldShow = !location.pathname.startsWith('/admin') && location.pathname !== '/auth';

  const handleExitIntent = useCallback((e: MouseEvent) => {
    if (hasShown || !shouldShow) return;
    
    // Detect mouse leaving viewport from top
    if (e.clientY <= 5 && e.movementY < 0) {
      const lastShown = sessionStorage.getItem('exit_intent_shown');
      if (!lastShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    }
  }, [hasShown, shouldShow]);

  useEffect(() => {
    // Only add listener after 5 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleExitIntent);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [handleExitIntent]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track email submission
    console.log('Exit intent email:', email);
    handleClose();
    navigate('/audit-gratuit');
  };

  const handleCTA = () => {
    handleClose();
    navigate('/audit-gratuit');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X size={20} className="text-muted-foreground" />
              </button>

              <div className="p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  >
                    <Gift size={40} className="text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Attendez ! 🎁
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Recevez un <span className="text-primary font-semibold">audit digital gratuit</span> de votre entreprise avant de partir
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Sparkles, text: 'Analyse complète de votre présence digitale' },
                    { icon: Clock, text: 'Résultats en 48h' },
                    { icon: Shield, text: 'Sans engagement, 100% gratuit' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Email form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Votre email professionnel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                  <Button type="submit" className="w-full h-12 text-base" size="lg">
                    Recevoir mon audit gratuit
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </form>

                {/* Skip option */}
                <button
                  onClick={handleCTA}
                  className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ou découvrir nos services →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
