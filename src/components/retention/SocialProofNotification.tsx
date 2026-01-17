import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Star, TrendingUp, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    icon: <ShoppingBag size={18} />,
    title: 'Marie vient d\'acheter',
    description: 'Guide Marketing Digital',
    time: 'Il y a 2 minutes',
  },
  {
    id: '2',
    icon: <Users size={18} />,
    title: '12 personnes consultent',
    description: 'cette page en ce moment',
    time: '',
  },
  {
    id: '3',
    icon: <Star size={18} />,
    title: 'Nouveau témoignage',
    description: '"Excellente formation !" - Thomas',
    time: 'Il y a 5 minutes',
  },
  {
    id: '4',
    icon: <TrendingUp size={18} />,
    title: 'Produit populaire',
    description: '+50 ventes cette semaine',
    time: '',
  },
  {
    id: '5',
    icon: <ShoppingBag size={18} />,
    title: 'Pierre a commandé',
    description: 'Pack Templates Notion',
    time: 'Il y a 8 minutes',
  },
];

export function SocialProofNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const location = useLocation();

  // Don't show on admin, auth, or checkout pages
  const shouldShow = !location.pathname.startsWith('/admin') && 
                     location.pathname !== '/auth' && 
                     !location.pathname.includes('checkout');

  useEffect(() => {
    if (!shouldShow) return;

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      setCurrentNotification(notifications[0]);
      
      // Auto-hide after 5 seconds
      setTimeout(() => setCurrentNotification(null), 5000);
    }, 15000);

    // Show notifications periodically
    const interval = setInterval(() => {
      setNotificationIndex(prev => {
        const nextIndex = (prev + 1) % notifications.length;
        setCurrentNotification(notifications[nextIndex]);
        
        // Auto-hide after 5 seconds
        setTimeout(() => setCurrentNotification(null), 5000);
        
        return nextIndex;
      });
    }, 45000); // Every 45 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs hidden md:block"
        >
          <div className="bg-card rounded-xl shadow-xl border border-border/50 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                {currentNotification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{currentNotification.title}</p>
                <p className="text-sm text-muted-foreground truncate">{currentNotification.description}</p>
                {currentNotification.time && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {currentNotification.time}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
