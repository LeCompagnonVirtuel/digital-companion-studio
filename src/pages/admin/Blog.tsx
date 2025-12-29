import { useState, useEffect } from 'react';
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
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  category: string;
  author: string;
  publishedAt: string | null;
  createdAt: string;
  views: number;
}

// Demo data
const demoPosts: BlogPost[] = [
  {
    id: '1',
    title: "10 tendances web design pour 2025",
    slug: "tendances-web-design-2025",
    excerpt: "Découvrez les tendances qui vont façonner le web design cette année : IA, animations, typographies audacieuses...",
    content: "Contenu complet de l'article...",
    status: 'published',
    category: "Design",
    author: "Admin",
    publishedAt: "2024-12-15T10:00:00Z",
    createdAt: "2024-12-14T08:30:00Z",
    views: 1234
  },
  {
    id: '2',
    title: "Comment optimiser son SEO en 2025",
    slug: "optimiser-seo-2025",
    excerpt: "Les meilleures pratiques pour améliorer votre référencement naturel et dominer les résultats de recherche.",
    content: "Contenu complet de l'article...",
    status: 'published',
    category: "SEO",
    author: "Admin",
    publishedAt: "2024-12-10T14:00:00Z",
    createdAt: "2024-12-09T11:00:00Z",
    views: 856
  },
  {
    id: '3',
    title: "L'IA au service du marketing digital",
    slug: "ia-marketing-digital",
    excerpt: "Comment l'intelligence artificielle révolutionne les stratégies marketing des entreprises modernes.",
    content: "Contenu complet de l'article...",
    status: 'draft',
    category: "Marketing",
    author: "Admin",
    publishedAt: null,
    createdAt: "2024-12-20T09:00:00Z",
    views: 0
  },
];

const categories = ['Tous', 'Design', 'SEO', 'Marketing', 'Développement', 'E-commerce'];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(demoPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Design',
    status: 'draft' as 'draft' | 'published'
  });
  const { toast } = useToast();

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Tous' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...formData,
      author: 'Admin',
      publishedAt: formData.status === 'published' ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      views: 0
    };
    setPosts([newPost, ...posts]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "Article créé",
      description: formData.status === 'published' ? "L'article a été publié." : "L'article a été enregistré comme brouillon.",
    });
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;
    setPosts(posts.map(p => 
      p.id === editingPost.id 
        ? { 
            ...p, 
            ...formData,
            publishedAt: formData.status === 'published' && !p.publishedAt ? new Date().toISOString() : p.publishedAt
          } 
        : p
    ));
    setEditingPost(null);
    resetForm();
    toast({
      title: "Article mis à jour",
      description: "Les modifications ont été enregistrées.",
    });
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé définitivement.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Design',
      status: 'draft'
    });
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      status: post.status
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? <Badge className="bg-green-500/10 text-green-500">Publié</Badge>
      : <Badge className="bg-amber-500/10 text-amber-500">Brouillon</Badge>;
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Gestion du Blog
              </h1>
              <p className="text-muted-foreground mt-1">
                {posts.length} article{posts.length > 1 ? 's' : ''} • {posts.filter(p => p.status === 'published').length} publié{posts.filter(p => p.status === 'published').length > 1 ? 's' : ''}
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvel article
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Articles publiés', value: posts.filter(p => p.status === 'published').length, color: 'text-green-500' },
              { label: 'Brouillons', value: posts.filter(p => p.status === 'draft').length, color: 'text-amber-500' },
              { label: 'Vues totales', value: posts.reduce((acc, p) => acc + p.views, 0).toLocaleString(), color: 'text-blue-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Tag className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun article trouvé</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(post.status)}
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <h3 className="font-semibold truncate">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views} vues
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Voir l'article
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              navigator.clipboard.writeText(`/blog/${post.slug}`);
                              toast({ title: "Lien copié" });
                            }}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copier le lien
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeletePost(post.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
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
          <Dialog 
            open={isCreateDialogOpen || !!editingPost} 
            onOpenChange={(open) => {
              if (!open) {
                setIsCreateDialogOpen(false);
                setEditingPost(null);
                resetForm();
              }
            }}
          >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? 'Modifier l\'article' : 'Nouvel article'}
                </DialogTitle>
                <DialogDescription>
                  {editingPost ? 'Modifiez les informations de l\'article' : 'Créez un nouvel article de blog'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Titre</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Titre de l'article"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-de-l-article"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'Tous').map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(v: 'draft' | 'published') => setFormData({ ...formData, status: v })}
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
                <div className="space-y-2">
                  <Label>Extrait</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Résumé de l'article (affiché dans les listes)"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contenu</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Contenu complet de l'article..."
                    rows={10}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsCreateDialogOpen(false);
                  setEditingPost(null);
                  resetForm();
                }}>
                  Annuler
                </Button>
                <Button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
                  {editingPost ? 'Enregistrer' : 'Créer'}
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