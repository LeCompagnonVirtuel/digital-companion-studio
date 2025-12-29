import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  conversionRate: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
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

      setStats({
        totalLeads: total,
        newLeads: newCount,
        convertedLeads: converted,
        conversionRate: rate,
      });

      setRecentLeads(leads?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      color: 'primary',
    },
    {
      title: 'Nouveaux',
      value: stats.newLeads,
      icon: Mail,
      trend: '+8%',
      trendUp: true,
      color: 'accent',
    },
    {
      title: 'Convertis',
      value: stats.convertedLeads,
      icon: TrendingUp,
      trend: '+15%',
      trendUp: true,
      color: 'gold',
    },
    {
      title: 'Taux de conversion',
      value: `${stats.conversionRate}%`,
      icon: Eye,
      trend: stats.conversionRate > 10 ? '+2%' : '-1%',
      trendUp: stats.conversionRate > 10,
      color: 'primary',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      qualified: 'bg-purple-100 text-purple-700',
      converted: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700',
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue ! Voici un aperçu de votre activité.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {isLoading ? '-' : stat.value}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'primary' ? 'bg-primary/10' :
                        stat.color === 'accent' ? 'bg-accent/10' :
                        'bg-gold/10'
                      }`}>
                        <stat.icon className={`w-6 h-6 ${
                          stat.color === 'primary' ? 'text-primary' :
                          stat.color === 'accent' ? 'text-accent' :
                          'text-gold'
                        }`} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1">
                      {stat.trendUp ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trendUp ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        vs mois dernier
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-display">
                  Leads récents
                </CardTitle>
                <a 
                  href="/admin/leads"
                  className="text-sm text-primary hover:underline"
                >
                  Voir tout →
                </a>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-secondary rounded w-1/4" />
                          <div className="h-3 bg-secondary rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentLeads.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Aucun lead pour le moment</p>
                    <p className="text-sm text-muted-foreground/70">
                      Les nouveaux leads apparaîtront ici
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {lead.name[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {lead.name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {lead.email}
                          </p>
                        </div>
                        <div className="hidden sm:block">
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="text-right text-sm text-muted-foreground hidden md:block">
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
