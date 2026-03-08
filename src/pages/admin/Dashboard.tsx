import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  Rocket,
  Search,
  BarChart3,
  Activity,
  ShoppingBag,
  DollarSign,
  Package,
  CreditCard,
  AlertCircle,
  Plus,
  Zap,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAdminOrders, Order } from '@/hooks/useOrders';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  conversionRate: number;
  auditRequests: number;
  projectsStarted: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  created_at: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Bonjour', emoji: '☀️' };
  if (hour < 18) return { text: 'Bon après-midi', emoji: '🌤️' };
  return { text: 'Bonsoir', emoji: '🌙' };
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    auditRequests: 0,
    projectsStarted: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: orders, isLoading: ordersLoading } = useAdminOrders();
  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    fetchDashboardData();
    const channel = supabase
      .channel('leads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchDashboardData();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      const total = leads?.length || 0;
      const newCount = leads?.filter(l => l.status === 'new').length || 0;
      const converted = leads?.filter(l => l.status === 'converted').length || 0;
      const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
      const audits = leads?.filter(l => l.source === 'audit' || l.source === 'audit-gratuit').length || 0;
      const projects = leads?.filter(l => l.source === 'project' || l.source === 'demarrer-projet').length || 0;
      setStats({ totalLeads: total, newLeads: newCount, convertedLeads: converted, conversionRate: rate, auditRequests: audits, projectsStarted: projects });
      setRecentLeads(leads?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const paidOrders = orders?.filter((o) => o.status === 'paid') || [];
  const salesStats = {
    totalOrders: orders?.length || 0,
    paidOrders: paidOrders.length,
    pendingOrders: orders?.filter((o) => o.status === 'pending').length || 0,
    totalRevenue: paidOrders.reduce((sum, o) => sum + o.price, 0),
    todayRevenue: paidOrders.filter((o) => new Date(o.created_at).toDateString() === new Date().toDateString()).reduce((sum, o) => sum + o.price, 0),
    avgCartValue: paidOrders.length > 0 ? paidOrders.reduce((sum, o) => sum + o.price, 0) / paidOrders.length : 0,
  };

  const topProducts = useMemo(() => {
    if (!orders) return [];
    const productMap = new Map<string, { title: string; revenue: number; count: number }>();
    paidOrders.forEach((o) => {
      const existing = productMap.get(o.product_id) || { title: o.product_title, revenue: 0, count: 0 };
      existing.revenue += o.price;
      existing.count += 1;
      productMap.set(o.product_id, existing);
    });
    return Array.from(productMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders]);

  const revenueChartData = useMemo(() => {
    if (!orders) return [];
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push({
        date: dateStr,
        revenue: orders.filter((o) => o.status === 'paid' && o.created_at.startsWith(dateStr)).reduce((sum, o) => sum + o.price, 0),
        orders: orders.filter((o) => o.created_at.startsWith(dateStr)).length,
      });
    }
    return last7Days;
  }, [orders]);

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);

  const calcTrend = (current: number, previous: number) => {
    if (previous === 0 && current === 0) return { text: '--', up: true };
    if (previous === 0) return { text: '+100%', up: true };
    const pct = Math.round(((current - previous) / previous) * 100);
    return { text: `${pct >= 0 ? '+' : ''}${pct}%`, up: pct >= 0 };
  };

  const currentWeekViews = analytics.weekPageViews;
  const prevWeekViews = analytics.totalPageViews - analytics.weekPageViews;
  const viewsTrend = calcTrend(currentWeekViews, prevWeekViews);

  const now7 = new Date();
  const sevenDaysAgo = new Date(now7.getTime() - 7 * 86400000);
  const fourteenDaysAgo = new Date(now7.getTime() - 14 * 86400000);
  const currentRevenue = paidOrders.filter(o => new Date(o.created_at) >= sevenDaysAgo).reduce((s, o) => s + o.price, 0);
  const prevRevenue = paidOrders.filter(o => new Date(o.created_at) >= fourteenDaysAgo && new Date(o.created_at) < sevenDaysAgo).reduce((s, o) => s + o.price, 0);
  const revenueTrend = calcTrend(currentRevenue, prevRevenue);
  const currentOrders = (orders || []).filter(o => new Date(o.created_at) >= sevenDaysAgo).length;
  const prevOrders = (orders || []).filter(o => new Date(o.created_at) >= fourteenDaysAgo && new Date(o.created_at) < sevenDaysAgo).length;
  const ordersTrend = calcTrend(currentOrders, prevOrders);
  const conversionTrend = stats.conversionRate > 0 ? { text: `${stats.conversionRate}%`, up: stats.conversionRate > 5 } : { text: '--', up: true };

  const statCards = [
    { title: 'Vues aujourd\'hui', value: analytics.todayPageViews, icon: Eye, trend: viewsTrend.text, trendUp: viewsTrend.up, color: 'blue', description: 'Pages vues' },
    { title: 'Revenus boutique', value: formatPrice(salesStats.totalRevenue), icon: DollarSign, trend: revenueTrend.text, trendUp: revenueTrend.up, color: 'green', description: 'Total des ventes' },
    { title: 'Commandes', value: salesStats.totalOrders, icon: ShoppingBag, trend: ordersTrend.text, trendUp: ordersTrend.up, color: 'primary', description: `${salesStats.paidOrders} payées, ${salesStats.pendingOrders} en attente` },
    { title: 'Taux conversion', value: `${stats.conversionRate}%`, icon: TrendingUp, trend: conversionTrend.text, trendUp: conversionTrend.up, color: 'gold', description: 'Leads convertis' },
  ];

  const quickStats = [
    { label: 'Revenus aujourd\'hui', value: formatPrice(salesStats.todayRevenue), icon: CreditCard, color: 'green' },
    { label: 'Panier moyen', value: formatPrice(salesStats.avgCartValue), icon: ShoppingBag, color: 'orange' },
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'primary' },
    { label: 'Formulaires soumis', value: analytics.totalFormSubmits, icon: FileText, color: 'pink' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      contacted: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      qualified: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      converted: 'bg-green-500/10 text-green-500 border-green-500/20',
      lost: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    const labels: Record<string, string> = { new: 'Nouveau', contacted: 'Contacté', qualified: 'Qualifié', converted: 'Converti', lost: 'Perdu' };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-muted text-muted-foreground'}`}>{labels[status] || status}</span>;
  };

  const getSourceBadge = (source: string) => {
    const config: Record<string, { label: string; icon: typeof Mail }> = {
      'audit': { label: 'Audit', icon: Search },
      'audit-gratuit': { label: 'Audit gratuit', icon: Search },
      'project': { label: 'Projet', icon: Rocket },
      'demarrer-projet': { label: 'Démarrer projet', icon: Rocket },
      'contact': { label: 'Contact', icon: Mail },
      'devis': { label: 'Devis', icon: FileText },
    };
    const c = config[source] || { label: source || 'Direct', icon: Activity };
    const Icon = c.icon;
    return (
      <span className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {c.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; text: string; gradient: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary', gradient: 'from-primary/20 to-primary/5' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', gradient: 'from-blue-500/20 to-blue-500/5' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500', gradient: 'from-green-500/20 to-green-500/5' },
      gold: { bg: 'bg-amber-500/10', text: 'text-amber-500', gradient: 'from-amber-500/20 to-amber-500/5' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', gradient: 'from-purple-500/20 to-purple-500/5' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', gradient: 'from-orange-500/20 to-orange-500/5' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', gradient: 'from-cyan-500/20 to-cyan-500/5' },
      pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', gradient: 'from-pink-500/20 to-pink-500/5' },
    };
    return colors[color] || colors.primary;
  };

  const quickActions = [
    { label: 'Nouveau produit', icon: Plus, href: '/admin/shop', color: 'primary' },
    { label: 'Voir commandes', icon: ShoppingBag, href: '/admin/orders', color: 'green' },
    { label: 'Gérer le blog', icon: FileText, href: '/admin/blog', color: 'blue' },
    { label: 'Statistiques', icon: BarChart3, href: '/admin/analytics', color: 'purple' },
  ];

  // Alerts
  const alerts = [];
  if (stats.newLeads > 0) alerts.push({ text: `${stats.newLeads} lead${stats.newLeads > 1 ? 's' : ''} non traité${stats.newLeads > 1 ? 's' : ''}`, href: '/admin/leads', color: 'blue' });
  if (salesStats.pendingOrders > 0) alerts.push({ text: `${salesStats.pendingOrders} commande${salesStats.pendingOrders > 1 ? 's' : ''} en attente`, href: '/admin/orders', color: 'amber' });

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6 lg:space-y-8">
          {/* Header with greeting */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-2">
                {greeting.emoji} {greeting.text}
              </h1>
              <p className="text-muted-foreground mt-1">
                Voici un aperçu de votre activité en temps réel
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistiques
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Alerts Banner */}
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {alerts.map((alert, i) => (
                <Link key={i} to={alert.href}>
                  <Badge
                    variant="outline"
                    className={`py-2 px-4 text-sm cursor-pointer transition-all hover:scale-[1.02] ${
                      alert.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10' :
                      'border-amber-500/30 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                    {alert.text}
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Badge>
                </Link>
              ))}
            </motion.div>
          )}

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {statCards.map((stat, index) => {
              const colorClasses = getColorClass(stat.color);
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className={`relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <CardContent className="p-4 lg:p-6 relative">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs lg:text-sm text-muted-foreground mb-1 truncate">{stat.title}</p>
                          <p className="text-xl lg:text-3xl font-bold text-foreground tracking-tight">
                            {isLoading || analyticsLoading ? (
                              <span className="inline-block w-16 h-8 bg-muted animate-pulse rounded" />
                            ) : stat.value}
                          </p>
                          <p className="text-[11px] text-muted-foreground/70 mt-1 hidden sm:block">{stat.description}</p>
                        </div>
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClasses.bg} transition-transform group-hover:scale-110`}>
                          <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${colorClasses.text}`} />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5">
                        {stat.trendUp ? (
                          <span className="flex items-center gap-0.5 text-xs font-semibold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md">
                            <ArrowUpRight className="w-3 h-3" />
                            {stat.trend}
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-md">
                            <ArrowDownRight className="w-3 h-3" />
                            {stat.trend}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground hidden sm:inline">vs 7j préc.</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Actions rapides</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {quickActions.map((action) => {
                const colorClasses = getColorClass(action.color);
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-3 px-4 justify-start gap-3 border-border/50 hover:border-primary/30 transition-all"
                    asChild
                  >
                    <Link to={action.href}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses.bg}`}>
                        <action.icon className={`w-4 h-4 ${colorClasses.text}`} />
                      </div>
                      <span className="text-sm">{action.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {quickStats.map((stat) => {
              const colorClasses = getColorClass(stat.color);
              return (
                <div key={stat.label} className="flex items-center gap-3 p-3 lg:p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all">
                  <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${colorClasses.bg}`}>
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${colorClasses.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg lg:text-xl font-bold text-foreground">
                      {isLoading || analyticsLoading ? <span className="inline-block w-10 h-5 bg-muted animate-pulse rounded" /> : stat.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Vues (7 derniers jours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={analytics.dailyViews}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'short' })} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} labelFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} />
                        <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 3 }} name="Vues" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Pages populaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : analytics.topPages.length === 0 ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <BarChart3 className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-xs">Pas encore de données</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={analytics.topPages.slice(0, 5)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <YAxis dataKey="page" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={100} tickFormatter={(v) => v.length > 15 ? v.slice(0, 15) + '...' : v} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Vues" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sales Charts */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              <Card className="border-border/50">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    Revenus (7j)
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link to="/admin/orders">Détails →</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : revenueChartData.every(d => d.revenue === 0) ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <DollarSign className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-xs">Aucune vente pour le moment</p>
                      <Button variant="link" size="sm" asChild className="text-xs mt-1">
                        <Link to="/admin/shop">Ajouter des produits</Link>
                      </Button>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={revenueChartData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'short' })} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} labelFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} formatter={(value: number) => [formatPrice(value), 'Revenus']} />
                        <Area type="monotone" dataKey="revenue" stroke="hsl(142, 76%, 36%)" strokeWidth={2} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    Commandes (7j)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : revenueChartData.every(d => d.orders === 0) ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <ShoppingBag className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-xs">Aucune commande</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={revenueChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'short' })} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} labelFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} />
                        <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Commandes" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Row: Top Products + Recent Leads */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
              <Card className="border-border/50 h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Top produits
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link to="/admin/shop">Voir tout →</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3.5 bg-muted rounded w-1/3" />
                            <div className="h-3 bg-muted rounded w-1/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : topProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Aucune vente enregistrée</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-amber-500/10 text-amber-500' :
                            index === 1 ? 'bg-muted text-muted-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            #{index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.title}</p>
                            <p className="text-[11px] text-muted-foreground">{product.count} vente{product.count > 1 ? 's' : ''}</p>
                          </div>
                          <p className="font-semibold text-sm text-foreground">{formatPrice(product.revenue)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Card className="border-border/50 h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Leads récents
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link to="/admin/leads">Voir tout →</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex items-center gap-3">
                          <div className="w-9 h-9 bg-muted rounded-full" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3.5 bg-muted rounded w-1/4" />
                            <div className="h-3 bg-muted rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : recentLeads.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Aucun lead pour le moment</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-1">Apparaîtront ici en temps réel</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {recentLeads.map((lead) => (
                        <Link
                          key={lead.id}
                          to="/admin/leads"
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-primary font-semibold text-sm">{lead.name[0]?.toUpperCase() || '?'}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{lead.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{lead.email}</p>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5">
                            {getStatusBadge(lead.status)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
