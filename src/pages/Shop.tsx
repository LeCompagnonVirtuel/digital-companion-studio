import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, ArrowUpDown, TrendingUp, Clock, DollarSign, Shield, Zap, Award, Star, SlidersHorizontal, X } from "lucide-react";
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
import { ShoppingBag } from "lucide-react";

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
  { icon: Shield, label: "Paiement sécurisé" },
  { icon: Zap, label: "Accès instantané" },
  { icon: Award, label: "Qualité garantie" },
  { icon: Star, label: "Satisfait ou remboursé" },
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
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: 'hsl(var(--primary) / 0.06)' }} />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full blur-[120px]" style={{ background: 'hsl(var(--accent) / 0.06)' }} />

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="badge-premium mx-auto mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Boutique Digitale Premium
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-5 leading-[1.1]">
              Des Outils Pour{" "}
              <span className="gradient-text">Réussir en Ligne</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Formations, templates et ressources conçus pour les entrepreneurs africains ambitieux.
            </p>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-6 sm:gap-10 px-6 sm:px-8 py-4 rounded-2xl bg-card border border-border/50"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {[
                { value: `${stats.total}+`, label: "Produits" },
                { value: `${stats.clients}+`, label: "Ventes" },
                { value: "30j", label: "Garantie" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-10">
                  {i > 0 && <div className="w-px h-10 bg-border -ml-6 sm:-ml-10" />}
                  <div className="text-center">
                    <p className="text-xl sm:text-3xl font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="border-y border-border/50 bg-muted/30">
        <div className="container-wide py-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-xs sm:text-sm text-muted-foreground">
            {trustItems.map((t, i) => (
              <span key={i} className={`flex items-center gap-1.5 ${i === 3 ? 'hidden sm:flex' : ''}`}>
                <t.icon className="w-4 h-4 text-primary" />
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-10 sm:py-16">
        <div className="container-wide">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4 mb-8"
          >
            {/* Search + Sort + Filters + Cart */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-border/60 bg-card"
                />
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[155px] h-11 rounded-xl bg-card border-border/60">
                    <ArrowUpDown className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">
                      <span className="flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Popularité</span>
                    </SelectItem>
                    <SelectItem value="newest">
                      <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Nouveautés</span>
                    </SelectItem>
                    <SelectItem value="price-asc">
                      <span className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Prix ↑</span>
                    </SelectItem>
                    <SelectItem value="price-desc">
                      <span className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Prix ↓</span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Filter toggle */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 rounded-xl border-border/60 relative"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                <CartDrawer>
                  <Button variant="outline" className="relative h-11 px-4 rounded-xl border-border/60">
                    <ShoppingBag className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline text-sm">Panier</span>
                    {itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full">
                        {itemCount}
                      </Badge>
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-2xl bg-card border border-border/50 space-y-4" style={{ boxShadow: 'var(--shadow-soft)' }}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">Filtres avancés</h3>
                      {activeFiltersCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 text-muted-foreground">
                          <X className="w-3 h-3 mr-1" /> Réinitialiser
                        </Button>
                      )}
                    </div>

                    {/* Price range */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
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
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full h-8 px-4 text-xs shrink-0"
              >
                Tous
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full h-8 px-4 text-xs whitespace-nowrap shrink-0"
                >
                  {categoryLabels[category] || category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                Réinitialiser
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid gap-5 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/3] rounded-2xl" />
                  <div className="space-y-2 px-1">
                    <Skeleton className="h-3 w-16 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div layout className="grid gap-5 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-muted/20 rounded-2xl border border-border/30"
            >
              <Sparkles className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Aucun produit trouvé</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button variant="outline" onClick={clearFilters} className="rounded-xl">
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
