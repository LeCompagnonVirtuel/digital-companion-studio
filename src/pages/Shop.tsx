import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, Search, Grid3X3, LayoutList } from "lucide-react";
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
import { CurrencySelector } from "@/components/shop/CurrencySelector";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: products, isLoading } = useDigitalProducts();
  const { itemCount } = useCart();

  // Get unique categories
  const categories = useMemo(() => {
    if (!products) return [];
    const cats = [...new Set(products.map((p) => p.category))];
    return cats.sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="container-wide relative px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge-premium mx-auto mb-4 sm:mb-6 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Boutique Digitale
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 leading-tight">
              Boostez Votre Business avec Nos{" "}
              <span className="gradient-text">Produits Digitaux</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 px-2">
              Formations, templates, outils et ressources pour propulser votre présence digitale
              et automatiser votre croissance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 sm:pb-20">
        <div className="container-wide px-4 sm:px-6">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-muted/30 rounded-xl sm:rounded-2xl"
          >
            {/* Top Row: Search + Cart */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative flex-1 w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background h-10 sm:h-11"
                />
              </div>

              {/* Right Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                <CurrencySelector />
                
                <div className="hidden sm:flex items-center gap-1 border-l pl-4 ml-2">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-9 w-9"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-9 w-9"
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>

                <CartDrawer>
                  <Button variant="outline" className="relative h-9 sm:h-10 px-3 sm:px-4">
                    <ShoppingBag className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Panier</span>
                    {itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </CartDrawer>
              </div>
            </div>

            {/* Bottom Row: Filters */}
            <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
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
            className="mb-4 sm:mb-6"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3 sm:space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-xl sm:rounded-2xl" />
                  <Skeleton className="h-3 sm:h-4 w-3/4" />
                  <Skeleton className="h-3 sm:h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-20 bg-muted/30 rounded-xl sm:rounded-2xl px-4"
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2">Aucun produit trouvé</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                {searchQuery || selectedCategory 
                  ? "Essayez de modifier vos filtres ou votre recherche"
                  : "La boutique sera bientôt disponible avec des produits digitaux exclusifs !"}
              </p>
              {(searchQuery || selectedCategory) ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              ) : (
                <Button asChild size="sm">
                  <a href="/">Retour à l'accueil</a>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* Trust Section */}
      <TrustSection />

      <Footer />
    </div>
  );
};

export default Shop;
