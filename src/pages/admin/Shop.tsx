import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Award,
  Sparkles,
  Clock,
  MoreHorizontal,
  Package,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Filter,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAdminDigitalProducts,
  useDeleteProduct,
  useUpdateProduct,
  DigitalProduct,
} from "@/hooks/useDigitalProducts";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";

const AdminShop = () => {
  const { data: products, isLoading } = useAdminDigitalProducts();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DigitalProduct | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<DigitalProduct | null>(null);

  // Get unique categories
  const categories = products
    ? [...new Set(products.map((p) => p.category))].sort()
    : [];

  // Filter products
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Stats
  const stats = {
    total: products?.length || 0,
    published: products?.filter((p) => p.status === "published").length || 0,
    draft: products?.filter((p) => p.status === "draft").length || 0,
    totalRevenue: products?.reduce((sum, p) => sum + (p.price * p.sales_count), 0) || 0,
  };

  const handleEdit = (product: DigitalProduct) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: DigitalProduct) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct.mutateAsync(productToDelete.id);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const togglePublish = async (product: DigitalProduct) => {
    await updateProduct.mutateAsync({
      id: product.id,
      status: product.status === "published" ? "draft" : "published",
    });
  };

  const toggleFeatured = async (product: DigitalProduct) => {
    await updateProduct.mutateAsync({
      id: product.id,
      is_featured: !product.is_featured,
    });
  };

  const toggleBestseller = async (product: DigitalProduct) => {
    await updateProduct.mutateAsync({
      id: product.id,
      is_bestseller: !product.is_bestseller,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Publié</Badge>;
      case "draft":
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">Boutique</h1>
              <p className="text-muted-foreground text-sm">Gérez vos produits digitaux</p>
            </div>
            <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau produit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total produits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.published}</p>
                    <p className="text-xs text-muted-foreground">Publiés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.draft}</p>
                    <p className="text-xs text-muted-foreground">Brouillons</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('fr-FR')} F CFA</p>
                    <p className="text-xs text-muted-foreground">Revenus estimés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publiés</SelectItem>
                    <SelectItem value="draft">Brouillons</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : filteredProducts && filteredProducts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Ventes</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Badges</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredProducts.map((product, index) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="group"
                        >
                          <TableCell>
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                              {product.featured_image ? (
                                <img
                                  src={product.featured_image}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-muted-foreground/50" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium line-clamp-1">{product.title}</p>
                              <p className="text-xs text-muted-foreground">/{product.slug}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{product.price.toLocaleString('fr-FR')} F CFA</p>
                              {product.original_price && product.original_price > product.price && (
                                <p className="text-xs text-muted-foreground line-through">
                                  {product.original_price.toLocaleString('fr-FR')} F CFA
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                              <span>{product.sales_count}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {product.is_featured && (
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              )}
                              {product.is_bestseller && (
                                <Award className="w-4 h-4 text-amber-600" />
                              )}
                              {product.is_new && (
                                <Sparkles className="w-4 h-4 text-emerald-500" />
                              )}
                              {product.is_limited_offer && (
                                <Clock className="w-4 h-4 text-rose-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => togglePublish(product)}>
                                  {product.status === "published" ? (
                                    <>
                                      <EyeOff className="w-4 h-4 mr-2" />
                                      Dépublier
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Publier
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toggleFeatured(product)}>
                                  <Star className={`w-4 h-4 mr-2 ${product.is_featured ? "fill-current" : ""}`} />
                                  {product.is_featured ? "Retirer des favoris" : "Mettre en avant"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleBestseller(product)}>
                                  <Award className="w-4 h-4 mr-2" />
                                  {product.is_bestseller ? "Retirer Best Seller" : "Best Seller"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDelete(product)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-1">Aucun produit trouvé</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                      ? "Essayez de modifier vos filtres"
                      : "Commencez par créer votre premier produit"}
                  </p>
                  {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
                    <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un produit
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Product Form Dialog */}
        <ProductFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          product={editingProduct}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer ce produit ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le produit "{productToDelete?.title}" sera
                définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminShop;
