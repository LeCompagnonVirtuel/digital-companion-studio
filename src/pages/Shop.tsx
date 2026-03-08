import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, ArrowUpDown, TrendingUp, Clock, DollarSign, Shield, Zap, Award, Star, SlidersHorizontal, X, ShoppingBag, Flame } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDigitalProducts } from "@/hooks/useDigitalProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PromoBanner } from "@/components/shop/PromoBanner";
import { SocialProofToasts } from "@/components/shop/SocialProofToasts";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

type SortOption = "popular" | "newest" | "price-asc" | "price-desc";

const categoryLabels: Record<string, string> = {
  formation: "Formations",
  ebook: "E-books",
  template: "Templates",
  outil: "Outils",
  service: "Services",
  pack: "Packs",
  other: "Autres",
};

const trustItems = [
  { icon: Shield, label: "Paiement sécurisé", color: "text-emerald-500" },
  { icon: Zap, label: "Accès instantané", color: "text-amber-500" },
  { icon: Award, label: "Qualité garantie", color: "text-primary" },
  { icon: Star, label: "Satisfait ou remboursé", color: "text-rose-500" },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const { data: products, isLoading } = useDigitalProducts();
  const { itemCount } = useCart();

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category))].sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    if (!products?.length) return 200000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case "popular":
        result = [...result].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case "newest":
        result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
    }
    return result;
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);

  const stats = useMemo(() => {
    if (!products) return { total: 0, clients: 0 };
    return {
      total: products.length,
      clients: products.reduce((sum, p) => sum + (p.sales_count || 0), 0),
    };
  }, [products]);

  const activeFiltersCount = (selectedCategory ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  const clearFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const formatPrice = (v: number) => `${Math.round(v).toLocaleString("fr-FR")} F`;

  return (
    <div className="min-h-screen bg-background">
      <SocialProofToasts />
      <Navigation />
      <PromoBanner />

      {/* ─── HERO ─── */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] opacity-60" style={{ background: 'hsl(var(--primary) / 0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-60" style={{ background: 'hsl(var(--accent) / 0.06)' }} />

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="badge-premium mx-auto mb-5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Boutique Digitale Premium
            </motion.div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 leading-[1.1]">
              Des Outils Pour{" "}
              <span className="gradient-text">Réussir en Ligne</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Formations, templates et ressources conçus pour les entrepreneurs africains ambitieux.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-5 sm:gap-8 px-5 sm:px-7 py-3.5 rounded-2xl bg-card border border-border/50"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {[
                { value: `${stats.total}+`, label: "Produits" },
                { value: `${stats.clients}+`, label: "Ventes" },
                { value: "30j", label: "Garantie" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-5 sm:gap-8">
                  {i > 0 && <div className="w-px h-8 bg-border -ml-5 sm:-ml-8" />}
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="border-y border-border/40 bg-muted/20">
        <div className="container-wide py-3 sm:py-4">
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap text-[11px] sm:text-xs text-muted-foreground">
            {trustItems.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-1.5 ${i === 3 ? 'hidden sm:flex' : ''}`}
              >
                <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
                {t.label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <section id="produits" className="py-8 sm:py-14">
        <div className="container-wide">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3 mb-6"
          >
            {/* Search + Sort + Filters + Cart */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 sm:h-11 rounded-xl border-border/50 bg-card text-sm focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[145px] h-10 sm:h-11 rounded-xl bg-card border-border/50 text-xs sm:text-sm">
                    <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground shrink-0" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">
                      <span className="flex items-center gap-2 text-xs sm:text-sm"><TrendingUp className="w-3.5 h-3.5" /> Popularité</span>
                    </SelectItem>
                    <SelectItem value="newest">
                      <span className="flex items-center gap-2 text-xs sm:text-sm"><Clock className="w-3.5 h-3.5" /> Nouveautés</span>
                    </SelectItem>
                    <SelectItem value="price-asc">
                      <span className="flex items-center gap-2 text-xs sm:text-sm"><DollarSign className="w-3.5 h-3.5" /> Prix ↑</span>
                    </SelectItem>
                    <SelectItem value="price-desc">
                      <span className="flex items-center gap-2 text-xs sm:text-sm"><DollarSign className="w-3.5 h-3.5" /> Prix ↓</span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-border/50 relative"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {activeFiltersCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold"
                    >
                      {activeFiltersCount}
                    </motion.span>
                  )}
                </Button>

                <CartDrawer>
                  <Button variant="outline" className="relative h-10 sm:h-11 px-3 sm:px-4 rounded-xl border-border/50">
                    <ShoppingBag className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline text-sm">Panier</span>
                    {itemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full">
                          {itemCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </CartDrawer>
              </div>
            </div>

            {/* Expandable filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-2xl bg-card border border-border/40 space-y-3" style={{ boxShadow: 'var(--shadow-soft)' }}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-foreground">Filtres avancés</h3>
                      {activeFiltersCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[11px] h-7 text-muted-foreground hover:text-foreground">
                          <X className="w-3 h-3 mr-1" /> Réinitialiser
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-medium text-muted-foreground">
                        Prix : {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                      </label>
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={500}
                        value={priceRange}
                        onValueChange={(v) => setPriceRange(v as [number, number])}
                        className="py-2"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category chips */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full h-8 px-3.5 text-[11px] sm:text-xs shrink-0 transition-all duration-200"
              >
                Tous
                {!selectedCategory && products && (
                  <span className="ml-1 opacity-70">({products.length})</span>
                )}
              </Button>
              {categories.map((category) => {
                const count = products?.filter(p => p.category === category).length || 0;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full h-8 px-3.5 text-[11px] sm:text-xs whitespace-nowrap shrink-0 transition-all duration-200"
                  >
                    {categoryLabels[category] || category}
                    <span className="ml-1 opacity-70">({count})</span>
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[11px] h-7 hover:text-foreground">
                Réinitialiser
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid gap-3 sm:gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2.5">
                  <Skeleton className="aspect-[4/3] rounded-2xl" />
                  <div className="space-y-1.5 px-0.5">
                    <Skeleton className="h-2.5 w-14 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-2.5 w-full hidden sm:block" />
                    <div className="flex justify-between items-center pt-1.5">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div layout className="grid gap-3 sm:gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20 bg-muted/15 rounded-2xl border border-border/20"
            >
              <Sparkles className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
              <h3 className="font-semibold text-base sm:text-lg mb-1.5">Aucun produit trouvé</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button variant="outline" onClick={clearFilters} className="rounded-xl text-sm">
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
