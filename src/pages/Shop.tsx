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
import { CartDrawer } from "@/components/shop/CartDrawer";
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
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge-premium mx-auto mb-6">
              <Sparkles className="w-4 h-4" />
              Boutique Digitale
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Boostez Votre Business avec Nos{" "}
              <span className="gradient-text">Produits Digitaux</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Formations, templates, outils et ressources pour propulser votre présence digitale
              et automatiser votre croissance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container-wide">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-8 p-4 bg-muted/30 rounded-2xl"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Filters & View */}
            <div className="flex items-center gap-4">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <div className="hidden md:flex items-center gap-1 border-l pl-4 ml-4">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>

              <CartDrawer>
                <Button variant="outline" className="relative">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Panier
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-muted/30 rounded-2xl"
            >
              <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Aucun produit trouvé</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory 
                  ? "Essayez de modifier vos filtres ou votre recherche"
                  : "La boutique sera bientôt disponible avec des produits digitaux exclusifs !"}
              </p>
              {(searchQuery || selectedCategory) ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              ) : (
                <Button asChild>
                  <a href="/">Retour à l'accueil</a>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      <Footer />
    </div>
  );
};

export default Shop;
