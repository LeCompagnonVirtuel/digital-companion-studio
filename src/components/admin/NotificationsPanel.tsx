import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  Trash2, 
  Users, 
  FileText, 
  Search, 
  Rocket,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'lead':
        return <Users className="w-4 h-4" />;
      case 'contact':
        return <FileText className="w-4 h-4" />;
      case 'audit':
        return <Search className="w-4 h-4" />;
      case 'project':
        return <Rocket className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'lead':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'contact':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'audit':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'project':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'lead':
        return 'Lead';
      case 'contact':
        return 'Contact';
      case 'audit':
        return 'Audit';
      case 'project':
        return 'Projet';
      default:
        return 'Système';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-4 top-16 lg:top-4 lg:right-80 z-50 w-[calc(100vw-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-elevated overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    <CheckCheck className="w-4 h-4 mr-1" />
                    Tout marquer lu
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="h-[400px] lg:h-[500px]">
              {isLoading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">Aucune notification</p>
                  <p className="text-sm text-muted-foreground/70">
                    Les nouvelles alertes apparaîtront ici
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 hover:bg-muted/50 transition-colors ${
                        !notification.is_read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${getTypeColor(notification.type)}`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(notification.type)}`}>
                                  {getTypeLabel(notification.type)}
                                </span>
                                {!notification.is_read && (
                                  <span className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                              <p className="font-medium text-sm text-foreground truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                {formatDistanceToNow(new Date(notification.created_at), {
                                  addSuffix: true,
                                  locale: fr,
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {!notification.is_read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
