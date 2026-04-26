import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Calendar,
  Tag,
  MoreVertical,
  ExternalLink,
  Copy,
  Loader2,
  BookOpen,
  PenTool,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useBlogPosts, BlogPostInput } from '@/hooks/useBlogPosts';

const categories = ['Tous', 'Design', 'SEO', 'Marketing', 'Développement', 'E-commerce', 'Général'];

const SeoIndicator = ({ value, min, max, label }: { value: number; min: number; max: number; label: string }) => {
  const isGood = value >= min && value <= max;
  const isWarn = value > 0 && (value < min || value > max);
  return (
    <span className={`text-[10px] tabular-nums ${isGood ? 'text-green-500' : isWarn ? 'text-amber-500' : 'text-muted-foreground'}`}>
      {label}: {value}/{max}
    </span>
  );
};

const Blog = () => {
  const { posts, isLoading, createPost, updatePost, deletePost } = useBlogPosts(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '', slug: '', excerpt: '', content: '', cover_image: '', category: 'Général', status: 'draft'
  });
  const { toast } = useToast();

  const filteredPosts = useMemo(() => posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = categoryFilter === 'Tous' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }), [posts, searchQuery, categoryFilter]);

  const kpis = useMemo(() => [
    { label: 'Total articles', value: posts.length, icon: BookOpen, color: 'primary' },
    { label: 'Publiés', value: posts.filter(p => p.status === 'published').length, icon: Eye, color: 'green' },
    { label: 'Brouillons', value: posts.filter(p => p.status === 'draft').length, icon: PenTool, color: 'amber' },
    { label: 'Vues totales', value: posts.reduce((a, p) => a + p.views, 0).toLocaleString(), icon: BarChart3, color: 'blue' },
  ], [posts]);

  const generateSlug = (title: string) => title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (title: string) => setFormData({ ...formData, title, slug: generateSlug(title) });

  const handleCreatePost = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({ variant: "destructive", title: "Erreur", description: "Le titre et le slug sont requis." });
      return;
    }
    setIsSaving(true);
    const result = await createPost(formData);
    setIsSaving(false);
    if (result) { setIsCreateDialogOpen(false); resetForm(); }
  };

  const handleUpdatePost = async () => {
    if (!editingPostId) return;
    setIsSaving(true);
    const result = await updatePost(editingPostId, formData);
    setIsSaving(false);
    if (result) { setEditingPostId(null); resetForm(); }
  };

  const handleDuplicatePost = async (post: typeof posts[0]) => {
    const dup: BlogPostInput = {
      title: `${post.title} (copie)`,
      slug: `${post.slug}-copie-${Date.now()}`,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image || '',
      category: post.category,
      status: 'draft',
    };
    const result = await createPost(dup);
    if (result) toast({ title: "Article dupliqué", description: "Le brouillon a été créé" });
  };

  const resetForm = () => setFormData({ title: '', slug: '', excerpt: '', content: '', cover_image: '', category: 'Général', status: 'draft' });

  const openEditDialog = (post: typeof posts[0]) => {
    setEditingPostId(post.id);
    setFormData({ title: post.title, slug: post.slug, excerpt: post.excerpt || '', content: post.content || '', cover_image: post.cover_image || '', category: post.category, status: post.status });
  };

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

  const getStatusBadge = (status: string) => status === 'published'
    ? <Badge className="bg-green-500/10 text-green-500 border-green-500/20 border">Publié</Badge>
    : <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 border">Brouillon</Badge>;

  const getColorClass = (color: string) => {
    const m: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500' },
      amber: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    };
    return m[color] || m.primary;
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="space-y-6">
            <div className="h-10 w-48 bg-muted animate-pulse rounded" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Gestion du Blog</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {posts.length} article{posts.length > 1 ? 's' : ''} • {posts.filter(p => p.status === 'published').length} publié{posts.filter(p => p.status === 'published').length > 1 ? 's' : ''}
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />Nouvel article
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
                          <p className="text-xl font-bold text-foreground">{kpi.value}</p>
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
                  <Input placeholder="Rechercher un article..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <Tag className="w-4 h-4 mr-2" /><SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="font-medium text-foreground">Aucun article trouvé</p>
                  <Button variant="outline" className="mt-3" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />Créer un article
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.04, 0.3) }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-muted/20 transition-all group"
                    >
                      {/* Cover thumbnail */}
                      {post.cover_image ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {getStatusBadge(post.status)}
                          <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at || post.created_at)}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views} vues</span>
                          <SeoIndicator value={post.title.length} min={30} max={60} label="Titre" />
                          {post.excerpt && <SeoIndicator value={post.excerpt.length} min={100} max={160} label="Extrait" />}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="outline" size="icon-sm" onClick={() => openEditDialog(post)}><Edit className="w-3.5 h-3.5" /></Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                              <ExternalLink className="w-4 h-4 mr-2" />Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`); toast({ title: "Lien copié" }); }}>
                              <Copy className="w-4 h-4 mr-2" />Copier le lien
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicatePost(post)}>
                              <Copy className="w-4 h-4 mr-2" />Dupliquer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deletePost(post.id)} className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create/Edit Dialog */}
          <Dialog open={isCreateDialogOpen || !!editingPostId} onOpenChange={(open) => { if (!open) { setIsCreateDialogOpen(false); setEditingPostId(null); resetForm(); } }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPostId ? 'Modifier l\'article' : 'Nouvel article'}</DialogTitle>
                <DialogDescription>{editingPostId ? 'Modifiez les informations' : 'Créez un nouvel article de blog'}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Titre *</Label>
                    <span className={`text-[10px] tabular-nums ${formData.title.length > 60 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                      {formData.title.length}/60 {formData.title.length >= 30 && formData.title.length <= 60 ? '✓' : formData.title.length > 0 ? '⚠' : ''}
                    </span>
                  </div>
                  <Input value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Titre de l'article" />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="url-de-l-article" />
                </div>
                <div className="space-y-2">
                  <Label>Image de couverture (URL)</Label>
                  <Input value={formData.cover_image || ''} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })} placeholder="https://example.com/image.jpg" />
                  {formData.cover_image && (
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-muted">
                      <img src={formData.cover_image} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{categories.filter(c => c !== 'Tous').map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    <Select value={formData.status} onValueChange={(v: 'draft' | 'published') => setFormData({ ...formData, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Extrait</Label>
                    <span className={`text-[10px] tabular-nums ${(formData.excerpt?.length || 0) > 160 ? 'text-red-500' : (formData.excerpt?.length || 0) >= 100 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {formData.excerpt?.length || 0}/160
                    </span>
                  </div>
                  <Textarea value={formData.excerpt || ''} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Résumé (affiché dans les listes)" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Contenu</Label>
                  <Textarea value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Contenu complet..." rows={10} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); setEditingPostId(null); resetForm(); }}>Annuler</Button>
                <Button onClick={editingPostId ? handleUpdatePost : handleCreatePost} disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingPostId ? 'Mettre à jour' : formData.status === 'published' ? 'Publier' : 'Enregistrer'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Blog;
