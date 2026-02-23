import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Search, ArrowUpDown, TrendingUp, Clock, DollarSign, Shield, Zap, Award, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    if (!products) return { total: 0, clients: 0 };
    return {
      total: products.length,
      clients: products.reduce((sum, p) => sum + (p.sales_count || 0), 0),
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        
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

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-6 sm:gap-10 px-6 sm:px-8 py-4 rounded-2xl bg-card border border-border/50"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-bold text-foreground">{stats.total}+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Produits</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-bold text-foreground">{stats.clients}+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Ventes</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-xl sm:text-3xl font-bold text-foreground">30j</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Garantie</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="border-y border-border/50 bg-muted/30">
        <div className="container-wide py-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Paiement sécurisé</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Accès instantané</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> Qualité garantie</span>
            <span className="flex items-center gap-1.5 hidden sm:flex"><Star className="w-4 h-4 text-primary" /> Satisfait ou remboursé</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-10 sm:py-16">
        <div className="container-wide">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4 mb-8"
          >
            {/* Search + Sort + Cart */}
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

            {/* Category Filters */}
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

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            {(searchQuery || selectedCategory) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                className="text-xs h-7"
              >
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
            <motion.div 
              layout
              className="grid gap-5 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
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
              className="text-center py-20 bg-muted/20 rounded-2xl border border-border/30"
            >
              <Sparkles className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Aucun produit trouvé</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button
                variant="outline"
                onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                className="rounded-xl"
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center"
            style={{ background: 'var(--gradient-dark)' }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Besoin d'un Projet Sur Mesure ?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm sm:text-base">
                Discutons de votre projet et trouvons la solution idéale pour votre business.
              </p>
              <Button asChild size="lg" className="h-12 px-8 rounded-xl text-base">
                <Link to="/contact">
                  Parlons de votre projet
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
