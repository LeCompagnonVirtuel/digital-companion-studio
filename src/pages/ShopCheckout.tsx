import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Lock, Check, ChevronRight, Trash2, Package,
  Mail, Loader2, Shield, Zap, HeadphonesIcon, User, CreditCard,
  Download, CheckCircle, AlertCircle, ArrowRight, Flame
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEcommerceEvent } from "@/hooks/useAnalytics";
import { CountdownTimer } from "@/components/shop/CountdownTimer";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F CFA`;

const steps = [
  { label: "Panier", icon: ShoppingBag },
  { label: "Informations", icon: User },
  { label: "Paiement", icon: CreditCard },
  { label: "Accès", icon: Download },
];

const ShopCheckout = () => {
  const navigate = useNavigate();
  const { items, removeItem, total, clearCart, itemCount } = useCart();
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  const currentStep = 2; // Step 2 = Informations + Paiement combined

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isNameValid = formData.name.trim().length >= 2;

  const savings = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.product.original_price && item.product.original_price > item.product.price) {
        return sum + (item.product.original_price - item.product.price) * item.quantity;
      }
      return sum;
    }, 0);
  }, [items]);

  const handleBlur = (field: string) => {
    setFieldTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast({ title: "Conditions requises", description: "Veuillez accepter les conditions générales de vente.", variant: "destructive" });
      return;
    }

    if (items.length === 0) {
      toast({ title: "Panier vide", description: "Ajoutez des produits avant de commander.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    // Track checkout event
    trackEcommerceEvent('checkout', {
      items: items.map(i => ({ product_id: i.product.id, title: i.product.title, price: i.product.price })),
      total,
      currency: 'XOF',
    });

    try {
      const mainItem = items[0];
      const orderNumber = `LCV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Create order with first product as primary (for legacy compatibility)
      const order = await createOrder.mutateAsync({
        customer_email: formData.email,
        customer_name: formData.name,
        product_id: mainItem.product.id,
        product_title: items.length > 1
          ? `${mainItem.product.title} + ${items.length - 1} autre${items.length > 2 ? 's' : ''}`
          : mainItem.product.title,
        price: total,
        currency: "XOF",
        payment_method: "money_fusion",
        download_link: mainItem.product.download_url || undefined,
        order_number: orderNumber,
      });

      // Create order_items for each product
      if (items.length > 0) {
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.product.id,
          product_title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Error creating order items:", itemsError);
          // Non-blocking — order is already created
        }
      }

      // Track purchase event
      trackEcommerceEvent('purchase', {
        order_id: order.id,
        order_number: order.order_number,
        items: items.map(i => ({ product_id: i.product.id, title: i.product.title, price: i.product.price })),
        total,
        currency: 'XOF',
        payment_method: 'money_fusion',
      });

      const returnUrl = `${window.location.origin}/boutique/confirmation?order=${order.id}`;

      const productTitle = items.length > 1
        ? `${mainItem.product.title} + ${items.length - 1} autre${items.length > 2 ? 's' : ''}`
        : mainItem.product.title;

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'moneyfusion-payment',
        {
          body: {
            orderId: order.id,
            customerEmail: formData.email,
            customerName: formData.name || 'Client',
            productTitle,
            price: total,
            returnUrl,
          },
        }
      );

      if (paymentError) throw new Error(paymentError.message || "Erreur lors de l'initiation du paiement");
      if (!paymentData?.paymentUrl) throw new Error("Impossible d'obtenir le lien de paiement");

      await clearCart();

      toast({ title: "Redirection vers le paiement", description: "Vous allez être redirigé vers Money Fusion..." });
      window.location.href = paymentData.paymentUrl;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({ title: "Erreur", description: error.message || "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6"
          >
            <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">Ajoutez des produits digitaux pour commencer.</p>
          <Button asChild className="rounded-xl">
            <Link to="/boutique">Explorer la boutique</Link>
          </Button>
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
          <span className="text-foreground font-medium">Paiement</span>
        </nav>
      </div>

      <section className="container-wide pb-16 sm:pb-24">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 lg:mx-0 lg:max-w-none">
          <div className="flex items-center justify-center">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isCompleted = i + 1 < currentStep;
              const isCurrent = i + 1 === currentStep;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isCompleted || isCurrent
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--muted))',
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${
                        isCompleted || isCurrent
                          ? 'text-primary-foreground shadow-md'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span className={`text-[10px] sm:text-xs mt-1.5 font-medium ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <motion.div
                      className="w-10 sm:w-20 h-0.5 mx-2 sm:mx-3 rounded-full"
                      initial={false}
                      animate={{
                        backgroundColor: i + 1 < currentStep
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--border))'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left: Form — single column */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">Finaliser votre commande</h1>
              <p className="text-sm text-muted-foreground mb-8">Remplissez vos informations pour recevoir votre produit instantanément.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <Card className="rounded-2xl border-border/40 overflow-hidden" style={{ boxShadow: 'var(--shadow-soft)' }}>
                  <CardContent className="p-5 sm:p-6 space-y-5">
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="font-semibold text-base">Informations de contact</h2>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Adresse email <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          onBlur={() => handleBlur("email")}
                          required
                          className={`h-12 rounded-xl pr-10 transition-all ${
                            fieldTouched.email
                              ? isEmailValid
                                ? "border-emerald-300 focus-visible:ring-emerald-200"
                                : "border-destructive focus-visible:ring-destructive/20"
                              : ""
                          }`}
                        />
                        {fieldTouched.email && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {isEmailValid ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-destructive" />
                            )}
                          </motion.div>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Votre produit sera envoyé à cette adresse
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                      <div className="relative">
                        <Input
                          id="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          onBlur={() => handleBlur("name")}
                          className={`h-12 rounded-xl pr-10 transition-all ${
                            fieldTouched.name && formData.name
                              ? isNameValid
                                ? "border-emerald-300 focus-visible:ring-emerald-200"
                                : "border-destructive focus-visible:ring-destructive/20"
                              : ""
                          }`}
                        />
                        {fieldTouched.name && formData.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {isNameValid ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-destructive" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="rounded-2xl border-border/40 overflow-hidden" style={{ boxShadow: 'var(--shadow-soft)' }}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="font-semibold text-base">Mode de paiement</h2>
                    </div>

                    <div className="flex items-center gap-3 p-4 border-2 rounded-xl bg-muted/20 border-primary/30 relative">
                      <div className="absolute -top-2.5 right-3">
                        <span className="text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Sélectionné
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                        MF
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">Money Fusion</p>
                        <p className="text-xs text-muted-foreground">Mobile Money • Wave • Orange Money • Carte bancaire</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Payment methods visual */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Mobile Money", "Wave", "Orange Money", "Moov Money", "Carte Visa/MC"].map((m) => (
                        <span key={m} className="text-[10px] px-2.5 py-1 bg-muted rounded-lg text-muted-foreground font-medium">{m}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Security strip */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: "Paiement 100% sécurisé", color: "text-emerald-500" },
                    { icon: Zap, label: "Accès instantané", color: "text-amber-500" },
                    { icon: HeadphonesIcon, label: "Support 7j/7", color: "text-primary" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/30 border border-border/30">
                      <Icon className={`w-5 h-5 ${color} mb-1.5`} />
                      <span className="text-[10px] text-muted-foreground font-medium leading-tight">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/30">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                    J'accepte les{" "}
                    <Link to="/terms" className="text-primary hover:underline font-medium">conditions générales</Link>{" "}et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline font-medium">politique de confidentialité</Link>
                  </Label>
                </div>

                {/* Submit */}
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base rounded-xl gap-2 shadow-lg"
                    disabled={isSubmitting || !formData.acceptTerms || !formData.email || !isEmailValid}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Traitement en cours...</>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Payer {formatFCFA(total)}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Paiement chiffré et sécurisé via Money Fusion
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right: Sticky Summary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="lg:sticky lg:top-24 space-y-4">
              <Card className="rounded-2xl border-border/40 overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-base">Récapitulatif</h2>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {itemCount} article{itemCount > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-3 group/ci"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                            {item.product.featured_image ? (
                              <img src={item.product.featured_image} alt={item.product.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-muted-foreground/40" /></div>
                            )}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[9px] font-bold">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs line-clamp-2 leading-snug">{item.product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm font-bold text-primary">{formatFCFA(item.product.price)}</p>
                              {item.product.original_price && item.product.original_price > item.product.price && (
                                <p className="text-[10px] line-through text-muted-foreground">{formatFCFA(item.product.original_price)}</p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover/ci:opacity-100 transition-opacity"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{formatFCFA(total)}</span>
                    </div>
                    {savings > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-emerald-600 font-medium">Économies</span>
                        <span className="text-emerald-600 font-semibold">-{formatFCFA(savings)}</span>
                      </motion.div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA</span>
                      <span className="text-muted-foreground">Incluse</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-xl font-bold text-primary"
                    >
                      {formatFCFA(total)}
                    </motion.span>
                  </div>
                </CardContent>
              </Card>

              {/* Guarantees card */}
              <Card className="rounded-2xl border-border/40" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <CardContent className="p-4 space-y-3">
                  {[
                    { icon: Zap, text: "Accès instantané après paiement", color: "text-amber-500" },
                    { icon: Shield, text: "Garantie satisfait ou remboursé 30 jours", color: "text-emerald-500" },
                    { icon: HeadphonesIcon, text: "Support client réactif 7j/7", color: "text-primary" },
                    { icon: Lock, text: "Données personnelles protégées", color: "text-muted-foreground" },
                  ].map(({ icon: Icon, text, color }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs">
                      <Icon className={`w-4 h-4 ${color} shrink-0`} />
                      <span className="text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Back to shop */}
              <Button asChild variant="ghost" className="w-full rounded-xl text-sm h-10">
                <Link to="/boutique">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la boutique
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

export default ShopCheckout;
