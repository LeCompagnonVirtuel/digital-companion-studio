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
    <section className="py-20">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="badge-premium mb-4">
              <Sparkles className="w-4 h-4" />
              Produits Phares
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Nos Meilleures Ventes
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Découvrez les produits les plus appréciés par notre communauté
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/boutique">
              Voir tous les produits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-muted/30 rounded-2xl"
          >
            <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Bientôt disponible</h3>
            <p className="text-muted-foreground">
              Nos produits phares arrivent très prochainement !
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
