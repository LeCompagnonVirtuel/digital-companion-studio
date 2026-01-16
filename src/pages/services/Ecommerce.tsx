import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Truck, 
  BarChart3, 
  Shield, 
  ArrowRight, 
  Check, 
  Clock,
  FileText,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
  TrendingUp,
  Smartphone,
  Globe
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: ShoppingCart,
    title: "Boutique en Ligne",
    description: "Sites e-commerce complets avec catalogue produits et gestion commandes.",
    features: ["Catalogue produits", "Panier d'achat", "Gestion stocks", "Multi-devises"],
  },
  {
    icon: CreditCard,
    title: "Paiements Intégrés",
    description: "Solutions de paiement adaptées au marché africain et international.",
    features: ["Mobile Money", "Carte bancaire", "PayPal", "Paiement à la livraison"],
  },
  {
    icon: Truck,
    title: "Gestion Livraison",
    description: "Système complet de gestion des expéditions et suivi colis.",
    features: ["Calcul frais livraison", "Suivi temps réel", "Multi-transporteurs", "Zones personnalisées"],
  },
  {
    icon: Package,
    title: "Gestion Stocks",
    description: "Outils de gestion d'inventaire pour éviter les ruptures.",
    features: ["Alertes stock bas", "Multi-entrepôts", "Variations produits", "Import/export CSV"],
  },
  {
    icon: BarChart3,
    title: "Analytics E-commerce",
    description: "Tableaux de bord pour suivre ventes, conversions et comportements.",
    features: ["Dashboard ventes", "Rapports automatiques", "Tunnel conversion", "Comportement clients"],
  },
  {
    icon: Shield,
    title: "Sécurité & Fiabilité",
    description: "Protection des données clients et transactions sécurisées.",
    features: ["Certificat SSL", "Conformité RGPD", "Sauvegardes auto", "Protection anti-fraude"],
  },
];

const platforms = [
  { name: "WooCommerce", description: "WordPress" },
  { name: "Shopify", description: "SaaS" },
  { name: "Sur-mesure", description: "React/Node" },
  { name: "PrestaShop", description: "Open-source" },
];

const problems = [
  "Vous vendez uniquement en physique et perdez des ventes en ligne",
  "Votre boutique actuelle ne convertit pas assez",
  "Vous n'avez pas de système de paiement mobile money",
  "La gestion des stocks et commandes est chaotique",
  "Votre site n'est pas adapté au mobile",
  "Vous n'avez pas de visibilité sur vos performances",
];

const benefits = [
  {
    title: "Vendez 24h/24",
    description: "Votre boutique ne ferme jamais",
  },
  {
    title: "Paiements simplifiés",
    description: "Mobile Money, cartes et plus encore",
  },
  {
    title: "Gestion centralisée",
    description: "Stocks, commandes, clients en un seul endroit",
  },
  {
    title: "Croissance mesurable",
    description: "Analytics pour optimiser vos ventes",
  },
];

const process = [
  { 
    step: "01", 
    title: "Analyse & Stratégie", 
    description: "Étude de votre marché, produits et objectifs commerciaux",
    duration: "3-5 jours"
  },
  { 
    step: "02", 
    title: "Design & UX", 
    description: "Conception de l'expérience d'achat optimale",
    duration: "5-7 jours"
  },
  { 
    step: "03", 
    title: "Développement", 
    description: "Construction de la boutique avec toutes les fonctionnalités",
    duration: "2-4 semaines"
  },
  { 
    step: "04", 
    title: "Lancement", 
    description: "Tests, formation et mise en ligne de votre boutique",
    duration: "3-5 jours"
  },
];

const deliverables = [
  "Boutique e-commerce complète et fonctionnelle",
  "Intégration paiements (Mobile Money, CB)",
  "Système de gestion des commandes",
  "Gestion des stocks intégrée",
  "Design responsive (mobile, tablette, desktop)",
  "Formation à l'administration",
  "Documentation technique",
  "Support technique 3 mois",
];

const pricing = [
  {
    name: "Starter",
    price: "350 000",
    period: " FCFA",
    description: "Pour débuter dans le e-commerce",
    features: [
      "Jusqu'à 50 produits",
      "Design template personnalisé",
      "Paiement Mobile Money + CB",
      "Gestion commandes basique",
      "Responsive mobile",
      "Formation 2h",
      "Support 1 mois",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "750 000",
    period: " FCFA",
    description: "Pour une boutique professionnelle",
    features: [
      "Jusqu'à 500 produits",
      "Design sur-mesure",
      "Multi-moyens de paiement",
      "Gestion stocks avancée",
      "Calcul livraison automatique",
      "Analytics intégrés",
      "Formation équipe (4h)",
      "Support 3 mois",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "1 500 000",
    period: " FCFA",
    description: "Solution e-commerce complète",
    features: [
      "Produits illimités",
      "Design premium sur-mesure",
      "Marketplace multi-vendeurs possible",
      "Intégrations ERP/CRM",
      "Multi-langues / multi-devises",
      "App mobile en option",
      "Formation complète",
      "Support prioritaire 6 mois",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Boutique Mode Abidjan",
    description: "E-commerce avec paiement Wave/Orange Money qui a généré 500+ ventes en 3 mois",
    result: "500+ ventes",
  },
  {
    title: "Épicerie Fine",
    description: "Click & Collect + livraison qui a doublé le chiffre d'affaires",
    result: "x2 CA en 6 mois",
  },
  {
    title: "Artisan Bijoux",
    description: "Boutique internationale avec livraison monde entier",
    result: "30% ventes export",
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

const Ecommerce = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-green-500/10 blur-3xl -z-10"
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
                  <ShoppingCart size={16} />
                  E-commerce
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Vendez en ligne avec une{" "}
                  <span className="text-primary">boutique</span>{" "}
                  qui convertit
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Boutiques e-commerce optimisées pour le marché africain. 
                  Paiement Mobile Money intégré, gestion stocks, livraison - tout en un.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Lancer ma boutique
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  {platforms.map((p) => (
                    <div key={p.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-muted-foreground">({p.description})</span>
                    </div>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-6 h-full">
                    {/* Mockup boutique */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="h-2 w-1/2 bg-muted rounded mb-3"></div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-muted rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between p-3 bg-primary/10 rounded-xl"
                    >
                      <div>
                        <div className="text-xs text-muted-foreground">Ventes aujourd'hui</div>
                        <div className="text-lg font-bold text-primary">125 000 FCFA</div>
                      </div>
                      <TrendingUp className="text-primary" size={24} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problèmes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ces défis vous concernent ?
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
        <section className="py-20">
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
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Fonctionnalités e-commerce
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
        <section className="py-20">
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
        <section className="py-20 bg-muted/30">
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
        <section className="py-20">
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
        <section className="py-20 bg-muted/30">
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
                    <Link to={`/demarrer-projet?service=e-commerce&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>Choisir ce plan</Link>
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
              Besoin d'une solution sur-mesure ? <Link to="/contact" className="text-primary hover:underline">Contactez-nous</Link>
            </motion.p>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-green-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à lancer votre boutique en ligne ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de votre projet e-commerce et créons ensemble une boutique qui vend.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Lancer ma boutique
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/audit-gratuit">Audit gratuit</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a 
                  href="https://wa.me/2250504292778" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={16} />
                  +225 05 04 29 27 78
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

export default Ecommerce;
