import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollText, FileCheck, CreditCard, Clock, Shield, AlertTriangle, Scale, HelpCircle } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Terms = () => {
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
                <ScrollText size={16} />
                Conditions contractuelles
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Conditions Générales <span className="gradient-text">de Vente</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ces conditions régissent les relations contractuelles entre Le Compagnon Virtuel<span className="text-destructive">.</span> et ses clients.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Version en vigueur au {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="space-y-8">
              {/* Article 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileCheck size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 1 - Objet et champ d'application</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services conclues entre :</p>
                  <p><strong className="text-foreground">Le Prestataire</strong> : Le Compagnon Virtuel<span className="text-destructive">.</span> SAS, société par actions simplifiée au capital de 10 000 €, immatriculée au RCS de Paris sous le numéro 123 456 789.</p>
                  <p><strong className="text-foreground">Le Client</strong> : toute personne physique ou morale ayant passé commande d'une prestation de services auprès du Prestataire.</p>
                  <p>Les présentes CGV constituent le socle de la négociation commerciale et prévalent sur tout autre document du Client, sauf dérogation expresse et écrite.</p>
                </div>
              </motion.div>

              {/* Article 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ScrollText size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 2 - Services proposés</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>Le Prestataire propose les services suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Création et développement de sites web et applications</li>
                    <li>Marketing digital et stratégie de communication</li>
                    <li>Automatisation des processus par intelligence artificielle</li>
                    <li>Création de contenu et gestion des réseaux sociaux</li>
                    <li>Conseil et accompagnement en transformation digitale</li>
                    <li>Formation et coaching digital</li>
                  </ul>
                  <p>Les caractéristiques principales de chaque prestation sont définies dans le devis ou la proposition commerciale acceptée par le Client.</p>
                </div>
              </motion.div>

              {/* Article 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 3 - Tarifs et modalités de paiement</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">3.1 Tarifs</strong></p>
                  <p>Les prix sont exprimés en euros hors taxes (HT). La TVA applicable est celle en vigueur au jour de la facturation. Les tarifs sont ceux indiqués dans le devis accepté par le Client.</p>
                  
                  <p><strong className="text-foreground">3.2 Modalités de paiement</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Acompte de 30% à la signature du devis</li>
                    <li>40% à la validation de la maquette ou du prototype</li>
                    <li>30% à la livraison finale</li>
                  </ul>
                  
                  <p><strong className="text-foreground">3.3 Délais de paiement</strong></p>
                  <p>Les factures sont payables à 30 jours date de facture, sauf mention contraire. Tout retard de paiement entraîne l'application de pénalités de retard au taux de 3 fois le taux d'intérêt légal.</p>
                  
                  <p><strong className="text-foreground">3.4 Moyens de paiement acceptés</strong></p>
                  <p>Virement bancaire, carte bancaire, chèque.</p>
                </div>
              </motion.div>

              {/* Article 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 4 - Délais et livraison</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">4.1 Délais indicatifs</strong></p>
                  <p>Les délais de réalisation mentionnés dans le devis sont donnés à titre indicatif. Ils courent à compter de la réception de l'acompte et de tous les éléments nécessaires à la réalisation de la prestation.</p>
                  
                  <p><strong className="text-foreground">4.2 Retards imputables au Client</strong></p>
                  <p>Tout retard dans la fourniture des éléments par le Client entraîne un décalage équivalent des délais de livraison. Le Prestataire ne pourra être tenu responsable de ces retards.</p>
                  
                  <p><strong className="text-foreground">4.3 Validation et recette</strong></p>
                  <p>Le Client dispose d'un délai de 15 jours à compter de la livraison pour émettre ses réserves. Passé ce délai, la prestation est réputée conforme et acceptée.</p>
                </div>
              </motion.div>

              {/* Article 5 */}
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
                  <h2 className="font-display font-bold text-2xl">Article 5 - Propriété intellectuelle</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">5.1 Cession des droits</strong></p>
                  <p>Sous réserve du paiement intégral de la prestation, le Prestataire cède au Client les droits de propriété intellectuelle sur les créations réalisées spécifiquement pour lui.</p>
                  
                  <p><strong className="text-foreground">5.2 Réserve de propriété</strong></p>
                  <p>Jusqu'au paiement complet, le Prestataire conserve l'intégralité des droits de propriété intellectuelle sur les créations. Le Client s'engage à ne pas utiliser, modifier ou diffuser les créations avant le paiement intégral.</p>
                  
                  <p><strong className="text-foreground">5.3 Droit de référence</strong></p>
                  <p>Sauf opposition écrite du Client, le Prestataire se réserve le droit de mentionner le projet réalisé dans ses références commerciales et portfolio.</p>
                </div>
              </motion.div>

              {/* Article 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <AlertTriangle size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 6 - Responsabilité</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">6.1 Obligation de moyens</strong></p>
                  <p>Le Prestataire s'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution des prestations. Sa responsabilité ne saurait être engagée en cas de non-atteinte des objectifs commerciaux du Client.</p>
                  
                  <p><strong className="text-foreground">6.2 Limitation de responsabilité</strong></p>
                  <p>En cas de faute prouvée du Prestataire, sa responsabilité est limitée au montant des sommes effectivement versées par le Client pour la prestation concernée.</p>
                  
                  <p><strong className="text-foreground">6.3 Force majeure</strong></p>
                  <p>Le Prestataire ne pourra être tenu responsable en cas de force majeure ou de circonstances exceptionnelles indépendantes de sa volonté.</p>
                </div>
              </motion.div>

              {/* Article 7 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 7 - Résiliation et annulation</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">7.1 Résiliation par le Client</strong></p>
                  <p>En cas de résiliation par le Client avant la fin de la prestation, les sommes déjà versées restent acquises au Prestataire. Si les travaux réalisés excèdent les montants versés, une facture complémentaire sera émise.</p>
                  
                  <p><strong className="text-foreground">7.2 Résiliation pour faute</strong></p>
                  <p>En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier le contrat de plein droit après mise en demeure restée sans effet pendant 15 jours.</p>
                </div>
              </motion.div>

              {/* Article 8 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HelpCircle size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl">Article 8 - Litiges et droit applicable</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">8.1 Médiation</strong></p>
                  <p>En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. Le Client peut recourir gratuitement au médiateur de la consommation.</p>
                  
                  <p><strong className="text-foreground">8.2 Juridiction compétente</strong></p>
                  <p>À défaut d'accord amiable, tout litige relatif à l'interprétation ou l'exécution des présentes CGV sera soumis aux tribunaux compétents de Paris.</p>
                  
                  <p><strong className="text-foreground">8.3 Droit applicable</strong></p>
                  <p>Les présentes CGV sont soumises au droit français.</p>
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

export default Terms;
