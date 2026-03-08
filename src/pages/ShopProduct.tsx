import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Check, Download, Star, Shield, Zap, ChevronRight,
  Package, Award, HeadphonesIcon, Clock, RefreshCw, Lock, Eye, Flame,
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
import { ProductProblemSolution } from "@/components/shop/ProductProblemSolution";

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

  const productUrl = typeof window !== "undefined" ? `${window.location.origin}/boutique/${slug}` : "";
  useDocumentMeta({
    title: product?.title || "Produit",
    description: product?.short_description || product?.title || "Découvrez ce produit digital premium",
    image: product?.featured_image || undefined,
    url: productUrl,
    type: "product",
  });

  useEffect(() => {
    if (product) {
      trackEcommerceEvent('view_product', {
        product_id: product.id, product_title: product.title,
        price: product.price, category: product.category,
      });
    }
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    trackEcommerceEvent('add_to_cart', {
      product_id: product.id, product_title: product.title,
      price: product.price, category: product.category,
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

  const stockLeft = 5 + Math.floor((product.sales_count || 0) % 12);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PromoBanner />

      {/* Breadcrumb */}
      <div className="container-wide pt-4 sm:pt-6 pb-3">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/boutique" className="hover:text-foreground transition-colors">Boutique</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* Hero Product Section */}
      <section className="container-wide pb-10 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start">
          {/* Gallery */}
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

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Category + Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="uppercase text-[10px] sm:text-xs tracking-wider">{product.category}</Badge>
              {product.file_format && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs">{product.file_format}</Badge>
              )}
              {product.is_bestseller && (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] sm:text-xs gap-1">
                  <Award className="w-3 h-3" /> Bestseller
                </Badge>
              )}
              {product.is_limited_offer && (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] sm:text-xs gap-1 animate-pulse">
                  <Flame className="w-3 h-3" /> Offre limitée
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* Rating + Sales + Social Share */}
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
              <SocialShare url={productUrl} title={product.title} description={product.short_description || undefined} />
            </div>

            {product.short_description && (
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.short_description}</p>
            )}

            {/* =================== PRICE BLOCK =================== */}
            <div className="relative overflow-hidden bg-muted/40 rounded-2xl p-5 border border-border/30 space-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="flex items-baseline gap-3 relative">
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground">{formatFCFA(product.price)}</span>
                {hasDiscount && (
                  <span className="text-base text-muted-foreground line-through">{formatFCFA(product.original_price!)}</span>
                )}
              </div>

              {hasDiscount && (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                  🎉 Économisez {formatFCFA(product.original_price! - product.price)} (-{discountPercent}%)
                </Badge>
              )}

              {/* Urgency Timer */}
              {(hasDiscount || product.is_limited_offer) && (
                <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-destructive/5 border border-destructive/10">
                  <Flame className="w-4 h-4 text-destructive shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs font-semibold text-destructive">⚡ Offre spéciale aujourd'hui seulement</p>
                  </div>
                  <CountdownTimer variant="compact" endDate={product.limited_offer_end} />
                </div>
              )}

              {/* Scarcity */}
              {product.is_limited_offer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-destructive font-medium"
                >
                  <Package className="w-3.5 h-3.5" />
                  🔥 Plus que {stockLeft} disponibles
                </motion.div>
              )}

              {/* Social Proof */}
              <SocialProofBadge salesCount={product.sales_count} variant="viewers" />
            </div>

            {/* =================== CTA BUTTONS =================== */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant="hero"
                className="flex-1 h-13 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart ? (
                  <><Check className="w-5 h-5 mr-2" /> Déjà dans le panier</>
                ) : (
                  <><ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier</>
                )}
              </Button>
              <Button asChild size="lg" className="h-13 sm:h-14 text-base sm:text-lg rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-500/20">
                <Link to="/boutique/checkout">
                  <Flame className="w-5 h-5 mr-2" />
                  Acheter maintenant
                </Link>
              </Button>
            </div>

            {/* =================== TRUST BADGES =================== */}
            <div className="grid grid-cols-4 gap-2 py-5 border-y border-border/40">
              {[
                { icon: Zap, label: "Accès Instantané", color: "text-amber-500", bg: "from-amber-500/10 to-amber-500/5" },
                { icon: Shield, label: "Paiement Sécurisé", color: "text-emerald-500", bg: "from-emerald-500/10 to-emerald-500/5" },
                { icon: RefreshCw, label: "Garantie 30j", color: "text-primary", bg: "from-primary/10 to-primary/5" },
                { icon: HeadphonesIcon, label: "Support 24/7", color: "text-accent", bg: "from-accent/10 to-accent/5" },
              ].map(({ icon: Icon, label, color, bg }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center group"
                >
                  <div className={`w-10 h-10 mx-auto mb-1.5 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight block font-medium">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* =================== CONTENT DETAILS =================== */}
            {product.content_details && product.content_details.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-5 border border-border/40 shadow-sm"
              >
                <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" /> Ce que vous recevez
                </h3>
                <ul className="space-y-2.5">
                  {product.content_details.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
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
          </motion.div>
        </div>
      </section>

      {/* =================== PROBLEM → SOLUTION → BENEFITS =================== */}
      <section className="container-wide pb-10 sm:pb-16">
        <ProductProblemSolution
          problem={product.problem_solved || undefined}
          benefits={product.benefits || undefined}
          contentDetails={product.content_details || undefined}
        />
      </section>

      {/* =================== DESCRIPTION =================== */}
      {product.description && (
        <section className="container-wide pb-10 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-lg sm:text-xl mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-accent rounded-full" />
              À propos de ce produit
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed max-w-3xl">{product.description}</p>
          </motion.div>
        </section>
      )}

      {/* =================== GUARANTEE + SECURE PAYMENT =================== */}
      <section className="container-wide pb-10 sm:pb-16">
        <div className="max-w-2xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 flex items-start gap-4"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base">Garantie Satisfait ou Remboursé 30 jours</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Si le produit ne vous convient pas, contactez-nous pour un remboursement intégral. Sans condition.
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3 border border-border/20">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold">Paiement 100% sécurisé</p>
              <p className="text-[10px] text-muted-foreground">Mobile Money · Wave · Orange Money · Carte bancaire</p>
            </div>
          </div>
        </div>
      </section>

      {/* =================== TESTIMONIALS =================== */}
      {testimonials && testimonials.length > 0 && (
        <section className="container-wide pb-10 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  className="bg-card border border-border/40 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">"{t.content}"</p>
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
        </section>
      )}

      {/* =================== FAQ =================== */}
      <section className="container-wide pb-10 sm:pb-16">
        <h2 className="font-bold text-lg sm:text-xl mb-4 flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full" />
          Questions fréquentes
        </h2>
        <Accordion type="single" collapsible className="space-y-1.5 max-w-2xl">
          {[
            { value: "access", q: "Comment accéder à mon produit ?", a: "Après votre paiement via Money Fusion, vous recevrez un email avec le lien de téléchargement. L'accès est instantané." },
            { value: "guarantee", q: "Quelle est la garantie ?", a: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si le produit ne vous convient pas, contactez-nous pour un remboursement intégral." },
            { value: "payment", q: "Quels sont les moyens de paiement ?", a: "Nous acceptons Mobile Money, Wave, Orange Money et carte bancaire via notre partenaire sécurisé Money Fusion." },
            { value: "support", q: "Puis-je contacter le support ?", a: "Oui, notre équipe est disponible par email et WhatsApp pour vous accompagner dans l'utilisation de votre produit." },
          ].map(({ value, q, a }) => (
            <AccordionItem key={value} value={value} className="border border-border/30 rounded-xl px-4 overflow-hidden">
              <AccordionTrigger className="text-sm py-3 hover:no-underline font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* =================== RECOMMENDATIONS =================== */}
      <section className="container-wide pb-16 sm:pb-24">
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

      {/* =================== STICKY MOBILE CTA =================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground truncate">{product.title}</p>
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
            className="h-11 px-5 rounded-xl font-semibold shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg"
          >
            {inCart ? (
              <><Check className="w-4 h-4 mr-1.5" /> Ajouté</>
            ) : (
              <><Flame className="w-4 h-4 mr-1.5" /> Acheter</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
