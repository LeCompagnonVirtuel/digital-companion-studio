import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  Users,
  UserPlus,
  TrendingUp,
  Clock,
  Globe,
  Rocket,
  FileText,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusOptions = [
  { value: 'new', label: 'Nouveau', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { value: 'contacted', label: 'Contacté', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { value: 'qualified', label: 'Qualifié', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { value: 'converted', label: 'Converti', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { value: 'lost', label: 'Perdu', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
];

const sourceConfig: Record<string, { label: string; icon: typeof Mail }> = {
  'audit': { label: 'Audit', icon: Search },
  'audit-gratuit': { label: 'Audit gratuit', icon: Search },
  'project': { label: 'Projet', icon: Rocket },
  'demarrer-projet': { label: 'Projet', icon: Rocket },
  'contact': { label: 'Contact', icon: Mail },
  'devis': { label: 'Devis', icon: FileText },
  'website': { label: 'Site web', icon: Globe },
};

type SortField = 'created_at' | 'name' | 'status';
type SortDir = 'asc' | 'desc';

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel('leads-admin-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload) => {
        if (payload.eventType === 'INSERT') setLeads((prev) => [payload.new as Lead, ...prev]);
        else if (payload.eventType === 'UPDATE') setLeads((prev) => prev.map((l) => l.id === (payload.new as Lead).id ? payload.new as Lead : l));
        else if (payload.eventType === 'DELETE') setLeads((prev) => prev.filter((l) => l.id !== (payload.old as { id: string }).id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les leads" });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company && l.company.toLowerCase().includes(q)));
    }
    if (statusFilter !== 'all') result = result.filter(l => l.status === statusFilter);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'created_at') cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [leads, searchQuery, statusFilter, sortField, sortDir]);

  // KPI calculations
  const kpis = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const newThisWeek = leads.filter(l => l.status === 'new' && new Date(l.created_at) >= weekAgo).length;
    const converted = leads.filter(l => l.status === 'converted').length;
    const rate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;
    return [
      { label: 'Total leads', value: leads.length, icon: Users, color: 'primary' },
      { label: 'Nouveaux (7j)', value: newThisWeek, icon: UserPlus, color: 'blue' },
      { label: 'Taux conversion', value: `${rate}%`, icon: TrendingUp, color: 'green' },
      { label: 'Non traités', value: leads.filter(l => l.status === 'new').length, icon: Clock, color: 'amber' },
    ];
  }, [leads]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: newStatus } : l));
      toast({ title: "Statut mis à jour", description: `Lead marqué comme "${statusOptions.find(s => s.value === newStatus)?.label}"` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de mettre à jour le statut" });
    }
  };

  const updateLeadNotes = async () => {
    if (!selectedLead) return;
    try {
      const { error } = await supabase.from('leads').update({ notes }).eq('id', selectedLead.id);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => l.id === selectedLead.id ? { ...l, notes } : l));
      toast({ title: "Notes sauvegardées" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de sauvegarder les notes" });
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Nom', 'Email', 'Téléphone', 'Entreprise', 'Statut', 'Source', 'Date'].join(','),
      ...filteredLeads.map((l) => [l.name, l.email, l.phone || '', l.company || '', l.status, l.source || '', new Date(l.created_at).toLocaleDateString('fr-FR')].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast({ title: "Export réussi", description: `${filteredLeads.length} leads exportés` });
  };

  const getStatusBadge = (status: string) => {
    const opt = statusOptions.find(s => s.value === status);
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${opt?.color || 'bg-muted text-muted-foreground'}`}>{opt?.label || status}</span>;
  };

  const getSourceBadge = (source: string | null) => {
    const c = sourceConfig[source || ''] || { label: source || 'Direct', icon: Globe };
    const Icon = c.icon;
    return (
      <span className="px-2 py-0.5 rounded-md text-[11px] bg-muted text-muted-foreground flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {c.label}
      </span>
    );
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getColorClass = (color: string) => {
    const m: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500' },
      amber: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    };
    return m[color] || m.primary;
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Gestion des leads</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} 
                {statusFilter !== 'all' && ` • Filtre: ${statusOptions.find(s => s.value === statusFilter)?.label}`}
              </p>
            </div>
            <Button onClick={exportLeads} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter CSV
            </Button>
          </motion.div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kpis.map((kpi, i) => {
              const cc = getColorClass(kpi.color);
              return (
                <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="border-border/50 hover:border-primary/20 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cc.bg}`}>
                          <kpi.icon className={`w-5 h-5 ${cc.text}`} />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-foreground">{isLoading ? <span className="inline-block w-8 h-5 bg-muted animate-pulse rounded" /> : kpi.value}</p>
                          <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Filters */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Rechercher par nom, email ou entreprise..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    {statusOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  {(['created_at', 'name', 'status'] as SortField[]).map(field => (
                    <Button key={field} variant={sortField === field ? 'secondary' : 'ghost'} size="sm" onClick={() => toggleSort(field)} className="text-xs gap-1">
                      <ArrowUpDown className="w-3 h-3" />
                      {field === 'created_at' ? 'Date' : field === 'name' ? 'Nom' : 'Statut'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4 p-3">
                      <div className="w-10 h-10 bg-muted rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4" />
                        <div className="h-3 bg-muted rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-16">
                  <Mail className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="font-medium text-foreground">Aucun lead trouvé</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery || statusFilter !== 'all' ? 'Modifiez vos filtres' : 'Les leads apparaîtront ici en temps réel'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {filteredLeads.map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.03, 0.3) }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => { setSelectedLead(lead); setNotes(lead.notes || ''); setIsDetailsOpen(true); }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-semibold">{lead.name[0].toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-semibold text-foreground text-sm truncate">{lead.name}</p>
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 truncate"><Mail className="w-3 h-3 shrink-0" />{lead.email}</span>
                          {lead.company && <span className="hidden md:flex items-center gap-1 truncate"><Building className="w-3 h-3 shrink-0" />{lead.company}</span>}
                        </div>
                        <div className="mt-1">{getSourceBadge(lead.source)}</div>
                      </div>
                      <div className="hidden lg:block text-xs text-muted-foreground text-right">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(lead.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon-sm" className="shrink-0"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {statusOptions.map((o) => (
                            <DropdownMenuItem key={o.value} onClick={(e) => { e.stopPropagation(); updateLeadStatus(lead.id, o.value); }} className={lead.status === o.value ? 'bg-secondary' : ''}>
                              Marquer comme {o.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lead Details Dialog */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{selectedLead?.name[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="block">{selectedLead?.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{selectedLead && formatDate(selectedLead.created_at)}</span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              {selectedLead && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" />{selectedLead.email}</p>
                    </div>
                    {selectedLead.phone && (
                      <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Téléphone</p>
                        <p className="text-sm font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground" />{selectedLead.phone}</p>
                      </div>
                    )}
                    {selectedLead.company && (
                      <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Entreprise</p>
                        <p className="text-sm font-medium flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-muted-foreground" />{selectedLead.company}</p>
                      </div>
                    )}
                    <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Source</p>
                      {getSourceBadge(selectedLead.source)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Statut</p>
                    <Select value={selectedLead.status} onValueChange={(v) => { updateLeadStatus(selectedLead.id, v); setSelectedLead({ ...selectedLead, status: v }); }}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedLead.message && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MessageSquare className="w-3 h-3" />Message</p>
                      <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg leading-relaxed">{selectedLead.message}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Notes internes</p>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ajoutez des notes..." rows={3} />
                    <Button onClick={updateLeadNotes} size="sm">Sauvegarder</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Leads;
