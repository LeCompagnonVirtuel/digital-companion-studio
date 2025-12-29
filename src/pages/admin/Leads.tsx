import { useEffect, useState } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  { value: 'new', label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacté', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'qualified', label: 'Qualifié', color: 'bg-purple-100 text-purple-700' },
  { value: 'converted', label: 'Converti', color: 'bg-green-100 text-green-700' },
  { value: 'lost', label: 'Perdu', color: 'bg-red-100 text-red-700' },
];

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les leads",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          (lead.company && lead.company.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      toast({
        title: "Statut mis à jour",
        description: `Le lead a été marqué comme "${statusOptions.find(s => s.value === newStatus)?.label}"`,
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
      });
    }
  };

  const updateLeadNotes = async () => {
    if (!selectedLead) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', selectedLead.id);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, notes } : lead
        )
      );

      toast({
        title: "Notes sauvegardées",
        description: "Les notes ont été mises à jour",
      });
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les notes",
      });
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Nom', 'Email', 'Téléphone', 'Entreprise', 'Statut', 'Date'].join(','),
      ...filteredLeads.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.phone || '',
          lead.company || '',
          lead.status,
          new Date(lead.created_at).toLocaleDateString('fr-FR'),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "Export réussi",
      description: `${filteredLeads.length} leads exportés`,
    });
  };

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || '');
    setIsDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find((s) => s.value === status);
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${option?.color || 'bg-gray-100 text-gray-700'}`}>
        {option?.label || status}
      </span>
    );
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Gestion des leads
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} 
                {statusFilter !== 'all' && ` (filtre: ${statusOptions.find(s => s.value === statusFilter)?.label})`}
              </p>
            </div>
            <Button onClick={exportLeads} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter CSV
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email ou entreprise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4 p-4">
                      <div className="w-12 h-12 bg-secondary rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary rounded w-1/4" />
                        <div className="h-3 bg-secondary rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-16">
                  <Mail className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-lg font-medium text-foreground">Aucun lead trouvé</p>
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Essayez de modifier vos filtres' 
                      : 'Les leads apparaîtront ici quand vous en recevrez'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {filteredLeads.map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => openLeadDetails(lead)}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-semibold text-lg">
                          {lead.name[0].toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-foreground truncate">
                            {lead.name}
                          </p>
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            {lead.email}
                          </span>
                          {lead.company && (
                            <span className="hidden md:flex items-center gap-1 truncate">
                              <Building className="w-3.5 h-3.5 shrink-0" />
                              {lead.company}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="hidden lg:block text-sm text-muted-foreground text-right">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {statusOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateLeadStatus(lead.id, option.value);
                              }}
                              className={lead.status === option.value ? 'bg-secondary' : ''}
                            >
                              Marquer comme {option.label}
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
                    <span className="text-primary font-semibold">
                      {selectedLead?.name[0].toUpperCase()}
                    </span>
                  </div>
                  {selectedLead?.name}
                </DialogTitle>
              </DialogHeader>

              {selectedLead && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {selectedLead.email}
                      </p>
                    </div>
                    {selectedLead.phone && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Téléphone
                        </p>
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {selectedLead.phone}
                        </p>
                      </div>
                    )}
                    {selectedLead.company && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Entreprise
                        </p>
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          {selectedLead.company}
                        </p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Date
                      </p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(selectedLead.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Statut
                    </p>
                    <Select
                      value={selectedLead.status}
                      onValueChange={(value) => {
                        updateLeadStatus(selectedLead.id, value);
                        setSelectedLead({ ...selectedLead, status: value });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedLead.message && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Message
                      </p>
                      <p className="text-sm text-foreground bg-secondary/50 p-3 rounded-lg">
                        {selectedLead.message}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Notes internes
                    </p>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ajoutez des notes sur ce lead..."
                      rows={3}
                    />
                    <Button onClick={updateLeadNotes} size="sm">
                      Sauvegarder les notes
                    </Button>
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
