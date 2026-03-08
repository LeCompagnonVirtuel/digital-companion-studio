import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import { useSystemAlerts } from '@/hooks/useSystemAlerts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Activity, Database, HardDrive, Shield, Users, ShoppingBag,
  RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock, Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const severityConfig: Record<string, { color: string; icon: any }> = {
  critical: { color: 'bg-destructive text-destructive-foreground', icon: XCircle },
  high: { color: 'bg-orange-500 text-white', icon: AlertTriangle },
  medium: { color: 'bg-yellow-500 text-white', icon: AlertTriangle },
  low: { color: 'bg-blue-500 text-white', icon: Activity },
};

const statusConfig: Record<string, string> = {
  open: 'bg-destructive/10 text-destructive border-destructive/20',
  acknowledged: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  resolved: 'bg-green-500/10 text-green-700 border-green-500/20',
};

function ServiceCard({ name, icon: Icon, status, responseTime }: {
  name: string; icon: any; status?: string; responseTime?: number;
}) {
  const isHealthy = status === 'healthy';
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isHealthy ? 'bg-green-500/10' : 'bg-destructive/10'}`}>
          <Icon className={`w-6 h-6 ${isHealthy ? 'text-green-600' : 'text-destructive'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{name}</p>
          <div className="flex items-center gap-2 mt-1">
            {isHealthy ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-xs font-medium ${isHealthy ? 'text-green-600' : 'text-destructive'}`}>
              {isHealthy ? 'Opérationnel' : status === 'error' ? 'Erreur' : 'Inconnu'}
            </span>
          </div>
        </div>
        {responseTime != null && (
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">{responseTime}ms</p>
            <p className="text-xs text-muted-foreground">Réponse</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const Monitoring = () => {
  const { health, isLoading: healthLoading, refetch, isFetching } = useSystemHealth();
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { alerts, isLoading: alertsLoading, resolveAlert, acknowledgeAlert, stats } = useSystemAlerts({
    alert_type: typeFilter,
    severity: severityFilter,
    status: statusFilter,
  });

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Monitoring</h1>
              <p className="text-muted-foreground text-sm">État du système et alertes en temps réel</p>
            </div>
            <Button onClick={() => refetch()} disabled={isFetching} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
              Vérifier maintenant
            </Button>
          </div>

          {/* Health Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard
              name="Base de données"
              icon={Database}
              status={health?.services.database?.status}
              responseTime={health?.services.database?.response_time_ms}
            />
            <ServiceCard
              name="Stockage"
              icon={HardDrive}
              status={health?.services.storage?.status}
              responseTime={health?.services.storage?.response_time_ms}
            />
            <ServiceCard
              name="Authentification"
              icon={Shield}
              status={health?.services.auth?.status}
              responseTime={health?.services.auth?.response_time_ms}
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-2xl font-bold text-foreground">{health?.active_visitors ?? '—'}</p>
                <p className="text-xs text-muted-foreground">Visiteurs (5 min)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ShoppingBag className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-2xl font-bold text-foreground">{health?.orders_24h ?? '—'}</p>
                <p className="text-xs text-muted-foreground">Commandes (24h)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-2xl font-bold text-foreground">{health?.total_response_time_ms ?? '—'}ms</p>
                <p className="text-xs text-muted-foreground">Temps total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Activity className={`w-5 h-5 mx-auto mb-1 ${health?.overall_status === 'healthy' ? 'text-green-600' : 'text-destructive'}`} />
                <p className={`text-2xl font-bold ${health?.overall_status === 'healthy' ? 'text-green-600' : 'text-destructive'}`}>
                  {health?.overall_status === 'healthy' ? '✓' : '⚠'}
                </p>
                <p className="text-xs text-muted-foreground">Statut global</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertes système
                </CardTitle>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="destructive">{stats.criticalOpen} critiques</Badge>
                  <Badge variant="secondary">{stats.totalOpen} ouvertes</Badge>
                  <Badge className="bg-green-500/10 text-green-700 border-green-500/20">{stats.resolvedToday} résolues aujourd'hui</Badge>
                </div>
              </div>
              {/* Filters */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="payment_error">Paiement</SelectItem>
                    <SelectItem value="api_error">API</SelectItem>
                    <SelectItem value="db_error">Base de données</SelectItem>
                    <SelectItem value="page_error">Page</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Sévérité" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="low">Basse</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="open">Ouvert</SelectItem>
                    <SelectItem value="acknowledged">Vu</SelectItem>
                    <SelectItem value="resolved">Résolu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {alertsLoading ? (
                <p className="text-muted-foreground text-sm py-8 text-center">Chargement...</p>
              ) : alerts.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
                  <p className="text-muted-foreground">Aucune alerte — tout fonctionne correctement</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sévérité</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alerts.map((alert) => {
                        const sev = severityConfig[alert.severity] || severityConfig.medium;
                        return (
                          <TableRow key={alert.id}>
                            <TableCell>
                              <Badge className={sev.color}>{alert.severity}</Badge>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-sm">{alert.title}</p>
                              {alert.message && (
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{alert.message}</p>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="text-xs text-muted-foreground">{alert.alert_type}</span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(alert.created_at), 'dd MMM HH:mm', { locale: fr })}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={statusConfig[alert.status] || ''}>
                                {alert.status === 'open' ? 'Ouvert' : alert.status === 'acknowledged' ? 'Vu' : 'Résolu'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {alert.status === 'open' && (
                                  <>
                                    <Button
                                      variant="ghost" size="icon"
                                      onClick={() => acknowledgeAlert.mutate(alert.id)}
                                      title="Marquer comme vu"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost" size="icon"
                                      onClick={() => resolveAlert.mutate(alert.id)}
                                      title="Résoudre"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    </Button>
                                  </>
                                )}
                                {alert.status === 'acknowledged' && (
                                  <Button
                                    variant="ghost" size="icon"
                                    onClick={() => resolveAlert.mutate(alert.id)}
                                    title="Résoudre"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Monitoring;
