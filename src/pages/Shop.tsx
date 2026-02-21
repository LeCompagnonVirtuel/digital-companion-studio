import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Search, Grid3X3, LayoutList, ArrowUpDown, TrendingUp, Clock, DollarSign, SlidersHorizontal } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDigitalProducts } from "@/hooks/useDigitalProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { TrustSection } from "@/components/shop/TrustSection";
import { GuaranteeSection } from "@/components/shop/GuaranteeSection";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = "popular" | "newest" | "price-asc" | "price-desc";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const { data: products, isLoading } = useDigitalProducts();
  const { itemCount } = useCart();

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort
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
  }, [products, selectedCategory, searchQuery, sortBy]);

  const stats = useMemo(() => {
    if (!products) return { total: 0, bestsellers: 0 };
    return {
      total: products.length,
      bestsellers: products.filter(p => p.is_bestseller).length,
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Premium */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh opacity-60" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-wide relative px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
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
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Propulsez Votre Business{" "}
              <span className="gradient-text block sm:inline">au Niveau Supérieur</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Formations, templates et outils conçus pour les entrepreneurs africains ambitieux. 
              Résultats garantis ou remboursé.
            </p>

            {/* Stats bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-6 sm:gap-8 px-6 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm"
            >
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stats.total}+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Produits</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-bold text-foreground">30j</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Garantie</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-bold text-foreground">⚡</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Accès instantané</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 sm:pb-24">
        <div className="container-wide px-4 sm:px-6">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 mb-8 p-4 sm:p-5 bg-card rounded-2xl border border-border/50 shadow-sm"
          >
            {/* Top Row: Search + Sort + Cart */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 h-11 rounded-xl border-border/50"
                />
              </div>

              {/* Sort + View + Cart */}
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[160px] h-11 rounded-xl bg-background/50 border-border/50">
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
                      <span className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Prix croissant</span>
                    </SelectItem>
                    <SelectItem value="price-desc">
                      <span className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Prix décroissant</span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border-l border-border/50 pl-2 ml-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-9 w-9 rounded-lg"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-9 w-9 rounded-lg"
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>

                <CartDrawer>
                  <Button variant="outline" className="relative h-11 px-3 sm:px-4 rounded-xl border-border/50">
                    <ShoppingBag className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Panier</span>
                    {itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </CartDrawer>
              </div>
            </div>

            {/* Bottom Row: Filters */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className={`grid gap-5 sm:gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
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
            <motion.div 
              layout
              className={`grid gap-5 sm:gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
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
              className="text-center py-16 sm:py-24 bg-muted/20 rounded-2xl border border-border/30"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Aucun produit trouvé</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery || selectedCategory 
                  ? "Essayez de modifier vos filtres ou votre recherche"
                  : "La boutique sera bientôt disponible avec des produits digitaux exclusifs !"}
              </p>
              {(searchQuery || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                  className="rounded-xl"
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <GuaranteeSection />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Shop;
