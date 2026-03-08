import { useState, useEffect } from "react";
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
  RefreshCw,
  Lock,
  Eye,
  Flame,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDigitalProduct, useProductTestimonials } from "@/hooks/useDigitalProducts";
import { useCart } from "@/hooks/useCart";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductRecommendations } from "@/components/retention/ProductRecommendations";
import { trackEcommerceEvent } from "@/hooks/useAnalytics";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { SocialShare } from "@/components/shop/SocialShare";
import { CountdownTimer } from "@/components/shop/CountdownTimer";
import { SocialProofBadge } from "@/components/shop/SocialProofBadge";
import { PromoBanner } from "@/components/shop/PromoBanner";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F CFA`;

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

  const allImages = product ? [product.featured_image, ...(product.images || [])].filter(Boolean) as string[] : [];

  // SEO meta tags
  const productUrl = typeof window !== "undefined" ? `${window.location.origin}/boutique/${slug}` : "";
  useDocumentMeta({
    title: product?.title || "Produit",
    description: product?.short_description || product?.title || "Découvrez ce produit digital premium",
    image: product?.featured_image || undefined,
    url: productUrl,
    type: "product",
  });

  // Track view_product
  useEffect(() => {
    if (product) {
      trackEcommerceEvent('view_product', {
        product_id: product.id,
        product_title: product.title,
        price: product.price,
        category: product.category,
      });
    }
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    trackEcommerceEvent('add_to_cart', {
      product_id: product.id,
      product_title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-5">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-14 w-full" />
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
      <PromoBanner />

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
            <ProductGallery
              images={allImages}
              title={product.title}
              isBestseller={product.is_bestseller}
              isNew={product.is_new}
              isLimitedOffer={product.is_limited_offer}
              discountPercent={discountPercent}
            />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category + Format */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="uppercase text-[10px] sm:text-xs tracking-wider">{product.category}</Badge>
              {product.file_format && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs">{product.file_format}</Badge>
              )}
              {product.views_count > 0 && (
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
                  <Eye className="w-3 h-3" /> {product.views_count} vues
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* Rating + Social Share */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  5.0 · {product.sales_count || 0} ventes
                </span>
              </div>
              <SocialShare
                url={productUrl}
                title={product.title}
                description={product.short_description || undefined}
              />
            </div>

            {product.short_description && (
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.short_description}</p>
            )}

            {/* Problem Solved */}
            {product.problem_solved && (
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-sm font-medium text-primary mb-1">💡 Problème résolu</p>
                <p className="text-sm text-muted-foreground">{product.problem_solved}</p>
              </div>
            )}

            {/* Price Block */}
            <div className="bg-muted/40 rounded-2xl p-5 border border-border/30">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">{formatFCFA(product.price)}</span>
                {hasDiscount && (
                  <span className="text-base text-muted-foreground line-through">{formatFCFA(product.original_price!)}</span>
                )}
              </div>
              {hasDiscount && (
                <Badge className="mt-2 bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs">
                  🎉 Économisez {formatFCFA(product.original_price! - product.price)}
                </Badge>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant="hero"
                className="flex-1 h-13 sm:h-14 text-base sm:text-lg rounded-xl"
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart ? (
                  <><Check className="w-5 h-5 mr-2" /> Déjà dans le panier</>
                ) : (
                  <><ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier</>
                )}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 sm:h-14 text-base sm:text-lg rounded-xl">
                <Link to="/boutique/checkout">Acheter maintenant</Link>
              </Button>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-4 gap-2 py-5 border-y border-border/40">
              {[
                { icon: Zap, label: "Accès Instantané", color: "text-amber-500" },
                { icon: Shield, label: "Paiement Sécurisé", color: "text-emerald-500" },
                { icon: RefreshCw, label: "Garantie 30j", color: "text-primary" },
                { icon: HeadphonesIcon, label: "Support 24/7", color: "text-accent" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-muted/60 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight block">{label}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  Ce que vous obtenez
                </h3>
                <ul className="space-y-2.5">
                  {product.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Details */}
            {product.content_details && product.content_details.length > 0 && (
              <div className="bg-card rounded-2xl p-5 border border-border/40 shadow-sm">
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" /> Ce que vous recevez
                </h3>
                <ul className="space-y-2">
                  {product.content_details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-accent" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-accent rounded-full" />
                  À propos de ce produit
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* File Info */}
            {(product.file_size || product.file_format) && (
              <div className="flex items-center gap-5 text-sm text-muted-foreground bg-muted/30 rounded-xl px-4 py-3 border border-border/20">
                {product.file_format && (
                  <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {product.file_format}</span>
                )}
                {product.file_size && <span>Taille: {product.file_size}</span>}
              </div>
            )}

            {/* Guarantee Banner */}
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Garantie Satisfait ou Remboursé 30 jours</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Si le produit ne vous convient pas, contactez-nous pour un remboursement intégral. Sans condition.
                </p>
              </div>
            </div>

            {/* Secure Payment Banner */}
            <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3 border border-border/20">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">Paiement 100% sécurisé</p>
                <p className="text-[10px] text-muted-foreground">Mobile Money · Wave · Orange Money · Carte bancaire</p>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-primary rounded-full" />
                Questions fréquentes
              </h3>
              <Accordion type="single" collapsible className="space-y-1">
                {[
                  { value: "access", q: "Comment accéder à mon produit ?", a: "Après votre paiement via Money Fusion, vous recevrez un email avec le lien de téléchargement. L'accès est instantané." },
                  { value: "guarantee", q: "Quelle est la garantie ?", a: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si le produit ne vous convient pas, contactez-nous pour un remboursement intégral." },
                  { value: "payment", q: "Quels sont les moyens de paiement ?", a: "Nous acceptons Mobile Money, Wave, Orange Money et carte bancaire via notre partenaire sécurisé Money Fusion." },
                  { value: "support", q: "Puis-je contacter le support ?", a: "Oui, notre équipe est disponible par email et WhatsApp pour vous accompagner dans l'utilisation de votre produit." },
                ].map(({ value, q, a }) => (
                  <AccordionItem key={value} value={value} className="border border-border/30 rounded-xl px-4 overflow-hidden">
                    <AccordionTrigger className="text-sm py-3 hover:no-underline">{q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-3">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-7 bg-amber-400 rounded-full" />
              <h2 className="text-xl sm:text-2xl font-display font-bold">Ce que disent nos clients</h2>
              <Badge variant="secondary" className="text-xs ml-auto">{testimonials.length} avis</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border/40 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{t.content}"</p>
                  <div className="flex items-center gap-2.5">
                    {t.author_avatar ? (
                      <img src={t.author_avatar} alt={t.author_name} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
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

        {/* Upsell / Cross-sell Recommendations */}
        <ProductRecommendations
          currentProductId={product.id}
          currentCategory={product.category}
          title="Complétez votre achat"
          variant="cross-sell"
          maxProducts={3}
        />

        <ProductRecommendations
          currentProductId={product.id}
          currentCategory={product.category}
          title="Les plus populaires"
          variant="popular"
          maxProducts={3}
        />
      </section>

      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{product.title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-base font-bold">{formatFCFA(product.price)}</p>
              {hasDiscount && (
                <p className="text-[10px] text-muted-foreground line-through">{formatFCFA(product.original_price!)}</p>
              )}
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={inCart}
            variant="hero"
            className="h-11 px-5 rounded-xl font-semibold shrink-0"
          >
            {inCart ? (
              <><Check className="w-4 h-4 mr-1.5" /> Ajouté</>
            ) : (
              <><ShoppingCart className="w-4 h-4 mr-1.5" /> Ajouter</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
