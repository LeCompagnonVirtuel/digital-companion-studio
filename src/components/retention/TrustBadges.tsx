import { motion } from 'framer-motion';
import { Shield, Clock, Award, Headphones, RefreshCcw, Lock, Star, Users } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'detailed';
  showAll?: boolean;
}

const trustItems = [
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    description: 'Transactions 100% sécurisées',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Clock,
    title: 'Accès immédiat',
    description: 'Téléchargement instantané',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: RefreshCcw,
    title: 'Satisfait ou remboursé',
    description: 'Garantie 30 jours',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Headphones,
    title: 'Support réactif',
    description: 'Réponse sous 24h',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    icon: Award,
    title: 'Qualité premium',
    description: 'Conçu par des experts',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Lock,
    title: 'Données protégées',
    description: 'Confidentialité garantie',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

const stats = [
  { icon: Users, value: '10+', label: 'Clients satisfaits' },
  { icon: Star, value: '4.9/5', label: 'Note moyenne' },
  { icon: Award, value: '100%', label: 'Taux de satisfaction' },
];

export function TrustBadges({ variant = 'default', showAll = false }: TrustBadgesProps) {
  const items = showAll ? trustItems : trustItems.slice(0, 4);

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {items.slice(0, 3).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <item.icon size={16} className={item.color} />
            <span>{item.title}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-xl bg-muted/50"
            >
              <stat.icon size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0`}>
                <item.icon size={20} className={item.color} />
              </div>
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
        >
          <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3`}>
            <item.icon size={24} className={item.color} />
          </div>
          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
