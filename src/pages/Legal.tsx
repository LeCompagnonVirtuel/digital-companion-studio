import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FileText, Building, Mail, Phone, MapPin, Shield } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <FileText size={16} />
                Informations légales
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Mentions <span className="gradient-text">Légales</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="space-y-12">
              {/* Éditeur */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Éditeur du site</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Raison sociale</p>
                      <p className="font-medium">Le Compagnon Virtuel<span className="text-destructive">.</span> SAS</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Forme juridique</p>
                      <p className="font-medium">Société par Actions Simplifiée (SAS)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Capital social</p>
                      <p className="font-medium">10 000 €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">RCS</p>
                      <p className="font-medium">Paris B 123 456 789</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">SIRET</p>
                      <p className="font-medium">123 456 789 00012</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">TVA Intracommunautaire</p>
                      <p className="font-medium">FR 12 123456789</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Directeur de la publication</p>
                      <p className="font-medium">Le Gérant</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Coordonnées</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Adresse</p>
                      <p className="font-medium">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:contact@lecompagnonvirtuel.fr" className="font-medium hover:text-primary transition-colors">
                        contact@lecompagnonvirtuel.fr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                      <a href="tel:+33123456789" className="font-medium hover:text-primary transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hébergeur */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Hébergeur</h2>
                </div>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Nom :</span> <span className="font-medium">Lovable / Supabase</span></p>
                  <p><span className="text-muted-foreground">Adresse :</span> <span className="font-medium">San Francisco, CA, États-Unis</span></p>
                  <p><span className="text-muted-foreground">Site web :</span> <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">lovable.dev</a></p>
                </div>
              </motion.div>

              {/* Propriété intellectuelle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <h2 className="font-display font-bold text-2xl mb-4">Propriété intellectuelle</h2>
                <div className="prose prose-muted max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Les marques et logos reproduits sur ce site sont déposés par les sociétés qui en sont propriétaires.
                  </p>
                </div>
              </motion.div>

              {/* Limitation de responsabilité */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <h2 className="font-display font-bold text-2xl mb-4">Limitation de responsabilité</h2>
                <div className="prose prose-muted max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. En conséquence, Le Compagnon Virtuel<span className="text-destructive">.</span> ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.
                  </p>
                </div>
              </motion.div>

              {/* Crédits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <h2 className="font-display font-bold text-2xl mb-4">Crédits</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="font-medium text-foreground">Conception et réalisation :</span> Le Compagnon Virtuel<span className="text-destructive">.</span></p>
                  <p><span className="font-medium text-foreground">Images :</span> Unsplash, Pexels (libres de droits)</p>
                  <p><span className="font-medium text-foreground">Icônes :</span> Lucide Icons</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
