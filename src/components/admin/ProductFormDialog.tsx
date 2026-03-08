import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  ImagePlus,
  Plus,
  Trash2,
  Sparkles,
  Award,
  Clock,
  Tag,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DigitalProduct,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useDigitalProducts";
import { MediaSelector } from "@/components/admin/MediaSelector";
import { PdfUploader } from "@/components/admin/PdfUploader";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: DigitalProduct | null;
}

const categories = [
  { value: "formation", label: "Formation" },
  { value: "ebook", label: "E-book" },
  { value: "template", label: "Template" },
  { value: "outil", label: "Outil" },
  { value: "service", label: "Service" },
  { value: "pack", label: "Pack" },
  { value: "other", label: "Autre" },
];

const productTypes = [
  { value: "digital", label: "Digital" },
  { value: "service", label: "Service" },
  { value: "subscription", label: "Abonnement" },
];

export const ProductFormDialog = ({
  open,
  onOpenChange,
  product,
}: ProductFormDialogProps) => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    problem_solved: "",
    benefits: [] as string[],
    content_details: [] as string[],
    price: 0,
    original_price: null as number | null,
    currency: "XOF",
    category: "other",
    product_type: "digital",
    featured_image: "",
    images: [] as string[],
    preview_url: "",
    download_url: "",
    file_size: "",
    file_format: "",
    badge: "",
    is_featured: false,
    is_bestseller: false,
    is_new: false,
    is_limited_offer: false,
    limited_offer_end: "",
    status: "draft",
    display_order: 0,
  });

  const [newBenefit, setNewBenefit] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [mediaSelectorOpen, setMediaSelectorOpen] = useState(false);
  const [mediaSelectorTarget, setMediaSelectorTarget] = useState<"featured" | "gallery">("featured");

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        slug: product.slug || "",
        short_description: product.short_description || "",
        description: product.description || "",
        problem_solved: product.problem_solved || "",
        benefits: product.benefits || [],
        content_details: product.content_details || [],
        price: product.price || 0,
        original_price: product.original_price,
        currency: product.currency || "XOF",
        category: product.category || "other",
        product_type: product.product_type || "digital",
        featured_image: product.featured_image || "",
        images: product.images || [],
        preview_url: product.preview_url || "",
        download_url: product.download_url || "",
        file_size: product.file_size || "",
        file_format: product.file_format || "",
        badge: product.badge || "",
        is_featured: product.is_featured || false,
        is_bestseller: product.is_bestseller || false,
        is_new: product.is_new || false,
        is_limited_offer: product.is_limited_offer || false,
        limited_offer_end: product.limited_offer_end ? product.limited_offer_end.slice(0, 16) : "",
        status: product.status || "draft",
        display_order: product.display_order || 0,
      });
    } else {
      // Reset form for new product
      setFormData({
        title: "",
        slug: "",
        short_description: "",
        description: "",
        problem_solved: "",
        benefits: [],
        content_details: [],
        price: 0,
        original_price: null,
        currency: "XOF",
        category: "other",
        product_type: "digital",
        featured_image: "",
        images: [],
        preview_url: "",
        download_url: "",
        file_size: "",
        file_format: "",
        badge: "",
        is_featured: false,
        is_bestseller: false,
        is_new: false,
        is_limited_offer: false,
        limited_offer_end: "",
        status: "draft",
        display_order: 0,
      });
    }
  }, [product, open]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const addContent = () => {
    if (newContent.trim()) {
      setFormData((prev) => ({
        ...prev,
        content_details: [...prev.content_details, newContent.trim()],
      }));
      setNewContent("");
    }
  };

  const removeContent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content_details: prev.content_details.filter((_, i) => i !== index),
    }));
  };

  const handleMediaSelect = (url: string) => {
    if (mediaSelectorTarget === "featured") {
      setFormData((prev) => ({ ...prev, featured_image: url }));
    } else {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug) return;

    setIsSaving(true);
    try {
      if (isEditing && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          ...formData,
        });
      } else {
        await createProduct.mutateAsync(formData as any);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">
              {isEditing ? "Modifier le produit" : "Nouveau produit"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="general" className="flex-1">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="pricing">Tarification</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[60vh] px-6 py-4">
              {/* General Tab */}
              <TabsContent value="general" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Nom du produit"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="nom-du-produit"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_description">Description courte</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, short_description: e.target.value }))
                    }
                    placeholder="Une phrase accrocheuse..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Description détaillée du produit..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem_solved">Problème résolu</Label>
                  <Textarea
                    id="problem_solved"
                    value={formData.problem_solved}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, problem_solved: e.target.value }))
                    }
                    placeholder="Quel problème ce produit résout-il ?"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type de produit</Label>
                    <Select
                      value={formData.product_type}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, product_type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Featured Image with Media Selector */}
                <div className="space-y-4">
                  <Label>Image principale</Label>
                  <div className="flex gap-4">
                    <div 
                      className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/50 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => {
                        setMediaSelectorTarget("featured");
                        setMediaSelectorOpen(true);
                      }}
                    >
                      {formData.featured_image ? (
                        <img
                          src={formData.featured_image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                          <span className="text-xs text-muted-foreground">Cliquer pour ajouter</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={formData.featured_image}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, featured_image: e.target.value }))
                          }
                          placeholder="URL de l'image ou cliquez sur l'aperçu..."
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setMediaSelectorTarget("featured");
                            setMediaSelectorOpen(true);
                          }}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Parcourir
                        </Button>
                      </div>
                      {formData.featured_image && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setFormData((prev) => ({ ...prev, featured_image: "" }))}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Supprimer l'image
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Galerie d'images</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setMediaSelectorTarget("gallery");
                        setMediaSelectorOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  {formData.images.length > 0 ? (
                    <div className="grid grid-cols-4 gap-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                          <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune image dans la galerie</p>
                  )}
                </div>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6 mt-0">
                {/* Benefits */}
                <div className="space-y-4">
                  <Label>Bénéfices</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Ajouter un bénéfice..."
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                    />
                    <Button type="button" onClick={addBenefit} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                      >
                        <span className="flex-1 text-sm">{benefit}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeBenefit(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Content Details */}
                <div className="space-y-4">
                  <Label>Contenu inclus</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Ajouter un élément de contenu..."
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addContent())}
                    />
                    <Button type="button" onClick={addContent} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.content_details.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                      >
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeContent(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* PDF Upload Section */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">📄 Fichiers PDF du produit</Label>
                  <p className="text-xs text-muted-foreground -mt-2">
                    Uploadez les fichiers PDF que les clients pourront télécharger après achat.
                  </p>
                  <PdfUploader
                    productId={product?.id || "new-product"}
                    currentFiles={
                      formData.download_url
                        ? [{
                            name: formData.download_url.split("/").pop() || "fichier.pdf",
                            path: formData.download_url,
                            size: 0,
                            url: formData.download_url,
                          }]
                        : []
                    }
                    onFilesChange={(files) => {
                      setFormData((prev) => ({
                        ...prev,
                        download_url: files.length > 0 ? files[files.length - 1].path : "",
                        file_format: files.length > 0 ? "PDF" : prev.file_format,
                      }));
                    }}
                  />
                </div>

                <Separator />

                {/* File Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="file_format">Format du fichier</Label>
                    <Input
                      id="file_format"
                      value={formData.file_format}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, file_format: e.target.value }))
                      }
                      placeholder="PDF, MP4, ZIP..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file_size">Taille du fichier</Label>
                    <Input
                      id="file_size"
                      value={formData.file_size}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, file_size: e.target.value }))
                      }
                      placeholder="150 MB"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preview_url">Lien de prévisualisation</Label>
                  <Input
                    id="preview_url"
                    value={formData.preview_url}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, preview_url: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix actuel (F CFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="1"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Prix original (F CFA)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      step="1"
                      min="0"
                      value={formData.original_price || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          original_price: e.target.value ? parseFloat(e.target.value) : null,
                        }))
                      }
                      placeholder="Laisser vide si pas de promo"
                    />
                    <p className="text-xs text-muted-foreground">
                      Si défini, le prix original sera barré pour montrer la réduction
                    </p>
                  </div>
                </div>

                {formData.original_price && formData.original_price > formData.price && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <div className="flex items-center gap-2 text-rose-600">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">
                        Promotion de{" "}
                        {Math.round((1 - formData.price / formData.original_price) * 100)}% active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Économie de {(formData.original_price - formData.price).toFixed(2)}€
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="display_order">Ordre d'affichage</Label>
                  <Input
                    id="display_order"
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        display_order: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Les produits avec un ordre plus petit apparaissent en premier
                  </p>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6 mt-0">
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <Label>Publier le produit</Label>
                    <p className="text-sm text-muted-foreground">
                      Le produit sera visible dans la boutique
                    </p>
                  </div>
                  <Switch
                    checked={formData.status === "published"}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: checked ? "published" : "draft",
                      }))
                    }
                  />
                </div>

                <Separator />

                {/* Badges */}
                <div className="space-y-4">
                  <Label>Badges et mise en avant</Label>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-sm">Produit phare</p>
                        <p className="text-xs text-muted-foreground">
                          Affiché en vedette sur la page d'accueil
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_featured: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-sm">Best Seller</p>
                        <p className="text-xs text-muted-foreground">
                          Badge "Best Seller" visible
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.is_bestseller}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_bestseller: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-sm">Nouveau</p>
                        <p className="text-xs text-muted-foreground">
                          Badge "Nouveau" visible
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.is_new}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_new: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="font-medium text-sm">Offre limitée</p>
                        <p className="text-xs text-muted-foreground">
                          Badge "Offre Limitée" avec urgence
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.is_limited_offer}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_limited_offer: checked }))
                      }
                    />
                  </div>

                  {formData.is_limited_offer && (
                    <div className="space-y-2 p-3 border rounded-lg bg-rose-500/5 border-rose-500/20">
                      <Label htmlFor="limited_offer_end">Date de fin de l'offre</Label>
                      <Input
                        id="limited_offer_end"
                        type="datetime-local"
                        value={formData.limited_offer_end || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, limited_offer_end: e.target.value }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Le timer de compte à rebours sera affiché jusqu'à cette date
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Footer */}
          <div className="p-6 pt-4 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving || !formData.title || !formData.slug}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? "Mettre à jour" : "Créer le produit"}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Media Selector Modal */}
      <MediaSelector
        open={mediaSelectorOpen}
        onOpenChange={setMediaSelectorOpen}
        onSelect={handleMediaSelect}
      />
    </>
  );
};
