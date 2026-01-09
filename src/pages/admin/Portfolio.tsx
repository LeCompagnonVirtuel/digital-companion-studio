import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  GripVertical,
  X,
  Upload,
  ExternalLink
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { 
  usePortfolioProjects, 
  serviceCategories,
  type PortfolioProject,
  type PortfolioProjectInsert 
} from "@/hooks/usePortfolioProjects";
import { Link } from "react-router-dom";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const AdminPortfolio = () => {
  const { projects, isLoading, createProject, updateProject, deleteProject, uploadImage } = usePortfolioProjects(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState<PortfolioProjectInsert>({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    client: '',
    service_category: 'developpement-web',
    featured_image: '',
    images: [],
    status: 'draft',
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      short_description: '',
      client: '',
      service_category: 'developpement-web',
      featured_image: '',
      images: [],
      status: 'draft',
      display_order: projects.length,
    });
    setSelectedProject(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: PortfolioProject) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description || '',
      short_description: project.short_description || '',
      client: project.client || '',
      service_category: project.service_category,
      featured_image: project.featured_image || '',
      images: project.images || [],
      status: project.status,
      display_order: project.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: selectedProject ? prev.slug : generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isFeatured = false) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    setIsUploading(false);

    if (isFeatured && uploadedUrls.length > 0) {
      setFormData(prev => ({ ...prev, featured_image: uploadedUrls[0] }));
    } else {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    
    if (selectedProject) {
      await updateProject(selectedProject.id, formData);
    } else {
      await createProject(formData);
    }

    setIsSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    await deleteProject(selectedProject.id);
    setIsDeleteDialogOpen(false);
    setSelectedProject(null);
  };

  const toggleStatus = async (project: PortfolioProject) => {
    await updateProject(project.id, {
      status: project.status === 'published' ? 'draft' : 'published',
    });
  };

  const getCategoryLabel = (value: string) => {
    return serviceCategories.find(c => c.value === value)?.label || value;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Gérez vos réalisations et projets</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/portfolio" target="_blank">
                <ExternalLink size={18} className="mr-2" />
                Voir le site
              </Link>
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus size={18} className="mr-2" />
              Nouveau projet
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">Aucun projet</h3>
            <p className="text-muted-foreground mb-4">
              Commencez par ajouter votre première réalisation
            </p>
            <Button onClick={openCreateDialog}>
              <Plus size={18} className="mr-2" />
              Ajouter un projet
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-elevated transition-all"
                >
                  {/* Image */}
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.featured_image ? (
                      <img 
                        src={project.featured_image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={48} className="text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                        {project.status === 'published' ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button size="sm" variant="secondary" onClick={() => openEditDialog(project)}>
                        <Pencil size={16} className="mr-1" />
                        Modifier
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => toggleStatus(project)}
                      >
                        {project.status === 'published' ? (
                          <><EyeOff size={16} className="mr-1" /> Masquer</>
                        ) : (
                          <><Eye size={16} className="mr-1" /> Publier</>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold truncate">{project.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {getCategoryLabel(project.service_category)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedProject(project);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    {project.client && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Client : {project.client}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? 'Modifier le projet' : 'Nouveau projet'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Nom du projet"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="nom-du-projet"
              />
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service associé *</Label>
                <Select
                  value={formData.service_category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, service_category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Client */}
            <div className="space-y-2">
              <Label htmlFor="client">Client (optionnel)</Label>
              <Input
                id="client"
                value={formData.client || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="Nom du client"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="short_description">Description courte</Label>
              <Input
                id="short_description"
                value={formData.short_description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                placeholder="Résumé en une ligne"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez le projet, les défis, les solutions..."
                rows={5}
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label>Image principale</Label>
              <div className="flex items-center gap-4">
                {formData.featured_image ? (
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={formData.featured_image} 
                      alt="Featured" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : null}
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload size={18} />
                  <span className="text-sm">{isUploading ? 'Upload...' : 'Choisir une image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, true)}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <Label>Galerie d'images</Label>
              <div className="flex flex-wrap gap-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                    <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 flex flex-col items-center justify-center rounded-lg border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload size={20} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, false)}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !formData.title.trim()}>
              {isSubmitting ? 'Enregistrement...' : selectedProject ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le projet "{selectedProject?.title}" sera définitivement supprimé.
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
    </AdminLayout>
  );
};

export default AdminPortfolio;
