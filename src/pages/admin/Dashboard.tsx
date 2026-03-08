import { useEffect, useState } from 'react';
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
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    fetchDashboardData();

    // Subscribe to realtime lead updates
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

      setStats({
        totalLeads: total,
        newLeads: newCount,
        convertedLeads: converted,
        conversionRate: rate,
        auditRequests: audits,
        projectsStarted: projects,
      });

      setRecentLeads(leads?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sales statistics
  const paidOrders = orders?.filter((o) => o.status === 'paid') || [];
  const salesStats = {
    totalOrders: orders?.length || 0,
    paidOrders: paidOrders.length,
    pendingOrders: orders?.filter((o) => o.status === 'pending').length || 0,
    totalRevenue: paidOrders.reduce((sum, o) => sum + o.price, 0),
    todayRevenue: paidOrders.filter((o) => {
      const today = new Date().toDateString();
      return new Date(o.created_at).toDateString() === today;
    }).reduce((sum, o) => sum + o.price, 0),
    avgCartValue: paidOrders.length > 0 
      ? paidOrders.reduce((sum, o) => sum + o.price, 0) / paidOrders.length 
      : 0,
  };

  // Top selling products
  const topProducts = (() => {
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
  })();

  // Revenue chart data (last 7 days)
  const revenueChartData = (() => {
    if (!orders) return [];
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayRevenue = orders
        .filter((o) => o.status === 'paid' && o.created_at.startsWith(dateStr))
        .reduce((sum, o) => sum + o.price, 0);
      
      const dayOrders = orders
        .filter((o) => o.created_at.startsWith(dateStr))
        .length;
      
      last7Days.push({
        date: dateStr,
        revenue: dayRevenue,
        orders: dayOrders,
      });
    }
    return last7Days;
  })();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate real trends: current 7 days vs previous 7 days
  const calcTrend = (current: number, previous: number): { text: string; up: boolean } => {
    if (previous === 0 && current === 0) return { text: '--', up: true };
    if (previous === 0) return { text: '+100%', up: true };
    const pct = Math.round(((current - previous) / previous) * 100);
    return { text: `${pct >= 0 ? '+' : ''}${pct}%`, up: pct >= 0 };
  };

  // Views trend: current 7d vs previous 7d
  const currentWeekViews = analytics.weekPageViews;
  const prevWeekViews = analytics.totalPageViews - analytics.weekPageViews; // approximation
  const viewsTrend = calcTrend(currentWeekViews, prevWeekViews);

  // Revenue trend: current 7d vs previous 7d
  const now7 = new Date();
  const sevenDaysAgo = new Date(now7.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now7.getTime() - 14 * 24 * 60 * 60 * 1000);
  const currentRevenue = paidOrders
    .filter(o => new Date(o.created_at) >= sevenDaysAgo)
    .reduce((s, o) => s + o.price, 0);
  const prevRevenue = paidOrders
    .filter(o => new Date(o.created_at) >= fourteenDaysAgo && new Date(o.created_at) < sevenDaysAgo)
    .reduce((s, o) => s + o.price, 0);
  const revenueTrend = calcTrend(currentRevenue, prevRevenue);

  // Orders trend
  const currentOrders = (orders || []).filter(o => new Date(o.created_at) >= sevenDaysAgo).length;
  const prevOrders = (orders || []).filter(o => new Date(o.created_at) >= fourteenDaysAgo && new Date(o.created_at) < sevenDaysAgo).length;
  const ordersTrend = calcTrend(currentOrders, prevOrders);

  // Conversion trend: compare rates
  const currentLeads7d = recentLeads.length; // just use what's available
  const conversionTrend = stats.conversionRate > 0 
    ? { text: `${stats.conversionRate}%`, up: stats.conversionRate > 5 }
    : { text: '--', up: true };

  const statCards = [
    {
      title: 'Vues aujourd\'hui',
      value: analytics.todayPageViews,
      icon: Eye,
      trend: viewsTrend.text,
      trendUp: viewsTrend.up,
      color: 'blue',
      description: 'Pages vues',
    },
    {
      title: 'Revenus boutique',
      value: formatPrice(salesStats.totalRevenue),
      icon: DollarSign,
      trend: revenueTrend.text,
      trendUp: revenueTrend.up,
      color: 'green',
      description: 'Total des ventes',
    },
    {
      title: 'Commandes',
      value: salesStats.totalOrders,
      icon: ShoppingBag,
      trend: ordersTrend.text,
      trendUp: ordersTrend.up,
      color: 'primary',
      description: `${salesStats.paidOrders} payées, ${salesStats.pendingOrders} en attente`,
    },
    {
      title: 'Taux conversion',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      trend: conversionTrend.text,
      trendUp: conversionTrend.up,
      color: 'gold',
      description: 'Leads convertis',
    },
  ];

  const quickStats = [
    { label: 'Revenus aujourd\'hui', value: formatPrice(salesStats.todayRevenue), icon: CreditCard, color: 'green' },
    { label: 'Panier moyen', value: formatPrice(salesStats.avgCartValue), icon: ShoppingBag, color: 'orange' },
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'primary' },
    { label: 'Formulaires soumis', value: analytics.totalFormSubmits, icon: FileText, color: 'pink' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      qualified: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      converted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      lost: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    const labels: Record<string, string> = {
      new: 'Nouveau',
      contacted: 'Contacté',
      qualified: 'Qualifié',
      converted: 'Converti',
      lost: 'Perdu',
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getSourceBadge = (source: string) => {
    const labels: Record<string, string> = {
      'audit': 'Audit',
      'audit-gratuit': 'Audit gratuit',
      'project': 'Projet',
      'demarrer-projet': 'Démarrer projet',
      'contact': 'Contact',
      'devis': 'Devis',
    };

    return (
      <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
        {labels[source] || source || 'Direct'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-600' },
      green: { bg: 'bg-green-500/10', text: 'text-green-600' },
      gold: { bg: 'bg-amber-500/10', text: 'text-amber-600' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-600' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-600' },
      pink: { bg: 'bg-pink-500/10', text: 'text-pink-600' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground mt-1">
                Bienvenue ! Voici un aperçu de votre activité en temps réel.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistiques détaillées
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {statCards.map((stat, index) => {
              const colorClasses = getColorClass(stat.color);
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs lg:text-sm text-muted-foreground mb-1 truncate">
                            {stat.title}
                          </p>
                          <p className="text-xl lg:text-3xl font-bold text-foreground">
                            {isLoading || analyticsLoading ? '-' : stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1 hidden sm:block">
                            {stat.description}
                          </p>
                        </div>
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClasses.bg}`}>
                          <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${colorClasses.text}`} />
                        </div>
                      </div>
                      <div className="mt-3 lg:mt-4 flex items-center gap-1">
                        {stat.trendUp ? (
                          <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4 text-red-600" />
                        )}
                        <span className={`text-xs lg:text-sm font-medium ${
                          stat.trendUp ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          vs 7j précédents
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

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
                <div 
                  key={stat.label}
                  className="flex items-center gap-3 p-3 lg:p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${colorClasses.bg}`}>
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${colorClasses.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg lg:text-xl font-bold text-foreground">
                      {isLoading || analyticsLoading ? '-' : stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Page Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Vues (7 derniers jours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={analytics.dailyViews}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))' }}
                          name="Vues"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Pages populaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : analytics.topPages.length === 0 ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <BarChart3 className="w-10 h-10 mb-2 opacity-30" />
                      <p className="text-sm">Pas encore de données</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={analytics.topPages.slice(0, 5)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis 
                          dataKey="page" 
                          type="category" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={11}
                          width={100}
                          tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + '...' : value}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar 
                          dataKey="views" 
                          fill="hsl(var(--primary))" 
                          radius={[0, 4, 4, 0]}
                          name="Vues"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sales Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    Revenus (7 derniers jours)
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin/orders">Voir les commandes</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : revenueChartData.every(d => d.revenue === 0) ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <DollarSign className="w-10 h-10 mb-2 opacity-30" />
                      <p className="text-sm">Aucune vente pour le moment</p>
                      <Button variant="link" size="sm" asChild>
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
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                          formatter={(value: number) => [formatPrice(value), 'Revenus']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(142, 76%, 36%)" 
                          strokeWidth={2}
                          fill="url(#revenueGradient)"
                          name="Revenus"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Commandes (7 derniers jours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : revenueChartData.every(d => d.orders === 0) ? (
                    <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                      <ShoppingBag className="w-10 h-10 mb-2 opacity-30" />
                      <p className="text-sm">Aucune commande pour le moment</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={revenueChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        />
                        <Bar 
                          dataKey="orders" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                          name="Commandes"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Top Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-lg lg:text-xl font-display flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Top produits
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/shop">Voir tout →</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center gap-4">
                        <div className="w-8 h-8 bg-muted rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/3" />
                          <div className="h-3 bg-muted rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : topProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Aucune vente enregistrée</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.title}</p>
                          <p className="text-xs text-muted-foreground">{product.count} vente{product.count > 1 ? 's' : ''}</p>
                        </div>
                        <p className="font-semibold text-sm">{formatPrice(product.revenue)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-lg lg:text-xl font-display flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Leads récents
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/leads">
                    Voir tout →
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/4" />
                          <div className="h-3 bg-muted rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentLeads.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">Aucun lead pour le moment</p>
                    <p className="text-sm text-muted-foreground/70">
                      Les nouveaux leads apparaîtront ici en temps réel
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 lg:space-y-3">
                    {recentLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="flex items-center gap-3 lg:gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-semibold">
                            {lead.name[0]?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate text-sm lg:text-base">
                            {lead.name}
                          </p>
                          <p className="text-xs lg:text-sm text-muted-foreground truncate">
                            {lead.email}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          {getSourceBadge(lead.source)}
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="text-right text-xs lg:text-sm text-muted-foreground hidden lg:block">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(lead.created_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
