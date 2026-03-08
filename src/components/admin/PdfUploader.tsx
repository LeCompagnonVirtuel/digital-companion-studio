import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProductFile {
  name: string;
  path: string;
  size: number;
  url: string;
}

interface PdfUploaderProps {
  productId: string;
  currentFiles: ProductFile[];
  onFilesChange: (files: ProductFile[]) => void;
  maxSizeMB?: number;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const PdfUploader = ({
  productId,
  currentFiles,
  onFilesChange,
  maxSizeMB = 50,
}: PdfUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const ALLOWED_TYPES = ["application/pdf"];
  const MAX_SIZE = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Seuls les fichiers PDF sont acceptés.";
    }
    if (file.size > MAX_SIZE) {
      return `Le fichier dépasse la limite de ${maxSizeMB} MB.`;
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);
    setUploadingFileName(file.name);

    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${productId}/${timestamp}-${safeName}`;

      // Simulate progress since Supabase SDK doesn't expose upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 15, 90));
      }, 200);

      const { data, error: uploadError } = await supabase.storage
        .from("product-files")
        .upload(filePath, file, {
          contentType: "application/pdf",
          upsert: false,
        });

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      setUploadProgress(100);

      const newFile: ProductFile = {
        name: file.name,
        path: data.path,
        size: file.size,
        url: filePath,
      };

      onFilesChange([...currentFiles, newFile]);

      toast({
        title: "Fichier uploadé",
        description: `${file.name} a été ajouté avec succès.`,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Erreur lors de l'upload.");
      toast({
        title: "Erreur d'upload",
        description: err.message || "Impossible d'uploader le fichier.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        setUploadingFileName("");
      }, 800);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) uploadFile(files[0]);
    },
    [currentFiles, productId]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) uploadFile(files[0]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (file: ProductFile) => {
    try {
      const { error } = await supabase.storage
        .from("product-files")
        .remove([file.path || file.url]);

      if (error) throw error;

      // Also remove from product_files table if productId is a real UUID
      if (productId && productId !== "new-product") {
        await supabase
          .from("product_files")
          .delete()
          .eq("product_id", productId)
          .eq("file_path", file.path || file.url);
      }

      onFilesChange(currentFiles.filter((f) => f.path !== file.path));
      toast({ title: "Fichier supprimé", description: `${file.name} a été supprimé.` });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const handleReplace = (file: ProductFile) => {
    // Delete old then open file picker
    handleDelete(file);
    fileInputRef.current?.click();
  };

  const getPreviewUrl = (file: ProductFile) => {
    const { data } = supabase.storage
      .from("product-files")
      .getPublicUrl(file.path || file.url);
    return data.publicUrl;
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border/60 hover:border-primary/40 hover:bg-muted/30"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <Loader2 className="w-10 h-10 text-primary mx-auto animate-spin" />
              <p className="text-sm font-medium">{uploadingFileName}</p>
              <Progress value={uploadProgress} className="h-2 max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}%</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  Glissez-déposez votre PDF ici
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ou cliquez pour parcourir · PDF uniquement · Max {maxSizeMB} MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* File List */}
      {currentFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Fichiers attachés ({currentFiles.length})
          </p>
          <AnimatePresence>
            {currentFiles.map((file, i) => (
              <motion.div
                key={file.path || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 p-3 bg-muted/40 border border-border/30 rounded-xl group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0">PDF</Badge>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); handleReplace(file); }}
                    title="Remplacer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={(e) => { e.stopPropagation(); handleDelete(file); }}
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
