import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Lock, Database, Clock, UserCheck, Mail, Settings } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const sections = [
  {
    icon: Eye,
    title: "Données collectées",
    content: `Nous collectons les données que vous nous fournissez directement :
    
• **Données d'identification** : nom, prénom, adresse email, numéro de téléphone
• **Données professionnelles** : nom de l'entreprise, fonction, secteur d'activité
• **Données de navigation** : adresse IP, type de navigateur, pages visitées, durée de visite
• **Données de communication** : messages envoyés via les formulaires de contact

Ces données sont collectées lors de :
- La création d'un compte ou l'utilisation de nos services
- L'envoi d'un formulaire de contact ou de demande de devis
- La navigation sur notre site web
- L'inscription à notre newsletter`
  },
  {
    icon: Database,
    title: "Finalités du traitement",
    content: `Vos données personnelles sont traitées pour les finalités suivantes :

• **Gestion de la relation client** : traitement des demandes, suivi des projets, facturation
• **Communication** : réponse à vos questions, envoi d'informations sur nos services
• **Marketing** : envoi de newsletters (avec votre consentement), personnalisation des offres
• **Amélioration de nos services** : analyse statistique anonymisée de l'utilisation du site
• **Obligations légales** : conservation des données de facturation, réponse aux réquisitions`
  },
  {
    icon: Lock,
    title: "Sécurité des données",
    content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :

• **Chiffrement** : utilisation de protocoles sécurisés (HTTPS/TLS) pour toutes les communications
• **Accès restreint** : seules les personnes habilitées ont accès aux données personnelles
• **Hébergement sécurisé** : nos serveurs sont hébergés dans des centres de données certifiés
• **Mises à jour régulières** : nos systèmes sont régulièrement mis à jour pour corriger les vulnérabilités
• **Sauvegarde** : vos données sont sauvegardées régulièrement pour prévenir toute perte`
  },
  {
    icon: Clock,
    title: "Durée de conservation",
    content: `Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :

• **Données clients** : durée de la relation commerciale + 5 ans (prescription légale)
• **Données prospects** : 3 ans à compter du dernier contact
• **Données de navigation** : 13 mois maximum
• **Données de facturation** : 10 ans (obligation comptable)
• **Données de newsletter** : jusqu'à désinscription`
  },
  {
    icon: UserCheck,
    title: "Vos droits",
    content: `Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :

• **Droit d'accès** : obtenir la confirmation que vos données sont traitées et en recevoir une copie
• **Droit de rectification** : faire corriger des données inexactes ou incomplètes
• **Droit à l'effacement** : demander la suppression de vos données (dans certaines conditions)
• **Droit à la limitation** : restreindre le traitement de vos données
• **Droit à la portabilité** : recevoir vos données dans un format structuré et lisible
• **Droit d'opposition** : vous opposer au traitement de vos données (notamment pour le marketing)
• **Droit de retrait du consentement** : retirer votre consentement à tout moment

Pour exercer ces droits, contactez-nous à : dpo@lecompagnonvirtuel.fr`
  },
  {
    icon: Settings,
    title: "Cookies",
    content: `Notre site utilise des cookies pour améliorer votre expérience :

**Cookies strictement nécessaires**
- Fonctionnement du site, sécurité, préférences utilisateur
- Durée : session

**Cookies analytiques** (avec consentement)
- Analyse de l'audience et du comportement de navigation
- Durée : 13 mois maximum

**Cookies marketing** (avec consentement)
- Personnalisation des publicités et suivi des conversions
- Durée : 13 mois maximum

Vous pouvez gérer vos préférences cookies à tout moment via le bandeau de consentement ou les paramètres de votre navigateur.`
  }
];

const Privacy = () => {
  useDocumentMeta({ title: "Politique de confidentialité", noindex: true });

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
                <Shield size={16} />
                Protection des données
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Politique de <span className="gradient-text">Confidentialité</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous prenons la protection de vos données personnelles très au sérieux. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="section-padding pb-0">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-primary/5 border border-primary/20"
            >
              <h2 className="font-display font-bold text-xl mb-4">Responsable du traitement</h2>
              <p className="text-muted-foreground mb-4">
                Le responsable du traitement des données personnelles collectées sur ce site est :
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Le Compagnon Virtuel<span className="text-destructive">.</span> SAS</p>
                  <p className="text-muted-foreground">123 Avenue des Champs-Élysées</p>
                  <p className="text-muted-foreground">75008 Paris, France</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email : <a href="mailto:dpo@lecompagnonvirtuel.fr" className="text-primary hover:underline">dpo@lecompagnonvirtuel.fr</a></p>
                  <p className="text-muted-foreground">Téléphone : +225 07 06 69 30 38</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-8 rounded-3xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon size={24} className="text-primary" />
                    </div>
                    <h2 className="font-display font-bold text-2xl">{section.title}</h2>
                  </div>
                  <div className="prose prose-muted max-w-none">
                    {section.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-2 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact DPO */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-foreground text-background text-center"
            >
              <Mail size={32} className="mx-auto mb-4 text-primary" />
              <h2 className="font-display font-bold text-2xl mb-4">Une question sur vos données ?</h2>
              <p className="text-background/70 mb-6 max-w-lg mx-auto">
                Notre Délégué à la Protection des Données (DPO) est à votre disposition pour toute question concernant le traitement de vos données personnelles.
              </p>
              <a 
                href="mailto:dpo@lecompagnonvirtuel.fr"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail size={18} />
                Contacter le DPO
              </a>
              <p className="text-sm text-background/50 mt-6">
                Vous pouvez également adresser une réclamation à la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
