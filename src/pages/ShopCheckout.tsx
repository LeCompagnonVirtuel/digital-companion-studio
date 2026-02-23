import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  Lock,
  Check,
  ChevronRight,
  Trash2,
  Package,
  Mail,
  Loader2,
  Shield,
  Zap,
  HeadphonesIcon,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formatFCFA = (price: number) => `${Math.round(price).toLocaleString("fr-FR")} F CFA`;

const steps = ["Informations", "Paiement", "Confirmation"];

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
  const currentStep = 1; // Always on step 1 (info + payment combined)

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

    try {
      const item = items[0];
      const orderNumber = `LCV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const order = await createOrder.mutateAsync({
        customer_email: formData.email,
        customer_name: formData.name,
        product_id: item.product.id,
        product_title: item.product.title,
        price: total,
        currency: "XOF",
        payment_method: "money_fusion",
        download_link: item.product.download_url || undefined,
        order_number: orderNumber,
      });

      const returnUrl = `${window.location.origin}/boutique/confirmation?order=${order.id}`;

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'moneyfusion-payment',
        {
          body: {
            orderId: order.id,
            customerEmail: formData.email,
            customerName: formData.name || 'Client',
            productTitle: items.length > 1 
              ? `${item.product.title} + ${items.length - 1} autres` 
              : item.product.title,
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20 text-center py-20 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">Ajoutez des produits digitaux pour commencer.</p>
          <Button asChild><Link to="/boutique">Explorer la boutique</Link></Button>
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
          <span className="text-foreground">Paiement</span>
        </nav>
      </div>

      <section className="container-wide pb-16 sm:pb-24">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 lg:mx-0 lg:max-w-none">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs sm:text-sm font-medium hidden sm:inline ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 rounded ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-6">Finaliser votre commande</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact */}
                <Card className="rounded-2xl border-border/50" style={{ boxShadow: 'var(--shadow-soft)' }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Mail className="w-4 h-4 text-primary" /> Informations de contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-12 rounded-xl"
                      />
                      <p className="text-[10px] text-muted-foreground">Votre produit sera envoyé à cette adresse</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">Nom complet</Label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="rounded-2xl border-border/50" style={{ boxShadow: 'var(--shadow-soft)' }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lock className="w-4 h-4 text-primary" /> Mode de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-4 border rounded-xl bg-muted/30 border-primary/20">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        MF
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">Money Fusion</p>
                        <p className="text-xs text-muted-foreground truncate">Mobile Money, Carte, Wave, Orange Money</p>
                      </div>
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                    J'accepte les{" "}
                    <Link to="/terms" className="text-primary hover:underline">conditions générales</Link>{" "}et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline">politique de confidentialité</Link>
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base rounded-xl gap-2"
                  disabled={isSubmitting || !formData.acceptTerms || !formData.email}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Traitement en cours...</>
                  ) : (
                    <><Lock className="w-5 h-5" /> Payer {formatFCFA(total)}</>
                  )}
                </Button>

                <p className="text-center text-[10px] text-muted-foreground">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Paiement 100% sécurisé via Money Fusion
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right: Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <Card className="lg:sticky lg:top-24 rounded-2xl border-border/50" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Récapitulatif</span>
                  <span className="text-xs font-normal text-muted-foreground">{itemCount} article{itemCount > 1 ? "s" : ""}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                        {item.product.featured_image ? (
                          <img src={item.product.featured_image} alt={item.product.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-muted-foreground/50" /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs line-clamp-2">{item.product.title}</h4>
                        <p className="text-sm font-semibold mt-0.5">{formatFCFA(item.product.price)}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatFCFA(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVA</span>
                    <span>Incluse</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatFCFA(total)}</span>
                </div>

                {/* Trust */}
                <div className="pt-3 space-y-2.5">
                  {[
                    { icon: Zap, text: "Accès instantané après paiement" },
                    { icon: Shield, text: "Garantie satisfait ou remboursé 30 jours" },
                    { icon: HeadphonesIcon, text: "Support client réactif" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <p className="text-[10px] text-muted-foreground mb-2">Moyens de paiement acceptés</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Mobile Money", "Wave", "Orange Money", "Carte"].map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 bg-muted rounded text-muted-foreground">{m}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopCheckout;
