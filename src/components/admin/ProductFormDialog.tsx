import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FileText,
  CheckCircle,
  Package,
  Globe,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Search,
  BadgePercent,
  Settings,
  LayoutGrid,
  Link as LinkIcon,
  Info,
  Hash,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { supabase } from "@/integrations/supabase/client";

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

const currencies = [
  { value: "XOF", label: "F CFA (XOF)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "USD", label: "Dollar (USD)" },
];

// Character counter component
const CharCount = ({ current, max, className = "" }: { current: number; max: number; className?: string }) => {
  const isOver = current > max;
  const isNear = current > max * 0.85;
  return (
    <span className={`text-xs ${isOver ? "text-destructive font-medium" : isNear ? "text-amber-500" : "text-muted-foreground"} ${className}`}>
      {current}/{max}
    </span>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title, description, count }: { icon: any; title: string; description?: string; count?: number }) => (
  <div className="flex items-start gap-3 mb-4">
    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        {typeof count === "number" && (
          <Badge variant="secondary" className="text-xs h-5 px-1.5">{count}</Badge>
        )}
      </div>
      {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    </div>
  </div>
);

// Required field indicator
const Required = () => <span className="text-destructive ml-0.5">*</span>;

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
  const [activeTab, setActiveTab] = useState("general");
  const [uploadedFileMeta, setUploadedFileMeta] = useState<{ name: string; size: number } | null>(null);

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
    setActiveTab("general");
  }, [product, open]);

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

  const moveBenefit = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.benefits.length) return;
    setFormData((prev) => {
      const items = [...prev.benefits];
      [items[index], items[newIndex]] = [items[newIndex], items[index]];
      return { ...prev, benefits: items };
    });
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

  const moveContent = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.content_details.length) return;
    setFormData((prev) => {
      const items = [...prev.content_details];
      [items[index], items[newIndex]] = [items[newIndex], items[index]];
      return { ...prev, content_details: items };
    });
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
      const payload = {
        ...formData,
        limited_offer_end: formData.limited_offer_end
          ? new Date(formData.limited_offer_end).toISOString()
          : null,
      };

      if (isEditing && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          ...payload,
        });

        if (formData.download_url) {
          await syncProductFile(product.id, formData.download_url);
        }
      } else {
        const created = await createProduct.mutateAsync(payload as any);
        const newProductId = created?.id;

        if (newProductId && formData.download_url?.startsWith("new-product/")) {
          const oldPath = formData.download_url;
          const fileName = oldPath.split("/").pop() || "file.pdf";
          const newPath = `${newProductId}/${fileName}`;

          const { data: fileData, error: dlError } = await supabase.storage
            .from("product-files")
            .download(oldPath);

          if (!dlError && fileData) {
            const { error: upError } = await supabase.storage
              .from("product-files")
              .upload(newPath, fileData, { contentType: "application/pdf", upsert: false });

            if (!upError) {
              await updateProduct.mutateAsync({ id: newProductId, download_url: newPath });
              await supabase.storage.from("product-files").remove([oldPath]);
              await syncProductFile(newProductId, newPath);
            }
          }
        } else if (newProductId && formData.download_url) {
          await syncProductFile(newProductId, formData.download_url);
        }
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const syncProductFile = async (productId: string, filePath: string) => {
    try {
      const { data: existing } = await supabase
        .from("product_files")
        .select("id")
        .eq("product_id", productId)
        .eq("file_path", filePath)
        .maybeSingle();

      if (!existing) {
        const fileName = filePath.split("/").pop() || "file.pdf";
        await supabase.from("product_files").insert({
          product_id: productId,
          file_path: filePath,
          file_name: fileName,
          file_size: 0,
          file_type: "application/pdf",
        });
      }
    } catch (err) {
      console.error("Sync product_files error:", err);
    }
  };

  const formatCurrency = (amount: number) => {
    if (formData.currency === "EUR") return `${amount.toLocaleString("fr-FR")} €`;
    if (formData.currency === "USD") return `$${amount.toLocaleString("en-US")}`;
    return `${Math.round(amount).toLocaleString("fr-FR")} F CFA`;
  };

  const discountPercent = formData.original_price && formData.original_price > formData.price
    ? Math.round((1 - formData.price / formData.original_price) * 100)
    : 0;

  const savings = formData.original_price && formData.original_price > formData.price
    ? formData.original_price - formData.price
    : 0;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          {/* Header with status indicator */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl">
                  {isEditing ? "Modifier le produit" : "Nouveau produit"}
                </DialogTitle>
                <Badge
                  variant={formData.status === "published" ? "default" : "secondary"}
                  className={formData.status === "published" ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20" : ""}
                >
                  {formData.status === "published" ? (
                    <><Eye className="w-3 h-3 mr-1" /> Publié</>
                  ) : (
                    <><EyeOff className="w-3 h-3 mr-1" /> Brouillon</>
                  )}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-4 h-11">
                <TabsTrigger value="general" className="gap-1.5 text-xs sm:text-sm">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Général
                </TabsTrigger>
                <TabsTrigger value="content" className="gap-1.5 text-xs sm:text-sm">
                  <Package className="w-3.5 h-3.5" />
                  Contenu
                </TabsTrigger>
                <TabsTrigger value="pricing" className="gap-1.5 text-xs sm:text-sm">
                  <Tag className="w-3.5 h-3.5" />
                  Tarification
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-1.5 text-xs sm:text-sm">
                  <Settings className="w-3.5 h-3.5" />
                  Paramètres
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[58vh] px-6 py-4">
              <AnimatePresence mode="wait">
                {/* ═══════════════════════════════════════════ */}
                {/* GENERAL TAB */}
                {/* ═══════════════════════════════════════════ */}
                <TabsContent value="general" className="space-y-6 mt-0" forceMount={activeTab === "general" ? true : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Identity */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={FileText}
                          title="Identité du produit"
                          description="Informations de base visibles par les clients"
                        />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Titre<Required /></Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => handleTitleChange(e.target.value)}
                              placeholder="Nom du produit"
                              className={!formData.title ? "border-destructive/50" : ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="slug">Slug URL<Required /></Label>
                            <Input
                              id="slug"
                              value={formData.slug}
                              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                              placeholder="nom-du-produit"
                              className={!formData.slug ? "border-destructive/50" : ""}
                            />
                            {formData.slug && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <LinkIcon className="w-3 h-3" />
                                <span>/boutique/<span className="text-primary font-medium">{formData.slug}</span></span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="short_description">Description courte</Label>
                            <CharCount current={formData.short_description.length} max={160} />
                          </div>
                          <Textarea
                            id="short_description"
                            value={formData.short_description}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, short_description: e.target.value }))
                            }
                            placeholder="Une phrase accrocheuse pour les moteurs de recherche (max 160 caractères)..."
                            rows={2}
                          />
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Idéal pour le SEO : 120-160 caractères
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="description">Description complète</Label>
                            <CharCount current={formData.description.length} max={2000} />
                          </div>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Description détaillée du produit..."
                            rows={4}
                          />
                          <p className="text-xs text-muted-foreground">
                            Supporte <strong>**gras**</strong>, <em>*italique*</em>, [liens](url)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="problem_solved">Problème résolu</Label>
                          <Textarea
                            id="problem_solved"
                            value={formData.problem_solved}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, problem_solved: e.target.value }))
                            }
                            placeholder="Quel problème ce produit résout-il pour le client ?"
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
                      </CardContent>
                    </Card>

                    {/* Images */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={ImageIcon}
                          title="Visuels du produit"
                          description="Image principale et galerie d'images supplémentaires"
                        />
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Featured Image */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Image principale</Label>
                          <div className="flex gap-4">
                            <div
                              className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
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
                                  <span className="text-xs text-muted-foreground">Ajouter</span>
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
                                  placeholder="URL de l'image..."
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
                                  Supprimer
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Gallery */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                              Galerie d'images
                              {formData.images.length > 0 && (
                                <Badge variant="secondary" className="ml-2 text-xs">{formData.images.length}</Badge>
                              )}
                            </Label>
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
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border hover:ring-2 hover:ring-primary/30 transition-all">
                                  <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {index + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                              <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Aucune image dans la galerie</p>
                              <p className="text-xs text-muted-foreground mt-1">Cliquez sur "Ajouter" pour enrichir votre fiche produit</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* ═══════════════════════════════════════════ */}
                {/* CONTENT TAB */}
                {/* ═══════════════════════════════════════════ */}
                <TabsContent value="content" className="space-y-6 mt-0" forceMount={activeTab === "content" ? true : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Benefits */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={CheckCircle}
                          title="Bénéfices"
                          description="Les avantages que le client obtient avec ce produit"
                          count={formData.benefits.length}
                        />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={newBenefit}
                            onChange={(e) => setNewBenefit(e.target.value)}
                            placeholder="Ex: Gagnez 2h par jour grâce à l'automatisation..."
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                          />
                          <Button type="button" onClick={addBenefit} size="icon" disabled={!newBenefit.trim()}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {formData.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg group hover:bg-muted/80 transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="flex-1 text-sm">{benefit}</span>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBenefit(index, "up")} disabled={index === 0}>
                                  <ArrowUp className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBenefit(index, "down")} disabled={index === formData.benefits.length - 1}>
                                  <ArrowDown className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeBenefit(index)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                          {formData.benefits.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-3">Ajoutez les bénéfices clés de votre produit</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Content Details */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Package}
                          title="Contenu inclus"
                          description="Détaillez ce que contient le produit (chapitres, modules, fichiers...)"
                          count={formData.content_details.length}
                        />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Ex: 12 chapitres pratiques avec exemples..."
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addContent())}
                          />
                          <Button type="button" onClick={addContent} size="icon" disabled={!newContent.trim()}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-1.5">
                          {formData.content_details.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg group hover:bg-muted/80 transition-colors"
                            >
                              <Package className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="flex-1 text-sm">{item}</span>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveContent(index, "up")} disabled={index === 0}>
                                  <ArrowUp className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveContent(index, "down")} disabled={index === formData.content_details.length - 1}>
                                  <ArrowDown className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeContent(index)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                          {formData.content_details.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-3">Décrivez le contenu de votre produit</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* PDF Upload + File Info */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={FileText}
                          title="Fichiers téléchargeables"
                          description="Fichiers PDF livrés au client après achat"
                        />
                      </CardHeader>
                      <CardContent className="space-y-4">
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

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="file_format" className="text-xs">Format du fichier</Label>
                            <Input
                              id="file_format"
                              value={formData.file_format}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, file_format: e.target.value }))
                              }
                              placeholder="PDF, MP4, ZIP..."
                              className="h-9 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="file_size" className="text-xs">Taille du fichier</Label>
                            <Input
                              id="file_size"
                              value={formData.file_size}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, file_size: e.target.value }))
                              }
                              placeholder="150 MB"
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Preview Link */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Eye}
                          title="Prévisualisation"
                          description="Lien optionnel pour permettre aux clients de prévisualiser le produit"
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Input
                            id="preview_url"
                            value={formData.preview_url}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, preview_url: e.target.value }))
                            }
                            placeholder="https://..."
                          />
                          {formData.preview_url && (
                            <a
                              href={formData.preview_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <Globe className="w-3 h-3" />
                              Ouvrir l'aperçu
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* ═══════════════════════════════════════════ */}
                {/* PRICING TAB */}
                {/* ═══════════════════════════════════════════ */}
                <TabsContent value="pricing" className="space-y-6 mt-0" forceMount={activeTab === "pricing" ? true : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Price Preview Card */}
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Aperçu du prix affiché</p>
                          <div className="flex items-center justify-center gap-3">
                            {formData.original_price && formData.original_price > formData.price && (
                              <span className="text-lg text-muted-foreground line-through">
                                {formatCurrency(formData.original_price)}
                              </span>
                            )}
                            <span className="text-3xl font-bold text-foreground">
                              {formatCurrency(formData.price)}
                            </span>
                          </div>
                          {discountPercent > 0 && (
                            <Badge className="bg-destructive/15 text-destructive border-destructive/20">
                              <BadgePercent className="w-3 h-3 mr-1" />
                              -{discountPercent}% · Économie de {formatCurrency(savings)}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Price Fields */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Tag}
                          title="Tarification"
                          description="Définissez le prix et les promotions"
                        />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Prix actuel<Required /></Label>
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
                            <Label htmlFor="original_price">Prix original</Label>
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
                              placeholder="Sans promo"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Devise</Label>
                            <Select
                              value={formData.currency}
                              onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, currency: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {currencies.map((c) => (
                                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {discountPercent > 0 && (
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <div className="flex items-center gap-2 text-emerald-600">
                              <Tag className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                Promotion de {discountPercent}% active
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Économie de {formatCurrency(savings)} pour le client
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Renseignez le prix original pour afficher un prix barré avec la réduction
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* ═══════════════════════════════════════════ */}
                {/* SETTINGS TAB */}
                {/* ═══════════════════════════════════════════ */}
                <TabsContent value="settings" className="space-y-6 mt-0" forceMount={activeTab === "settings" ? true : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Publication */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Globe}
                          title="Publication"
                          description="Contrôlez la visibilité et l'affichage du produit"
                        />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
                          <div className="flex items-center gap-3">
                            {formData.status === "published" ? (
                              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-emerald-600" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-sm">
                                {formData.status === "published" ? "Produit publié" : "Brouillon"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formData.status === "published"
                                  ? "Visible dans la boutique"
                                  : "Non visible — enregistré comme brouillon"
                                }
                              </p>
                            </div>
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

                        <div className="grid grid-cols-2 gap-4">
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
                            <p className="text-xs text-muted-foreground">Plus petit = affiché en premier</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="badge">Badge personnalisé</Label>
                            <Input
                              id="badge"
                              value={formData.badge}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, badge: e.target.value }))
                              }
                              placeholder="Ex: -50%, Top, Exclusif..."
                            />
                            <p className="text-xs text-muted-foreground">Texte libre affiché sur la carte produit</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Marketing Badges */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Award}
                          title="Badges marketing"
                          description="Mettez en avant votre produit avec des badges visuels"
                        />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { key: "is_featured", icon: Sparkles, iconColor: "text-amber-500", label: "Produit phare", desc: "Affiché en vedette sur la page d'accueil" },
                          { key: "is_bestseller", icon: Award, iconColor: "text-amber-600", label: "Best Seller", desc: "Badge \"Best Seller\" visible" },
                          { key: "is_new", icon: Sparkles, iconColor: "text-emerald-500", label: "Nouveau", desc: "Badge \"Nouveau\" visible" },
                          { key: "is_limited_offer", icon: Clock, iconColor: "text-rose-500", label: "Offre limitée", desc: "Badge avec compteur d'urgence" },
                        ].map(({ key, icon: Icon, iconColor, label, desc }) => (
                          <div key={key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${iconColor}`} />
                              <div>
                                <p className="font-medium text-sm">{label}</p>
                                <p className="text-xs text-muted-foreground">{desc}</p>
                              </div>
                            </div>
                            <Switch
                              checked={formData[key as keyof typeof formData] as boolean}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, [key]: checked }))
                              }
                            />
                          </div>
                        ))}

                        {formData.is_limited_offer && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 p-3 border rounded-lg bg-rose-500/5 border-rose-500/20"
                          >
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
                              Le compteur à rebours sera affiché jusqu'à cette date
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>

                    {/* SEO Preview */}
                    <Card>
                      <CardHeader className="pb-4">
                        <SectionHeader
                          icon={Search}
                          title="Aperçu SEO"
                          description="Voici comment votre produit apparaîtra dans Google"
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-muted/30 rounded-lg border space-y-1">
                          <p className="text-[#1a0dab] text-base font-medium leading-tight truncate">
                            {formData.title || "Titre du produit"} — Votre Boutique
                          </p>
                          <p className="text-[#006621] text-xs truncate">
                            votresite.com/boutique/{formData.slug || "slug-du-produit"}
                          </p>
                          <p className="text-sm text-[#545454] line-clamp-2 leading-relaxed">
                            {formData.short_description || "Ajoutez une description courte pour améliorer votre référencement..."}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            Titre: {formData.title.length}/60 car.
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            Description: {formData.short_description.length}/160 car.
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </ScrollArea>
          </Tabs>

          {/* Footer */}
          <div className="p-6 pt-4 border-t flex items-center justify-between gap-3 bg-background">
            <div className="text-xs text-muted-foreground">
              {formData.title && formData.slug ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle className="w-3 h-3" />
                  Prêt à enregistrer
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-500">
                  <Info className="w-3 h-3" />
                  Remplissez le titre et le slug
                </span>
              )}
            </div>
            <div className="flex gap-3">
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
          </div>
        </DialogContent>
      </Dialog>

      <MediaSelector
        open={mediaSelectorOpen}
        onOpenChange={setMediaSelectorOpen}
        onSelect={handleMediaSelect}
      />
    </>
  );
};
