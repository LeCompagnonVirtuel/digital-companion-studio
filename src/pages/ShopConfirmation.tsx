import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  Download,
  ArrowRight,
  HeadphonesIcon,
  Clock,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ShopConfirmation = () => {
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
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Commande en attente de paiement
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Votre commande a été créée avec succès. 
            Vous recevrez vos produits dès que le paiement sera confirmé.
          </p>

          {/* Status Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold mb-1">En attente</h3>
                  <p className="text-sm text-muted-foreground">
                    Paiement Money Fusion en cours de traitement
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    Email envoyé après confirmation
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Téléchargement</h3>
                  <p className="text-sm text-muted-foreground">
                    Lien d'accès dans votre email
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg">
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
