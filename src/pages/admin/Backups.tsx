import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Database, Download, RefreshCw, RotateCcw, Shield, Clock, HardDrive } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Backup {
  id: string;
  type: string;
  status: string;
  size_bytes: number;
  file_path: string;
  tables_included: string[];
  created_by: string;
  error_message: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  completed_at: string | null;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const Backups = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBackups = async () => {
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setBackups(data as unknown as Backup[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBackups(); }, []);

  const handleCreateBackup = async () => {
    setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Non authentifié');

      const { data, error } = await supabase.functions.invoke('create-backup', {
        body: { type: 'manual' },
      });

      if (error) throw error;

      toast({ title: '✅ Sauvegarde créée', description: 'La sauvegarde a été créée avec succès.' });
      fetchBackups();
    } catch (err: unknown) {
      toast({ title: 'Erreur', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = async (backup: Backup) => {
    try {
      const { data, error } = await supabase.storage
        .from('backups')
        .download(backup.file_path);

      if (error || !data) throw new Error('Téléchargement échoué');

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = backup.file_path;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      toast({ title: 'Erreur', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handleRestore = async (backupId: string) => {
    setRestoringId(backupId);
    try {
      const { data, error } = await supabase.functions.invoke('restore-backup', {
        body: { backup_id: backupId },
      });

      if (error) throw error;

      toast({ title: '✅ Restauration terminée', description: 'Les données ont été restaurées avec succès.' });
      fetchBackups();
    } catch (err: unknown) {
      toast({ title: 'Erreur de restauration', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setRestoringId(null);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">✅ Complété</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">⏳ En cours</Badge>;
      case 'failed':
        return <Badge variant="destructive">❌ Échoué</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Sauvegardes
            </h1>
            <p className="text-muted-foreground mt-1">Gérez les sauvegardes de votre base de données</p>
          </div>
          <Button onClick={handleCreateBackup} disabled={creating} className="gap-2">
            {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {creating ? 'Création en cours...' : 'Créer une sauvegarde'}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{backups.length}</p>
                  <p className="text-sm text-muted-foreground">Sauvegardes totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {backups[0] ? format(new Date(backups[0].created_at), 'dd/MM HH:mm') : '—'}
                  </p>
                  <p className="text-sm text-muted-foreground">Dernière sauvegarde</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <HardDrive className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatBytes(backups.reduce((sum, b) => sum + (b.size_bytes || 0), 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Espace total utilisé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backups Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des sauvegardes</CardTitle>
            <CardDescription>Liste de toutes les sauvegardes créées</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : backups.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucune sauvegarde pour le moment</p>
                <p className="text-sm mt-1">Créez votre première sauvegarde ci-dessus</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Créé par</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">
                          {format(new Date(backup.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {backup.type === 'manual' ? '🖐 Manuel' : backup.type === 'daily' ? '📅 Quotidien' : '📆 Hebdo'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatBytes(backup.size_bytes || 0)}</TableCell>
                        <TableCell>{statusBadge(backup.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{backup.created_by || '—'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownload(backup)}
                              title="Télécharger"
                            >
                              <Download className="w-4 h-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={restoringId === backup.id}
                                  title="Restaurer"
                                >
                                  {restoringId === backup.id ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <RotateCcw className="w-4 h-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>⚠️ Restaurer cette sauvegarde ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action va écraser les données actuelles avec celles de la sauvegarde du{' '}
                                    {format(new Date(backup.created_at), 'dd MMM yyyy à HH:mm', { locale: fr })}.
                                    <br /><br />
                                    <strong>Cette action est irréversible.</strong> Il est recommandé de créer une sauvegarde avant de restaurer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRestore(backup.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Restaurer maintenant
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
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

export default Backups;
