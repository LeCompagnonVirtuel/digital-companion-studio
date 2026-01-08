import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Calculator, 
  FileSpreadsheet, 
  QrCode, 
  Link2, 
  CreditCard, 
  ArrowRight, 
  Check, 
  Clock,
  FileText,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
  TrendingUp,
  Zap,
  BarChart
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Calculator,
    title: "Calculateurs Personnalisés",
    description: "Outils de calcul interactifs pour estimer prix, ROI ou toute métrique.",
    features: ["Calculateur de devis", "Simulateur ROI", "Estimateur prix", "Outil diagnostic"],
  },
  {
    icon: QrCode,
    title: "QR Codes Dynamiques",
    description: "QR codes trackables et modifiables pour vos campagnes marketing.",
    features: ["QR code personnalisé", "Tracking analytics", "Modification contenu", "Multi-usages"],
  },
  {
    icon: FileSpreadsheet,
    title: "Formulaires Intelligents",
    description: "Formulaires avancés avec logique conditionnelle et intégrations.",
    features: ["Logique conditionnelle", "Calculs automatiques", "Intégrations CRM", "Exports données"],
  },
  {
    icon: Link2,
    title: "Pages de Liens",
    description: "Pages de liens personnalisées style Linktree avec votre branding.",
    features: ["Design personnalisé", "Analytics intégrés", "Liens illimités", "Domaine personnalisé"],
  },
  {
    icon: CreditCard,
    title: "Cartes de Visite Digitales",
    description: "Cartes de visite NFC et QR avec toutes vos informations.",
    features: ["Design premium", "NFC compatible", "Mise à jour facile", "Analytics contacts"],
  },
  {
    icon: BarChart,
    title: "Dashboards Interactifs",
    description: "Tableaux de bord visuels pour présenter vos données.",
    features: ["Graphiques animés", "Données temps réel", "Export PDF", "Partage sécurisé"],
  },
];

const gadgetTypes = [
  { type: "Calculateurs", use: "Devis, ROI, simulations" },
  { type: "QR Codes", use: "Marketing, événements" },
  { type: "Formulaires", use: "Leads, inscriptions" },
  { type: "Pages liens", use: "Bio réseaux sociaux" },
  { type: "Cartes digitales", use: "Networking, contacts" },
  { type: "Widgets", use: "Intégration sites web" },
];

const problems = [
  "Vous passez trop de temps à faire des devis manuellement",
  "Vos formulaires ne sont pas assez interactifs",
  "Vous n'avez pas d'outils pour capturer des leads",
  "Vos cartes de visite finissent à la poubelle",
  "Vous ne pouvez pas tracker vos QR codes",
  "Vos processus clients ne sont pas automatisés",
];

const benefits = [
  {
    title: "Automatisation",
    description: "Gagnez des heures sur les tâches répétitives",
  },
  {
    title: "Professionnalisme",
    description: "Impressionnez avec des outils modernes",
  },
  {
    title: "Conversion",
    description: "Transformez plus de visiteurs en leads",
  },
  {
    title: "Tracking",
    description: "Mesurez tout et optimisez en continu",
  },
];

const process = [
  { 
    step: "01", 
    title: "Définition", 
    description: "Compréhension de votre besoin et objectifs du gadget",
    duration: "1-2 jours"
  },
  { 
    step: "02", 
    title: "Conception", 
    description: "Design et prototypage de l'outil",
    duration: "2-3 jours"
  },
  { 
    step: "03", 
    title: "Développement", 
    description: "Création et intégrations nécessaires",
    duration: "3-7 jours"
  },
  { 
    step: "04", 
    title: "Livraison", 
    description: "Tests, formation et mise en production",
    duration: "1-2 jours"
  },
];

const deliverables = [
  "Gadget fonctionnel et testé",
  "Documentation d'utilisation",
  "Intégrations configurées",
  "Formation à l'utilisation",
  "Support technique 30 jours",
  "Modifications mineures incluses",
  "Analytics et tracking",
  "Hébergement 1 an inclus",
];

