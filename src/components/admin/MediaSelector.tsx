import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Search,
  Check,
  X,
  Loader2,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
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

interface MediaSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string, altText?: string) => void;
  multiple?: boolean;
}

export const MediaSelector = ({ open, onOpenChange, onSelect, multiple = false }: MediaSelectorProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchFiles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const filesWithUrls = (data || []).map(file => ({
        ...file,
        url: supabase.storage.from('media').getPublicUrl(file.file_path).data.publicUrl
      }));

      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchFiles();
      setSelectedIds(new Set());
    }
  }, [open, fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles || uploadFiles.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(uploadFiles)) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) continue;
        if (file.size > 5 * 1024 * 1024) continue;

        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

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
        description: "Les fichiers ont été téléchargés.",
      });

      fetchFiles();
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const toggleSelection = (file: MediaFile) => {
    if (multiple) {
      const newSelected = new Set(selectedIds);
      if (newSelected.has(file.id)) {
        newSelected.delete(file.id);
      } else {
        newSelected.add(file.id);
      }
      setSelectedIds(newSelected);
    } else {
      onSelect(file.url, file.alt_text || undefined);
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    const selectedFiles = files.filter(f => selectedIds.has(f.id));
    if (selectedFiles.length > 0) {
      // For now, just return the first selected URL
      onSelect(selectedFiles[0].url, selectedFiles[0].alt_text || undefined);
    }
    onOpenChange(false);
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Sélectionner une image
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button variant="outline" disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune image trouvée</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
              <AnimatePresence>
                {filteredFiles.map((file, index) => {
                  const isSelected = selectedIds.has(file.id);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => toggleSelection(file)}
                      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        isSelected 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-transparent hover:border-primary/30'
                      }`}
                    >
                      <img
                        src={file.url}
                        alt={file.alt_text || file.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {multiple && selectedIds.size > 0 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedIds.size} image{selectedIds.size > 1 ? 's' : ''} sélectionnée{selectedIds.size > 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedIds(new Set())}>
                Désélectionner
              </Button>
              <Button onClick={handleConfirm}>
                Confirmer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};