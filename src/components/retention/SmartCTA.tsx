import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone, Mail, Calendar, Save, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SmartCTAProps {
  variant?: 'contact' | 'save' | 'share' | 'callback';
  context?: 'product' | 'service' | 'page';
  showAll?: boolean;
}

const ctaOptions = {
  contact: [
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Discuter maintenant',
      description: 'Réponse instantanée',
      action: 'chat',
      color: 'primary',
    },
    {
      id: 'whatsapp',
      icon: Phone,
      label: 'WhatsApp',
      description: 'Échangez directement',
      action: 'https://wa.me/yourphonenumber',
      color: 'success',
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      description: 'Réponse sous 24h',
      action: '/contact',
      color: 'primary',
    },
    {
      id: 'call',
      icon: Calendar,
      label: 'Être rappelé',
      description: 'Planifiez un appel',
      action: '/parlons-projet',
      color: 'accent',
    },
  ],
  save: [
    {
      id: 'save',
      icon: Save,
      label: 'Sauvegarder',
      description: 'Retrouvez-le plus tard',
      action: 'save',
      color: 'primary',
    },
    {
      id: 'share-email',
      icon: Send,
      label: 'Envoyer par email',
      description: 'Recevez le lien',
      action: 'email',
      color: 'primary',
    },
  ],
  share: [
    {
      id: 'share',
      icon: ExternalLink,
      label: 'Partager',
      description: 'Avec un collègue',
      action: 'share',
      color: 'primary',
    },
  ],
  callback: [
    {
      id: 'callback',
      icon: Phone,
      label: 'Être rappelé',
      description: 'Gratuit, sans engagement',
      action: '/parlons-projet',
      color: 'primary',
    },
  ],
};

export function SmartCTA({ variant = 'contact', context = 'page', showAll = false }: SmartCTAProps) {
  const options = ctaOptions[variant];
  const displayOptions = showAll ? options : options.slice(0, 2);

  const handleAction = (action: string) => {
    if (action === 'chat') {
      // Trigger chatbot
      const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
      chatButton?.click();
    } else if (action === 'save') {
      // Save to localStorage
      const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
      savedItems.push({ url: window.location.href, title: document.title, date: new Date().toISOString() });
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
    } else if (action === 'email') {
      // Open email dialog (could be enhanced)
      window.location.href = `mailto:?subject=Découvrez ceci&body=${encodeURIComponent(window.location.href)}`;
    } else if (action === 'share') {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        });
      }
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {variant === 'contact' && 'Besoin d\'aide ?'}
        {variant === 'save' && 'Continuer plus tard ?'}
        {variant === 'callback' && 'Une question ?'}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {displayOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {option.action.startsWith('/') ? (
              <Button variant="outline" size="sm" asChild>
                <Link to={option.action}>
                  <option.icon size={16} className="mr-2" />
                  {option.label}
                </Link>
              </Button>
            ) : option.action.startsWith('http') ? (
              <Button variant="outline" size="sm" asChild>
                <a href={option.action} target="_blank" rel="noopener noreferrer">
                  <option.icon size={16} className="mr-2" />
                  {option.label}
                </a>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction(option.action)}
              >
                <option.icon size={16} className="mr-2" />
                {option.label}
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Floating contact bar for mobile
export function FloatingContactBar() {
  const handleChat = () => {
    const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
    chatButton?.click();
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t border-border/50 p-3 md:hidden"
    >
      <div className="flex items-center gap-2">
        <Button className="flex-1" onClick={handleChat}>
          <MessageCircle size={18} className="mr-2" />
          Discuter
        </Button>
        <Button variant="outline" asChild>
          <Link to="/parlons-projet">
            <Phone size={18} />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
            <Send size={18} />
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
