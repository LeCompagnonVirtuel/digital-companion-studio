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
  AlertCircle,
  Package,
  Mail,
  Loader2,
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
import { useCurrency } from "@/hooks/useCurrency";
import { useCreateOrder } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ShopCheckout = () => {
  const navigate = useNavigate();
  const { items, removeItem, total, clearCart, itemCount } = useCart();
  const { formatPrice } = useCurrency();
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast({
        title: "Conditions requises",
        description: "Veuillez accepter les conditions générales de vente.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des produits à votre panier avant de commander.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For multiple items, we'll create a combined order
      // For now, we process the first item (most common case for digital products)
      const item = items[0];
      
      // Generate order number
      const orderNumber = `LCV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Create order first
      const order = await createOrder.mutateAsync({
        customer_email: formData.email,
        customer_name: formData.name,
        product_id: item.product.id,
        product_title: item.product.title,
        price: total,
        currency: item.product.currency || "EUR",
        payment_method: "money_fusion",
        download_link: item.product.download_url || undefined,
        order_number: orderNumber,
      });

      console.log("Order created:", order);

      // Get return URL for after payment
      const returnUrl = `${window.location.origin}/boutique/confirmation?order=${order.id}`;

      // Initiate Money Fusion payment
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

      if (paymentError) {
        console.error("Payment initiation error:", paymentError);
        throw new Error(paymentError.message || "Erreur lors de l'initiation du paiement");
      }

      if (!paymentData?.paymentUrl) {
        console.error("No payment URL received:", paymentData);
        throw new Error("Impossible d'obtenir le lien de paiement");
      }

      console.log("Payment initiated:", paymentData);

      // Clear cart
      await clearCart();

      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers Money Fusion...",
      });

      // Redirect to Money Fusion payment page
      window.location.href = paymentData.paymentUrl;

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de votre commande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide pt-24 pb-20">
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">
              Ajoutez des produits digitaux pour commencer vos achats.
            </p>
            <Button asChild>
              <Link to="/boutique">Explorer la boutique</Link>
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
          <span className="text-foreground">Paiement</span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="container-wide pb-20">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/boutique">
              <ArrowLeft className="w-4 h-4" />
              Retour à la boutique
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-display font-bold mb-8">
                Finaliser votre commande
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      Informations de contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                        className="h-12"
                      />
                      <p className="text-xs text-muted-foreground">
                        Votre produit sera envoyé à cette adresse
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="h-12"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lock className="w-5 h-5 text-primary" />
                      Mode de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                        MF
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Money Fusion</p>
                        <p className="text-sm text-muted-foreground">
                          Mobile Money, Carte bancaire, Wave, Orange Money
                        </p>
                      </div>
                      <Check className="w-5 h-5 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>

                {/* Info Alert */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Après avoir cliqué sur "Payer", vous serez redirigé vers la plateforme sécurisée{" "}
                    <strong>Money Fusion</strong> pour finaliser votre paiement. 
                    Vous recevrez vos produits immédiatement après confirmation.
                  </AlertDescription>
                </Alert>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        acceptTerms: checked === true,
                      }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    J'accepte les{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      conditions générales de vente
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg gap-2"
                  disabled={isSubmitting || !formData.acceptTerms || !formData.email}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Payer {formatPrice(total)} via Money Fusion
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Paiement 100% sécurisé via Money Fusion
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Récapitulatif</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {itemCount} article{itemCount > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        {item.product.featured_image ? (
                          <img
                            src={item.product.featured_image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.product.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVA</span>
                    <span>Incluse</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Accès instantané après paiement
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Garantie satisfait ou remboursé 30 jours
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Support client réactif
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Moyens de paiement acceptés</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded">Mobile Money</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Wave</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Orange Money</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Carte bancaire</span>
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