const pricing = [
  {
    name: "Starter",
    price: "50 000",
    period: " FCFA",
    description: "Un gadget simple et efficace",
    features: [
      "1 gadget au choix",
      "Design personnalisé basique",
      "Intégration simple",
      "Analytics basiques",
      "Support email 15 jours",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "125 000",
    period: " FCFA",
    description: "Solution complète et personnalisée",
    features: [
      "1 gadget avancé",
      "Design sur-mesure",
      "Intégrations multiples (CRM, email)",
      "Analytics avancés",
      "Logique conditionnelle",
      "Support 30 jours",
      "2 révisions incluses",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "250 000",
    period: " FCFA",
    description: "Pack complet multi-gadgets",
    features: [
      "3 gadgets au choix",
      "Design premium unifié",
      "Toutes intégrations",
      "Dashboard analytics centralisé",
      "Automatisations avancées",
      "Support prioritaire 60 jours",
      "Révisions illimitées",
      "Formation équipe",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Agence Immobilière",
    description: "Calculateur de prêt qui a généré 150+ leads qualifiés en 1 mois",
    result: "150+ leads/mois",
  },
  {
    title: "Coach Business",
    description: "Formulaire diagnostic qui qualifie automatiquement les prospects",
    result: "+70% conversion",
  },
  {
    title: "Restaurant",
    description: "QR codes dynamiques pour menus qui se mettent à jour en temps réel",
    result: "-80% d'impressions",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GadgetsNumeriques = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Zap size={16} />
                  Gadgets Numériques
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Des outils digitaux qui{" "}
                  <span className="text-primary">automatisent</span>{" "}
                  votre business
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Calculateurs, formulaires intelligents, QR codes, cartes de visite digitales... 
                  Des micro-outils puissants pour gagner du temps et impressionner vos clients.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Créer mon gadget
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Voir des exemples</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {gadgetTypes.slice(0, 4).map((gt) => (
                    <span key={gt.type} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium">
                      {gt.type}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex flex-col items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {[Calculator, QrCode, FileSpreadsheet, Link2, CreditCard, BarChart].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <Icon size={24} className="text-primary" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Types de gadgets */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              {gadgetTypes.map((gt, i) => (
                <motion.div
                  key={gt.type}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center"
                >
                  <div className="text-sm font-semibold mb-1">{gt.type}</div>
                  <div className="text-xs text-muted-foreground">{gt.use}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problèmes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ces situations vous parlent ?
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              {problems.map((problem, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-sm">✕</span>
                  </div>
                  <p className="text-sm">{problem}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bénéfices */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ce que vous obtiendrez
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos gadgets numériques
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Notre processus
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl bg-card border border-border"
                >
                  <span className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2 relative">{item.title}</h3>
                  <p className="text-sm text-muted-foreground relative mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Clock size={12} />
                    {item.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Livrables */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ce que vous recevrez
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Exemples de réussites
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <h3 className="font-display font-semibold text-lg mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <TrendingUp size={14} />
                    {useCase.result}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos tarifs
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-6 rounded-2xl bg-card border ${
                    plan.popular ? "border-primary shadow-lg scale-105" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Populaire
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-xl mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/demarrer-projet">Choisir ce plan</Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              Besoin d'un gadget sur-mesure ? <Link to="/contact" className="text-primary hover:underline">Contactez-nous</Link>
            </motion.p>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-cyan-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à automatiser avec un gadget sur-mesure ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de votre besoin et créons l'outil digital parfait pour votre business.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Créer mon gadget
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Discuter de mon projet</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a 
                  href="https://wa.me/2250706693038" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={16} />
                  +225 07 06 69 30 38
                </a>
                <a 
                  href="mailto:lecompagnonvirtuel@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  lecompagnonvirtuel@gmail.com
                </a>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  Côte d'Ivoire
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GadgetsNumeriques;
