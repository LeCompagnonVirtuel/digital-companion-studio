import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';

type SlideInType = 'help' | 'whatsapp' | 'callback' | 'newsletter';

interface SlideInConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  link: string;
  color: string;
  isExternal?: boolean;
}

export function SmartSlideIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [slideType, setSlideType] = useState<SlideInType>('help');
  const location = useLocation();
  const { settings } = useSiteSettings();

  // Format phone number for WhatsApp (remove spaces and special chars)
  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/[\s\-\(\)]/g, '').replace('+', '');
  };

  const whatsappNumber = formatPhoneForWhatsApp(settings.business_info.phone);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour ! J\'aimerais en savoir plus sur vos services.')}`;

  const slideInConfigs: Record<SlideInType, SlideInConfig> = {
    help: {
      icon: <MessageCircle size={20} />,
      title: 'Besoin d\'aide ?',
      description: 'Notre équipe est disponible pour répondre à vos questions',
      cta: 'Discuter maintenant',
      link: '#chatbot',
      color: 'primary',
    },
    whatsapp: {
      icon: <Phone size={20} />,
      title: 'Préférez WhatsApp ?',
      description: 'Recevez nos conseils directement sur votre téléphone',
      cta: 'Rejoindre WhatsApp',
      link: whatsappLink,
      color: 'success',
      isExternal: true,
    },
    callback: {
      icon: <Calendar size={20} />,
      title: 'On vous rappelle ?',
      description: 'Planifiez un appel gratuit avec un expert',
      cta: 'Réserver un créneau',
      link: '/parlons-projet',
      color: 'accent',
    },
    newsletter: {
      icon: <Mail size={20} />,
      title: 'Restez informé',
      description: 'Recevez nos meilleures ressources gratuites',
      cta: 'S\'inscrire',
      link: '/contact',
      color: 'primary',
    },
  };

  // Don't show on admin, auth, or checkout pages
  const shouldShow = !location.pathname.startsWith('/admin') && 
                     location.pathname !== '/auth' && 
                     !location.pathname.includes('checkout');

  useEffect(() => {
    if (!shouldShow) return;

    const hasShown = sessionStorage.getItem('slide_in_shown');
    if (hasShown) return;

    // Determine slide type based on page
    if (location.pathname.includes('boutique')) {
      setSlideType('whatsapp');
    } else if (location.pathname.includes('services')) {
      setSlideType('callback');
    } else if (location.pathname === '/') {
      setSlideType('help');
    } else {
      setSlideType('newsletter');
    }

    // Show after 30 seconds or 60% scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('slide_in_shown', 'true');
    }, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 60) {
        setIsVisible(true);
        sessionStorage.setItem('slide_in_shown', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldShow, location.pathname]);

  const config = slideInConfigs[slideType];

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    if (config.link === '#chatbot') {
      // Trigger chatbot
      const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
      chatButton?.click();
    } else if (config.isExternal) {
      // Open external link in new tab
      window.open(config.link, '_blank', 'noopener,noreferrer');
    }
    handleClose();
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
        >
          <div className="bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden">
            {/* Header */}
            <div className="relative px-4 py-3 bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {config.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{config.title}</h4>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-4">
              {config.link.startsWith('http') || config.link === '#chatbot' ? (
                <Button 
                  onClick={handleCTA}
                  className="w-full"
                  size="sm"
                >
                  {config.cta}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button asChild className="w-full" size="sm">
                  <Link to={config.link} onClick={handleClose}>
                    {config.cta}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
