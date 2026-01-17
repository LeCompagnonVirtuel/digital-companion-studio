import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  Download,
  Star,
  Shield,
  Clock,
  Zap,
  ChevronRight,
  Package,
  Award,
  HeadphonesIcon,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDigitalProduct, useProductTestimonials } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { TrustSection } from "@/components/shop/TrustSection";

const ShopProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useDigitalProduct(slug || "");
  const { data: testimonials } = useProductTestimonials(product?.id || "");
  const { addItem, isInCart } = useCart();

  const inCart = product ? isInCart(product.id) : false;
  const hasDiscount = product?.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price!) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20">
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              Ce produit n'existe pas ou n'est plus disponible.
            </p>
            <Button asChild>
              <Link to="/boutique">Retour à la boutique</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="container-wide pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/boutique" className="hover:text-foreground transition-colors">
            Boutique
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-wide pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              {product.featured_image ? (
                <img
                  src={product.featured_image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_bestseller && (
                  <Badge className="bg-amber-500/90 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
                {product.is_new && (
                  <Badge className="bg-emerald-500/90 text-white border-0">
                    Nouveau
                  </Badge>
                )}
                {product.is_limited_offer && (
                  <Badge className="bg-rose-500/90 text-white border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    Offre Limitée
                  </Badge>
                )}
              </div>

              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-rose-500 text-white border-0 text-lg px-3 py-1">
                  -{discountPercent}%
                </Badge>
              )}
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="uppercase text-xs">
                {product.category}
              </Badge>
              {product.file_format && (
                <Badge variant="secondary" className="text-xs">
                  {product.file_format}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 5 ? "text-amber-400 fill-amber-400" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.sales_count || 0} ventes)
              </span>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-lg text-muted-foreground">
                {product.short_description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4">
              <span className="text-4xl font-bold text-foreground">
                {product.price.toFixed(2)}€
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.original_price?.toFixed(2)}€
                </span>
              )}
              {hasDiscount && (
                <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">
                  Économisez {(product.original_price! - product.price).toFixed(2)}€
                </Badge>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-lg"
                onClick={() => addItem(product)}
                disabled={inCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {inCart ? "Déjà dans le panier" : "Ajouter au panier"}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 text-lg">
                <Link to="/boutique/checkout">
                  Acheter maintenant
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">Accès Instantané</span>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">Paiement Sécurisé</span>
              </div>
              <div className="text-center">
                <HeadphonesIcon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-xs text-muted-foreground">Support Inclus</span>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="benefits">Bénéfices</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6 space-y-4">
                {product.problem_solved && (
                  <div>
                    <h3 className="font-semibold mb-2">Problème résolu</h3>
                    <p className="text-muted-foreground">{product.problem_solved}</p>
                  </div>
                )}
                {product.description && (
                  <div>
                    <h3 className="font-semibold mb-2">À propos</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                {product.benefits && product.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    Les bénéfices seront bientôt disponibles.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="content" className="mt-6">
                {product.content_details && product.content_details.length > 0 ? (
                  <ul className="space-y-3">
                    {product.content_details.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Download className="w-4 h-4 text-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    Le détail du contenu sera bientôt disponible.
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {/* File Info */}
            {(product.file_size || product.file_format) && (
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                {product.file_format && (
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Format: {product.file_format}
                  </div>
                )}
                {product.file_size && (
                  <div>Taille: {product.file_size}</div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-display font-bold mb-8">
              Ce que disent nos clients
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-6"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.author_avatar ? (
                      <img
                        src={testimonial.author_avatar}
                        alt={testimonial.author_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {testimonial.author_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm">{testimonial.author_name}</p>
                      {testimonial.author_title && (
                        <p className="text-xs text-muted-foreground">
                          {testimonial.author_title}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Related Products */}
      <FeaturedProducts />

      {/* Trust Section */}
      <TrustSection />

      <Footer />
    </div>
  );
};

export default ShopProduct;
