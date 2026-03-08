import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
  access_token: string | null;
  status: string;
  product_title: string;
  price: number;
  customer_email: string;
  download_link?: string;
}

const ShopConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
        icon: <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-spin" />,
        iconBg: "bg-primary/10",
        title: "Vérification en cours...",
        description: "Nous vérifions le statut de votre paiement.",
      };
    }

    if (!order) {
      return {
        icon: <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />,
        iconBg: "bg-amber-500/10",
        title: "Commande en attente",
        description: "Votre commande a été créée. Vous recevrez vos produits dès que le paiement sera confirmé.",
      };
    }

    switch (order.status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />,
          iconBg: "bg-emerald-500/10",
          title: "Paiement confirmé !",
          description: `Merci pour votre achat ! Votre commande ${order.order_number} a été traitée avec succès.`,
        };
      case "failed":
        return {
          icon: <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
          iconBg: "bg-red-500/10",
          title: "Paiement échoué",
          description: "Le paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support.",
        };
      case "pending_payment":
      default:
        return {
          icon: <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />,
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

      <section className="container-wide px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-20">
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
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${statusContent.iconBg} flex items-center justify-center mx-auto mb-6 sm:mb-8`}
          >
            {statusContent.icon}
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4 px-2">
            {statusContent.title}
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-2">
            {statusContent.description}
          </p>

          {/* Order Details */}
          {order && (
            <Card className="mb-6 sm:mb-8 text-left rounded-xl sm:rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Détails de la commande</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Numéro de commande</span>
                    <span className="font-mono text-right truncate max-w-[150px] sm:max-w-none">{order.order_number}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Produit</span>
                    <span className="text-right truncate max-w-[150px] sm:max-w-none">{order.product_title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-semibold">{Math.round(order.price).toLocaleString("fr-FR")} F CFA</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-right truncate max-w-[150px] sm:max-w-none">{order.customer_email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Steps */}
          <Card className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl">
            <CardContent className="p-4 sm:p-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${order?.status === "completed" ? "bg-emerald-500/10" : "bg-amber-500/10"} flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                    {order?.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                    )}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">Paiement</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground hidden sm:block">
                    {order?.status === "completed" ? "Confirmé via Money Fusion" : "En attente de confirmation"}
                  </p>
                </div>
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${order?.status === "completed" ? "bg-emerald-500/10" : "bg-muted"} flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                    <Mail className={`w-5 h-5 sm:w-6 sm:h-6 ${order?.status === "completed" ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">Confirmation</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground hidden sm:block">
                    Email envoyé après paiement
                  </p>
                </div>
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${order?.status === "completed" && order?.download_link ? "bg-emerald-500/10" : "bg-muted"} flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                    <Download className={`w-5 h-5 sm:w-6 sm:h-6 ${order?.status === "completed" && order?.download_link ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">Téléchargement</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground hidden sm:block">
                    {order?.status === "completed" && order?.download_link 
                      ? "Disponible maintenant" 
                      : "Lien d'accès dans votre email"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          {order && (order.status === "completed" || order.status === "paid") && (
            <div className="mb-6 sm:mb-8">
              <Button
                size="lg"
                className="gap-2 h-11 sm:h-12"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/secure-download?order=${order.order_number}&token=${order.access_token}`,
                      { headers: { "Content-Type": "application/json" } }
                    );
                    const data = await res.json();
                    if (data.url) {
                      window.open(data.url, "_blank");
                    } else {
                      alert(data.error || "Impossible de télécharger le fichier.");
                    }
                  } catch {
                    alert("Erreur lors du téléchargement.");
                  }
                }}
              >
                <Download className="w-4 h-4" />
                Télécharger votre produit
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <Button asChild size="default" variant={order?.status === "completed" ? "default" : "outline"} className="h-10 sm:h-11">
              <Link to="/boutique">
                Continuer mes achats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="h-10 sm:h-11">
              <Link to="/contact">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Besoin d'aide ?
              </Link>
            </Button>
          </div>

          {/* Info */}
          <div className="text-xs sm:text-sm text-muted-foreground bg-muted/50 rounded-xl p-4 sm:p-6">
            <p className="mb-2">
              <strong>Important :</strong> Vérifiez également votre dossier spam/indésirables.
            </p>
            <p>
              Pour toute question, contactez-nous à{" "}
              <a href="mailto:support@lecompagnonvirtuel.com" className="text-primary hover:underline break-all">
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
