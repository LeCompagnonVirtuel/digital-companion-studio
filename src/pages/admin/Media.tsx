import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Search,
  Grid,
  List,
  Copy,
  Check,
  X,
  FileImage,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';

interface MediaFile {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text: string | null;
  created_at: string;
  url: string;
}

const Media = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleteFile, setDeleteFile] = useState<MediaFile | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editAltText, setEditAltText] = useState('');
  const { toast } = useToast();

  const fetchFiles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get public URLs for all files
      const filesWithUrls = (data || []).map(file => ({
        ...file,
        url: supabase.storage.from('media').getPublicUrl(file.file_path).data.publicUrl
      }));

      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les fichiers.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchFiles();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('media-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'media',
        },
        (payload) => {
          console.log('Media changed:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newFile = payload.new as MediaFile & { file_path: string };
            const url = supabase.storage.from('media').getPublicUrl(newFile.file_path).data.publicUrl;
            setFiles((prev) => [{ ...newFile, url }, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedFile = payload.new as MediaFile & { file_path: string };
            const url = supabase.storage.from('media').getPublicUrl(updatedFile.file_path).data.publicUrl;
            setFiles((prev) => prev.map((f) => (f.id === updatedFile.id ? { ...updatedFile, url } : f)));
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setFiles((prev) => prev.filter((f) => f.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles || uploadFiles.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(uploadFiles)) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Type non supporté",
            description: `${file.name} n'est pas un format d'image supporté.`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Fichier trop volumineux",
            description: `${file.name} dépasse la limite de 5MB.`,
            variant: "destructive",
          });
          continue;
        }

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const filePath = `uploads/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('media')
          .insert({
            name: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type,
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Upload réussi",
        description: "Les fichiers ont été téléchargés avec succès.",
      });

      fetchFiles();
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        title: "Erreur d'upload",
        description: "Une erreur est survenue lors du téléchargement.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteFile) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([deleteFile.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', deleteFile.id);

      if (dbError) throw dbError;

      toast({
        title: "Fichier supprimé",
        description: "Le fichier a été supprimé avec succès.",
      });

      setFiles(files.filter(f => f.id !== deleteFile.id));
      setDeleteFile(null);
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le fichier.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAltText = async () => {
    if (!selectedFile) return;

    try {
      const { error } = await supabase
        .from('media')
        .update({ alt_text: editAltText })
        .eq('id', selectedFile.id);

      if (error) throw error;

      setFiles(files.map(f => 
        f.id === selectedFile.id ? { ...f, alt_text: editAltText } : f
      ));

      toast({
        title: "Texte alt mis à jour",
        description: "Le texte alternatif a été enregistré.",
      });

      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating alt text:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le texte alt.",
        variant: "destructive",
      });
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "URL copiée" });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSize = files.reduce((acc, f) => acc + f.file_size, 0);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Médiathèque
              </h1>
              <p className="text-muted-foreground mt-1">
                {files.length} fichier{files.length > 1 ? 's' : ''} • {formatFileSize(totalSize)}
              </p>
            </div>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Button disabled={isUploading}>
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {isUploading ? 'Upload...' : 'Ajouter des fichiers'}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Zone */}
          <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <label htmlFor="file-upload-zone" className="block cursor-pointer">
                <div className="text-center py-8">
                  <FileImage className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-1">Glissez-déposez vos images ici</p>
                  <p className="text-sm text-muted-foreground">
                    ou cliquez pour sélectionner (JPG, PNG, GIF, WebP, SVG - max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="file-upload-zone"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </CardContent>
          </Card>

          {/* Files Display */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredFiles.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Aucun fichier trouvé</p>
                  <p className="text-sm mt-1">Commencez par uploader des images</p>
                </div>
              </CardContent>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {filteredFiles.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/50 bg-secondary/30 cursor-pointer transition-all"
                    onClick={() => {
                      setSelectedFile(file);
                      setEditAltText(file.alt_text || '');
                    }}
                  >
                    <img
                      src={file.url}
                      alt={file.alt_text || file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-background text-xs font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-background/70 text-xs">
                          {formatFileSize(file.file_size)}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(file.url, file.id);
                        }}
                      >
                        {copiedId === file.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="w-8 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteFile(file);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {filteredFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedFile(file);
                        setEditAltText(file.alt_text || '');
                      }}
                    >
                      <img
                        src={file.url}
                        alt={file.alt_text || file.name}
                        className="w-16 h-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>{formatDate(file.created_at)}</span>
                        </div>
                        {file.alt_text && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Alt: {file.alt_text}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyUrl(file.url, file.id);
                          }}
                        >
                          {copiedId === file.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteFile(file);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* File Details Dialog */}
          <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Détails du fichier</DialogTitle>
                <DialogDescription>{selectedFile?.name}</DialogDescription>
              </DialogHeader>
              {selectedFile && (
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.alt_text || selectedFile.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Taille</p>
                      <p className="font-medium">{formatFileSize(selectedFile.file_size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{selectedFile.mime_type}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Date d'upload</p>
                      <p className="font-medium">{formatDate(selectedFile.created_at)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Texte alternatif (SEO)</Label>
                    <Input
                      value={editAltText}
                      onChange={(e) => setEditAltText(e.target.value)}
                      placeholder="Description de l'image pour l'accessibilité et le SEO"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL publique</Label>
                    <div className="flex gap-2">
                      <Input value={selectedFile.url} readOnly className="font-mono text-xs" />
                      <Button
                        variant="outline"
                        onClick={() => copyUrl(selectedFile.url, selectedFile.id)}
                      >
                        {copiedId === selectedFile.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedFile(null)}>
                  Fermer
                </Button>
                <Button onClick={handleUpdateAltText}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <AlertDialog open={!!deleteFile} onOpenChange={() => setDeleteFile(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer ce fichier ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le fichier "{deleteFile?.name}" sera définitivement supprimé.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Media;