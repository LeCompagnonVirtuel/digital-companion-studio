import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsStat {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const Analytics = () => {
  const [period, setPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated analytics data - in production, this would come from a real analytics service
  const stats: AnalyticsStat[] = [
    { 
      label: 'Visiteurs uniques', 
      value: '2,847', 
      change: 12.5, 
      icon: Users,
      color: 'text-blue-500'
    },
    { 
      label: 'Pages vues', 
      value: '8,432', 
      change: 8.3, 
      icon: Eye,
      color: 'text-green-500'
    },
    { 
      label: 'Durée moyenne', 
      value: '3:24', 
      change: -2.1, 
      icon: Clock,
      color: 'text-amber-500'
    },
    { 
      label: 'Taux de rebond', 
      value: '42.3%', 
      change: -5.8, 
      icon: MousePointer,
      color: 'text-purple-500'
    },
  ];

  const topPages = [
    { path: '/', name: 'Accueil', views: 3245, change: 15.2 },
    { path: '/services', name: 'Services', views: 1856, change: 8.4 },
    { path: '/portfolio', name: 'Portfolio', views: 1432, change: 22.1 },
    { path: '/contact', name: 'Contact', views: 987, change: 5.6 },
    { path: '/pricing', name: 'Tarifs', views: 654, change: -3.2 },
  ];

  const trafficSources = [
    { source: 'Recherche organique', value: 45, color: 'bg-green-500' },
    { source: 'Direct', value: 28, color: 'bg-blue-500' },
    { source: 'Réseaux sociaux', value: 18, color: 'bg-purple-500' },
    { source: 'Référent', value: 9, color: 'bg-amber-500' },
  ];

  const deviceStats = [
    { device: 'Desktop', icon: Monitor, percentage: 58, sessions: 1651 },
    { device: 'Mobile', icon: Smartphone, percentage: 38, sessions: 1082 },
    { device: 'Tablet', icon: Monitor, percentage: 4, sessions: 114 },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Statistiques
              </h1>
              <p className="text-muted-foreground mt-1">
                Analysez les performances de votre site
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 heures</SelectItem>
                  <SelectItem value="7d">7 jours</SelectItem>
                  <SelectItem value="30d">30 jours</SelectItem>
                  <SelectItem value="90d">90 jours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/30 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm ${
                          stat.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.change >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {Math.abs(stat.change)}%
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Pages les plus visitées
                </CardTitle>
                <CardDescription>
                  Top 5 des pages par nombre de vues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <motion.div
                      key={page.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{page.name}</p>
                          <p className="text-xs text-muted-foreground">{page.path}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{page.views.toLocaleString()}</p>
                        <p className={`text-xs ${page.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {page.change >= 0 ? '+' : ''}{page.change}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <motion.div
                      key={source.source}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span>{source.source}</span>
                        <span className="font-medium">{source.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${source.value}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className={`h-full ${source.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Devices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Appareils utilisés
              </CardTitle>
              <CardDescription>
                Répartition des sessions par type d'appareil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                {deviceStats.map((device, index) => (
                  <motion.div
                    key={device.device}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <device.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                    <p className="text-3xl font-bold">{device.percentage}%</p>
                    <p className="text-sm text-muted-foreground mt-1">{device.device}</p>
                    <Badge variant="secondary" className="mt-2">
                      {device.sessions.toLocaleString()} sessions
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Notice */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Connecter Google Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pour des statistiques plus détaillées et en temps réel, connectez votre compte Google Analytics 4.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Configurer l'intégration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Analytics;