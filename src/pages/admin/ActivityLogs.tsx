import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollText, Filter, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ActivityLog {
  id: string;
  admin_email: string;
  action: string;
  action_type: string;
  resource_type: string | null;
  resource_id: string | null;
  page: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

const ACTION_TYPES = [
  { value: 'all', label: 'Tous les types' },
  { value: 'auth', label: '🔐 Connexion' },
  { value: 'product', label: '📦 Produit' },
  { value: 'order', label: '🛒 Commande' },
  { value: 'settings', label: '⚙️ Paramètres' },
  { value: 'maintenance', label: '🔧 Maintenance' },
  { value: 'backup', label: '💾 Sauvegarde' },
  { value: 'content', label: '📝 Contenu' },
  { value: 'other', label: '📋 Autre' },
];

const actionTypeBadge = (type: string) => {
  const map: Record<string, { className: string; label: string }> = {
    auth: { className: 'bg-blue-500/10 text-blue-600 border-blue-500/20', label: '🔐 Auth' },
    product: { className: 'bg-purple-500/10 text-purple-600 border-purple-500/20', label: '📦 Produit' },
    order: { className: 'bg-orange-500/10 text-orange-600 border-orange-500/20', label: '🛒 Commande' },
    settings: { className: 'bg-gray-500/10 text-gray-600 border-gray-500/20', label: '⚙️ Paramètres' },
    maintenance: { className: 'bg-red-500/10 text-red-600 border-red-500/20', label: '🔧 Maintenance' },
    backup: { className: 'bg-green-500/10 text-green-600 border-green-500/20', label: '💾 Backup' },
    content: { className: 'bg-teal-500/10 text-teal-600 border-teal-500/20', label: '📝 Contenu' },
  };
  const entry = map[type] || { className: 'bg-muted text-muted-foreground', label: type };
  return <Badge className={entry.className}>{entry.label}</Badge>;
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (filterType !== 'all') {
      query = query.eq('action_type', filterType);
    }
    if (filterEmail.trim()) {
      query = query.ilike('admin_email', `%${filterEmail.trim()}%`);
    }
    if (filterDate) {
      query = query.gte('created_at', `${filterDate}T00:00:00`).lte('created_at', `${filterDate}T23:59:59`);
    }

    const { data } = await query;
    setLogs((data as unknown as ActivityLog[]) || []);
    setLoading(false);
  }, [filterType, filterEmail, filterDate]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ScrollText className="w-6 h-6 text-primary" />
            Journal d'activité admin
          </h1>
          <p className="text-muted-foreground mt-1">Historique de toutes les actions administratives</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Type d'action" />
                </SelectTrigger>
                <SelectContent>
                  {ACTION_TYPES.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Filtrer par email admin..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                className="w-full sm:w-[250px]"
              />
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full sm:w-[180px]"
              />
              <Button variant="outline" size="icon" onClick={fetchLogs}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>{logs.length} entrée{logs.length !== 1 ? 's' : ''} trouvée{logs.length !== 1 ? 's' : ''}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ScrollText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucune activité enregistrée</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Page</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap text-sm">
                          {format(new Date(log.created_at), 'dd MMM yyyy HH:mm:ss', { locale: fr })}
                        </TableCell>
                        <TableCell className="text-sm font-medium">{log.admin_email}</TableCell>
                        <TableCell>{actionTypeBadge(log.action_type)}</TableCell>
                        <TableCell className="text-sm max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.page || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ActivityLogs;
