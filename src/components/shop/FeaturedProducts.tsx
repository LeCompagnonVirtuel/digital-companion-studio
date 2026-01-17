import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDigitalProducts } from "@/hooks/useDigitalProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedProducts = () => {
  const { data: products, isLoading } = useDigitalProducts({ featured: true, limit: 4 });

  return (
    <section className="py-12 sm:py-20">
      <div className="container-wide px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12"
        >
          <div>
            <div className="badge-premium mb-3 sm:mb-4 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Produits Phares
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2">
              Nos Meilleures Ventes
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
              Découvrez les produits les plus appréciés par notre communauté
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-auto">
            <Link to="/boutique">
              Voir tous les produits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3 sm:space-y-4">
                <Skeleton className="aspect-[4/3] rounded-xl sm:rounded-2xl" />
                <Skeleton className="h-3 sm:h-4 w-3/4" />
                <Skeleton className="h-3 sm:h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 bg-muted/30 rounded-xl sm:rounded-2xl"
          >
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-semibold text-base sm:text-lg mb-2">Bientôt disponible</h3>
            <p className="text-sm text-muted-foreground">
              Nos produits phares arrivent très prochainement !
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
