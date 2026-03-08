import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  XCircle,
  RefreshCw,
  ShoppingBag,
  HeadphonesIcon,
  Shield,
  Lock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderDetails {
  id: string;
  order_number: string;
  product_title: string;
  price: number;
  customer_email: string;
  customer_name: string | null;
  status: string;
}

const failureReasons = [
  { icon: AlertTriangle, text: "Solde insuffisant sur votre compte mobile money" },
  { icon: AlertTriangle, text: "Transaction annulée ou expirée" },
  { icon: AlertTriangle, text: "Problème temporaire avec le réseau de paiement" },
  { icon: AlertTriangle, text: "Code PIN incorrect ou compte bloqué" },
];

const ShopPaymentError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from("orders")
          .select("id, order_number, product_title, price, customer_email, customer_name, status")
          .eq("id", orderId)
          .single();
        if (data) setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleRetry = async () => {
    if (!order) return;
    setRetrying(true);
    try {
      const returnUrl = `${window.location.origin}/boutique/confirmation?order=${order.id}`;

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "moneyfusion-payment",
        {
          body: {
            orderId: order.id,
            customerEmail: order.customer_email,
            customerName: order.customer_name || "Client",
            productTitle: order.product_title,
            price: order.price,
            returnUrl,
          },
        }
      );

      if (paymentError || !paymentData?.paymentUrl) {
        toast({
          title: "Erreur",
          description: "Impossible de relancer le paiement. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers Money Fusion...",
      });
      window.location.href = paymentData.paymentUrl;
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="container-wide px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6 sm:mb-8"
          >
            <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
            Votre paiement n'a pas abouti
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-2">
            Ne vous inquiétez pas, aucun montant n'a été débité. Vous pouvez réessayer à tout moment.
          </p>

          {/* Order Details */}
          {loading ? (
            <div className="flex justify-center mb-6">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : order ? (
            <Card className="mb-6 sm:mb-8 text-left rounded-xl sm:rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Détails de la commande</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Numéro</span>
                    <span className="font-mono text-right truncate max-w-[180px] sm:max-w-none">
                      {order.order_number}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Produit</span>
                    <span className="text-right truncate max-w-[180px] sm:max-w-none">
                      {order.product_title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-semibold">
                      {Math.round(order.price).toLocaleString("fr-FR")} F CFA
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Possible Reasons */}
          <Card className="mb-6 sm:mb-8 text-left rounded-xl sm:rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Causes possibles</h3>
              <ul className="space-y-3">
                {failureReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                    <reason.icon className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                    <span>{reason.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            {order && (
              <Button
                size="lg"
                className="gap-2 h-11 sm:h-12"
                onClick={handleRetry}
                disabled={retrying}
              >
                {retrying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Réessayer le paiement
              </Button>
            )}
            <Button asChild variant="outline" size="default" className="h-10 sm:h-11">
              <Link to="/boutique">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Retour à la boutique
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="h-10 sm:h-11">
              <Link to="/contact">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Contacter le support
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>Données protégées</span>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopPaymentError;
