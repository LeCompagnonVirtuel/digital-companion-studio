import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Package,
  Crown,
  UserPlus,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Percent,
  Globe,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444'];

const Analytics = () => {
  const [period, setPeriod] = useState<string>('30');
  const { data: analytics, isLoading, refetch } = useAdvancedAnalytics(parseInt(period));

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  // Conversion funnel data
  const funnelData = analytics ? [
    { name: 'Visiteurs', value: analytics.conversionMetrics.totalVisitors, fill: COLORS[0] },
    { name: 'Ajouts panier', value: analytics.conversionMetrics.cartAdds, fill: COLORS[1] },
    { name: 'Checkouts', value: analytics.conversionMetrics.checkoutStarts, fill: COLORS[2] },
    { name: 'Achats', value: analytics.conversionMetrics.purchases, fill: COLORS[3] },
  ] : [];

  // Customer distribution
  const customerDistribution = analytics ? [
    { name: 'Nouveaux', value: analytics.customerTrends.newCustomers, color: '#8b5cf6' },
    { name: 'Récurrents', value: analytics.customerTrends.returningCustomers, color: '#10b981' },
    { name: 'VIP', value: analytics.customerTrends.vipCustomers, color: '#f59e0b' },
  ] : [];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Analytics Avancé
              </h1>
              <p className="text-muted-foreground mt-1">
                Tableau de bord complet avec métriques en temps réel
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => refetch()}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[160px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">90 derniers jours</SelectItem>
                  <SelectItem value="365">12 derniers mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
              <Skeleton className="h-80" />
            </div>
          ) : analytics ? (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Revenus</p>
                          <p className="text-2xl font-bold mt-1">
                            {formatPrice(analytics.summary.totalRevenue)}
                          </p>
                          <div className={`flex items-center gap-1 mt-2 text-sm ${
                            analytics.summary.revenueChange >= 0 ? 'text-emerald-500' : 'text-red-500'
                          }`}>
                            {analytics.summary.revenueChange >= 0 ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            {formatPercent(analytics.summary.revenueChange)}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-500/10">
                          <DollarSign className="w-6 h-6 text-emerald-500" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/20">
                        <div className="h-full bg-emerald-500 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Commandes</p>
                          <p className="text-2xl font-bold mt-1">{analytics.summary.totalOrders}</p>
                          <div className={`flex items-center gap-1 mt-2 text-sm ${
                            analytics.summary.ordersChange >= 0 ? 'text-emerald-500' : 'text-red-500'
                          }`}>
                            {analytics.summary.ordersChange >= 0 ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            {formatPercent(analytics.summary.ordersChange)}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-500/10">
                          <Package className="w-6 h-6 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Panier moyen</p>
                          <p className="text-2xl font-bold mt-1">
                            {formatPrice(analytics.summary.avgOrderValue)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Par commande
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-500/10">
                          <ShoppingCart className="w-6 h-6 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Clients</p>
                          <p className="text-2xl font-bold mt-1">{analytics.summary.totalCustomers}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            +{analytics.customerTrends.newCustomers} nouveaux
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/10">
                          <Users className="w-6 h-6 text-amber-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Évolution des revenus
                  </CardTitle>
                  <CardDescription>
                    Revenus et commandes sur la période sélectionnée
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics.revenueByDay}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number) => [formatPrice(value), 'Revenus']}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#revenueGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Conversion Funnel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Entonnoir de conversion
                    </CardTitle>
                    <CardDescription>
                      Du visiteur à l'achat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {funnelData.map((step, index) => {
                        const prevValue = index > 0 ? funnelData[index - 1].value : step.value;
                        const conversionRate = prevValue > 0 ? (step.value / prevValue) * 100 : 0;
                        const overallRate = funnelData[0].value > 0 ? (step.value / funnelData[0].value) * 100 : 0;
                        
                        return (
                          <motion.div
                            key={step.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{step.name}</span>
                                <Badge variant="secondary">{step.value}</Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {index > 0 && (
                                  <span className="text-muted-foreground">
                                    {conversionRate.toFixed(1)}% conversion
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="h-8 bg-secondary rounded-lg overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallRate}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="h-full rounded-lg"
                                style={{ backgroundColor: step.fill }}
                              />
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                {overallRate.toFixed(1)}%
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Taux de conversion global</span>
                        <span className="text-2xl font-bold text-primary">
                          {analytics.conversionMetrics.totalVisitors > 0
                            ? ((analytics.conversionMetrics.purchases / analytics.conversionMetrics.totalVisitors) * 100).toFixed(2)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Segments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Segmentation clients
                    </CardTitle>
                    <CardDescription>
                      Répartition de votre base client
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={customerDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {customerDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {customerDistribution.map((segment) => (
                        <div key={segment.name} className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: segment.color }}
                            />
                            <span className="text-sm text-muted-foreground">{segment.name}</span>
                          </div>
                          <p className="text-xl font-bold mt-1">{segment.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                      <div className="text-center p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground">Panier moyen</p>
                        <p className="text-lg font-bold">{formatPrice(analytics.customerTrends.avgOrderValue)}</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground">Valeur vie client</p>
                        <p className="text-lg font-bold">{formatPrice(analytics.customerTrends.customerLifetimeValue)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Performance des produits
                  </CardTitle>
                  <CardDescription>
                    Vos produits les plus performants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics.productPerformance.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead className="text-right">Vues</TableHead>
                          <TableHead className="text-right">Ventes</TableHead>
                          <TableHead className="text-right">Revenus</TableHead>
                          <TableHead className="text-right">Conversion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.productPerformance.slice(0, 5).map((product, index) => (
                          <motion.tr
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                                  {index + 1}
                                </Badge>
                                <span className="font-medium line-clamp-1">{product.title}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                                {product.views}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="secondary">{product.sales}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatPrice(product.revenue)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Progress value={product.conversionRate} className="w-16 h-2" />
                                <span className="text-sm text-muted-foreground w-12">
                                  {product.conversionRate.toFixed(1)}%
                                </span>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Aucune donnée de produit disponible</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Sources de trafic
                  </CardTitle>
                  <CardDescription>
                    D'où viennent vos visiteurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics.trafficSources && analytics.trafficSources.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.trafficSources.map((source, index) => (
                        <motion.div
                          key={source.source}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-24 text-sm font-medium truncate">{source.source}</div>
                          <div className="flex-1">
                            <div className="h-6 bg-secondary rounded-md overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${source.percentage}%` }}
                                transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                className="h-full rounded-md"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                            </div>
                          </div>
                          <div className="w-16 text-right text-sm font-medium">{source.visits}</div>
                          <div className="w-14 text-right text-xs text-muted-foreground">{source.percentage.toFixed(1)}%</div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Globe className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Pas encore de données de trafic</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Orders by Day Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Volume de commandes
                  </CardTitle>
                  <CardDescription>
                    Nombre de commandes par jour
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.revenueByDay}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar 
                          dataKey="orders" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Analytics;
