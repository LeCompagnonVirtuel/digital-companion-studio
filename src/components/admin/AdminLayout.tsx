import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Shield,
  Bell,
  BarChart3,
  BookOpen,
  Search,
  UserCog,
  Image as ImageIcon,
  FolderKanban,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationsPanel from './NotificationsPanel';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/leads', icon: Users, label: 'Leads' },
  { path: '/admin/content', icon: FileText, label: 'Contenu' },
  { path: '/admin/blog', icon: BookOpen, label: 'Blog' },
  { path: '/admin/portfolio', icon: FolderKanban, label: 'Portfolio' },
  { path: '/admin/media', icon: ImageIcon, label: 'Médias' },
  { path: '/admin/users', icon: UserCog, label: 'Utilisateurs' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Statistiques' },
  { path: '/admin/seo', icon: Search, label: 'SEO' },
  { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const { unreadCount } = useNotifications();

  const handleSignOut = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/auth');
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col z-30">
        <div className="flex flex-col flex-1 bg-card border-r border-border/50">
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 xl:px-6 py-5 border-b border-border/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-foreground truncate">Admin LCV</h1>
              <p className="text-xs text-muted-foreground">Centre de contrôle</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 xl:px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-xl transition-all duration-200 group ${
                    active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${active ? '' : 'group-hover:text-primary'}`} />
                  <span className="font-medium text-sm truncate">{item.label}</span>
                  {active && (
                    <ChevronRight className="w-4 h-4 ml-auto shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-3 xl:p-4 border-t border-border/50">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary/50">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold text-sm">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Administrateur
                </p>
                <p className="text-xs text-muted-foreground">Accès complet</p>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full mt-2 justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 lg:py-4 bg-card/95 backdrop-blur-lg border-b border-border/50 lg:pl-[17rem] xl:pl-[19rem]">
        {/* Mobile: Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-sm">Admin</span>
        </div>

        {/* Desktop: Page title or breadcrumb placeholder */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Synchronisation temps réel active
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh}
            className="hidden sm:flex"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-1">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-[280px] sm:w-80 bg-card border-l border-border/50"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <span className="font-display font-bold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                {navItems.map((item) => {
                  const active = isActive(item.path, item.exact);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        active 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-card">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:pl-64 xl:pl-72">
        <div className="p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
