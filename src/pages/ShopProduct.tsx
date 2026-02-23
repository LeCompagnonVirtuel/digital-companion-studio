import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Download,
  Star,
  Shield,
  Zap,
  ChevronRight,
  Package,
  Award,
  HeadphonesIcon,
  Clock,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDigitalProduct, useDigitalProducts, useProductTestimonials } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";
import { ProductCard } from "@/components/shop/ProductCard";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F CFA`;

const ShopProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useDigitalProduct(slug || "");
  const { data: testimonials } = useProductTestimonials(product?.id || "");
  const { data: relatedProducts } = useDigitalProducts({ category: product?.category, limit: 4 });
  const { addItem, isInCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const inCart = product ? isInCart(product.id) : false;
  const hasDiscount = product?.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price!) * 100)
    : 0;
  
  const allImages = product ? [product.featured_image, ...(product.images || [])].filter(Boolean) as string[] : [];
  const related = relatedProducts?.filter(p => p.id !== product?.id).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-5">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-14 w-full" />
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
        <div className="container-wide pt-24 pb-20 text-center py-20">
          <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-6">Ce produit n'existe pas ou n'est plus disponible.</p>
          <Button asChild><Link to="/boutique">Retour à la boutique</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="container-wide pt-20 sm:pt-24 pb-3">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/boutique" className="hover:text-foreground transition-colors">Boutique</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-wide pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground/20" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_bestseller && (
                  <Badge className="bg-amber-500 text-white border-0 text-xs shadow-md">
                    <Award className="w-3 h-3 mr-1" /> Best Seller
                  </Badge>
                )}
                {product.is_new && (
                  <Badge className="bg-emerald-500 text-white border-0 text-xs shadow-md">Nouveau</Badge>
                )}
                {product.is_limited_offer && (
                  <Badge className="bg-rose-500 text-white border-0 text-xs shadow-md">
                    <Clock className="w-3 h-3 mr-1" /> Offre Limitée
                  </Badge>
                )}
              </div>

              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-rose-500 text-white border-0 text-lg px-3 py-1 shadow-md">
                  -{discountPercent}%
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {allImages.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Category + Format */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="uppercase text-[10px] sm:text-xs">{product.category}</Badge>
              {product.file_format && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs">{product.file_format}</Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.sales_count || 0} ventes)</span>
            </div>

            {product.short_description && (
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.short_description}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 py-3">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{formatFCFA(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatFCFA(product.original_price!)}</span>
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-sm">
                    Économisez {formatFCFA(product.original_price! - product.price)}
                  </Badge>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 h-13 sm:h-14 text-base sm:text-lg rounded-xl"
                onClick={() => addItem(product)}
                disabled={inCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {inCart ? "Déjà dans le panier" : "Ajouter au panier"}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 sm:h-14 text-base sm:text-lg rounded-xl">
                <Link to="/boutique/checkout">Acheter maintenant</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-border/50">
              {[
                { icon: Zap, label: "Accès Instantané" },
                { icon: Shield, label: "Paiement Sécurisé" },
                { icon: HeadphonesIcon, label: "Support Inclus" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-3">Ce que vous obtenez</h3>
                <ul className="space-y-2.5">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Details */}
            {product.content_details && product.content_details.length > 0 && (
              <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" /> Ce que vous recevez
                </h3>
                <ul className="space-y-2">
                  {product.content_details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-base mb-2">À propos</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* File Info */}
            {(product.file_size || product.file_format) && (
              <div className="flex items-center gap-5 text-sm text-muted-foreground pt-2">
                {product.file_format && (
                  <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {product.file_format}</span>
                )}
                {product.file_size && <span>Taille: {product.file_size}</span>}
              </div>
            )}

            {/* FAQ */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="access">
                <AccordionTrigger className="text-sm">Comment accéder à mon produit ?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Après votre paiement via Money Fusion, vous recevrez un email avec le lien de téléchargement. L'accès est instantané.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="guarantee">
                <AccordionTrigger className="text-sm">Quelle est la garantie ?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Nous offrons une garantie satisfait ou remboursé de 30 jours. Si le produit ne vous convient pas, contactez-nous pour un remboursement intégral.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger className="text-sm">Quels sont les moyens de paiement ?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Nous acceptons Mobile Money, Wave, Orange Money et carte bancaire via notre partenaire sécurisé Money Fusion.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="support">
                <AccordionTrigger className="text-sm">Puis-je contacter le support ?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Oui, notre équipe est disponible par email et WhatsApp pour vous accompagner dans l'utilisation de votre produit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-24"
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-8">Ce que disent nos clients</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border/50 rounded-2xl p-5"
                  style={{ boxShadow: 'var(--shadow-soft)' }}
                >
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">"{t.content}"</p>
                  <div className="flex items-center gap-2.5">
                    {t.author_avatar ? (
                      <img src={t.author_avatar} alt={t.author_name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{t.author_name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm">{t.author_name}</p>
                      {t.author_title && <p className="text-[10px] text-muted-foreground">{t.author_title}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-24"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-display font-bold">Produits similaires</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/boutique">Voir tout <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </section>

      <Footer />

      {/* Sticky Mobile CTA */}
      {product && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">{product.title}</p>
              <p className="text-base font-bold">{formatFCFA(product.price)}</p>
            </div>
            <Button
              onClick={() => addItem(product)}
              disabled={inCart}
              className="h-11 px-5 rounded-xl font-semibold shrink-0"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {inCart ? "Ajouté" : "Ajouter"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProduct;
