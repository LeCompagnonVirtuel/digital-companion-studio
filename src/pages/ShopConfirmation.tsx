import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  Download,
  ArrowRight,
  HeadphonesIcon,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface OrderDetails {
  id: string;
  order_number: string;
  status: string;
  product_title: string;
  price: number;
  customer_email: string;
  download_link?: string;
}

const ShopConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) {
          console.error("Error fetching order:", error);
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Poll for status updates if pending
    const interval = setInterval(async () => {
      if (orderId && order?.status === "pending_payment") {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();
        
        if (data && data.status !== order.status) {
          setOrder(data);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, order?.status]);

  const getStatusContent = () => {
    if (loading) {
      return {
        icon: <Loader2 className="w-12 h-12 text-primary animate-spin" />,
        iconBg: "bg-primary/10",
        title: "Vérification en cours...",
        description: "Nous vérifions le statut de votre paiement.",
      };
    }

    if (!order) {
      return {
        icon: <Clock className="w-12 h-12 text-amber-500" />,
        iconBg: "bg-amber-500/10",
        title: "Commande en attente",
        description: "Votre commande a été créée. Vous recevrez vos produits dès que le paiement sera confirmé.",
      };
    }

    switch (order.status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-12 h-12 text-emerald-500" />,
          iconBg: "bg-emerald-500/10",
          title: "Paiement confirmé !",
          description: `Merci pour votre achat ! Votre commande ${order.order_number} a été traitée avec succès.`,
        };
      case "failed":
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          iconBg: "bg-red-500/10",
          title: "Paiement échoué",
          description: "Le paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support.",
        };
      case "pending_payment":
      default:
        return {
          icon: <Clock className="w-12 h-12 text-amber-500" />,
          iconBg: "bg-amber-500/10",
          title: "En attente de paiement",
          description: "Votre paiement est en cours de traitement via Money Fusion. Cette page se mettra à jour automatiquement.",
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="container-wide pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 rounded-full ${statusContent.iconBg} flex items-center justify-center mx-auto mb-8`}
          >
            {statusContent.icon}
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {statusContent.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {statusContent.description}
          </p>

          {/* Order Details */}
          {order && (
            <Card className="mb-8 text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Détails de la commande</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Numéro de commande</span>
                    <span className="font-mono">{order.order_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produit</span>
                    <span>{order.product_title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-semibold">{order.price.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{order.customer_email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Steps */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className={`w-12 h-12 rounded-full ${order?.status === "completed" ? "bg-emerald-500/10" : "bg-amber-500/10"} flex items-center justify-center mx-auto mb-3`}>
                    {order?.status === "completed" ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Clock className="w-6 h-6 text-amber-500" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">Paiement</h3>
                  <p className="text-sm text-muted-foreground">
                    {order?.status === "completed" ? "Confirmé via Money Fusion" : "En attente de confirmation"}
                  </p>
                </div>
                <div>
                  <div className={`w-12 h-12 rounded-full ${order?.status === "completed" ? "bg-emerald-500/10" : "bg-muted"} flex items-center justify-center mx-auto mb-3`}>
                    <Mail className={`w-6 h-6 ${order?.status === "completed" ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold mb-1">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    Email envoyé après paiement
                  </p>
                </div>
                <div>
                  <div className={`w-12 h-12 rounded-full ${order?.status === "completed" && order?.download_link ? "bg-emerald-500/10" : "bg-muted"} flex items-center justify-center mx-auto mb-3`}>
                    <Download className={`w-6 h-6 ${order?.status === "completed" && order?.download_link ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold mb-1">Téléchargement</h3>
                  <p className="text-sm text-muted-foreground">
                    {order?.status === "completed" && order?.download_link 
                      ? "Disponible maintenant" 
                      : "Lien d'accès dans votre email"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          {order?.status === "completed" && order?.download_link && (
            <div className="mb-8">
              <Button asChild size="lg" className="gap-2">
                <a href={order.download_link} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                  Télécharger votre produit
                </a>
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" variant={order?.status === "completed" ? "default" : "outline"}>
              <Link to="/boutique">
                Continuer mes achats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Besoin d'aide ?
              </Link>
            </Button>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-6">
            <p className="mb-2">
              <strong>Important :</strong> Vérifiez également votre dossier spam/indésirables.
            </p>
            <p>
              Pour toute question, contactez-nous à{" "}
              <a href="mailto:support@lecompagnonvirtuel.com" className="text-primary hover:underline">
                support@lecompagnonvirtuel.com
              </a>
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopConfirmation;
