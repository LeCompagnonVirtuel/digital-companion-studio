import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  TrendingUp, 
  Globe, 
  FileText, 
  Link2, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Clock,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
  Target,
  Zap
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "Audit SEO Technique",
    description: "Analyse complète des aspects techniques qui impactent votre référencement.",
    features: ["Vitesse de chargement", "Architecture site", "Indexation", "Mobile-first"],
  },
  {
    icon: FileText,
    title: "Optimisation Contenu",
    description: "Amélioration de vos contenus pour les moteurs de recherche.",
    features: ["Recherche mots-clés", "Optimisation on-page", "Méta descriptions", "Structure Hn"],
  },
  {
    icon: Link2,
    title: "Netlinking",
    description: "Acquisition de liens de qualité pour renforcer votre autorité.",
    features: ["Backlinks qualifiés", "Guest posting", "Digital PR", "Désaveu liens toxiques"],
  },
  {
    icon: Globe,
    title: "SEO Local",
    description: "Optimisation pour apparaître dans les recherches locales.",
    features: ["Google My Business", "Citations locales", "Avis clients", "Géolocalisation"],
  },
  {
    icon: BarChart3,
    title: "Suivi & Reporting",
    description: "Monitoring continu de vos positions et performances.",
    features: ["Suivi positions", "Rapports mensuels", "Analyse trafic", "ROI tracking"],
  },
  {
    icon: Zap,
    title: "SEO E-commerce",
    description: "Optimisation spécifique pour les boutiques en ligne.",
    features: ["Fiches produits", "Catégories", "Schema markup", "Rich snippets"],
  },
];

const stats = [
  { value: "93%", label: "du trafic web vient de Google" },
  { value: "75%", label: "ne vont jamais au-delà de la page 1" },
  { value: "x5", label: "ROI moyen du SEO vs publicité" },
  { value: "14.6%", label: "taux de conversion SEO vs 1.7% publicité" },
];

const problems = [
  "Votre site n'apparaît pas sur Google",
  "Vos concurrents sont mieux positionnés que vous",
  "Vous dépendez trop de la publicité payante",
  "Votre trafic organique stagne ou diminue",
  "Vous ne savez pas quels mots-clés cibler",
  "Votre site est lent et mal optimisé",
];

const benefits = [
  {
    title: "Trafic gratuit",
    description: "Des visiteurs qualifiés sans payer de publicité",
  },
  {
    title: "Crédibilité",
    description: "Être en 1ère page renforce votre autorité",
  },
  {
    title: "ROI durable",
    description: "Investissement rentable sur le long terme",
  },
  {
    title: "Leads qualifiés",
    description: "Attirez des prospects qui cherchent vos services",
  },
];

const process = [
  { 
    step: "01", 
    title: "Audit Complet", 
    description: "Analyse technique, contenu et backlinks de votre site",
    duration: "1 semaine"
  },
  { 
    step: "02", 
    title: "Stratégie", 
    description: "Définition des mots-clés prioritaires et plan d'action",
    duration: "3-5 jours"
  },
  { 
    step: "03", 
    title: "Optimisation", 
    description: "Corrections techniques et optimisation des contenus",
    duration: "2-4 semaines"
  },
  { 
    step: "04", 
    title: "Croissance", 
    description: "Création de contenu et acquisition de liens en continu",
    duration: "Continu"
  },
];

const deliverables = [
  "Audit SEO complet (technique + contenu)",
  "Recherche de mots-clés approfondie",
  "Plan d'optimisation priorisé",
  "Corrections techniques",
  "Optimisation de pages existantes",
  "Création de nouveaux contenus SEO",
  "Rapport de positions mensuel",
  "Recommandations évolutives",
];

const pricing = [
  {
    name: "Starter",
    price: "125 000",
    period: " FCFA/mois",
    description: "Pour démarrer votre SEO",
    features: [
      "Audit SEO initial",
      "5 mots-clés ciblés",
      "Optimisation on-page basique",
      "1 article SEO/mois",
      "Rapport mensuel",
      "Support email",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "275 000",
    period: " FCFA/mois",
    description: "Pour une croissance soutenue",
    features: [
      "Audit SEO complet",
      "15 mots-clés ciblés",
      "Optimisation technique complète",
      "3 articles SEO/mois",
      "Acquisition 5 backlinks/mois",
      "SEO local inclus",
      "Rapport bi-mensuel",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "500 000",
    period: " FCFA/mois",
    description: "Pour dominer votre marché",
    features: [
      "Audit SEO avancé",
      "30+ mots-clés ciblés",
      "Optimisation technique avancée",
      "6+ articles SEO/mois",
      "Acquisition 15+ backlinks/mois",
      "SEO local multi-zones",
      "Stratégie contenu complète",
      "Reporting temps réel",
      "Consultant SEO dédié",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Cabinet Avocat",
    description: "De la page 5 à la position 1 sur 'avocat Abidjan' en 6 mois",
    result: "Position #1",
  },
  {
    title: "E-commerce Beauté",
    description: "Trafic organique multiplié par 4 en 1 an, +200% ventes",
    result: "x4 trafic",
  },
  {
    title: "Agence Immobilière",
    description: "Première page pour 25 requêtes locales stratégiques",
    result: "25 mots-clés top 10",
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

const SEO = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl -z-10"
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
                  <Search size={16} />
                  SEO & Visibilité
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Atteignez la{" "}
                  <span className="text-primary">première page</span>{" "}
                  de Google
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Stratégies SEO complètes pour augmenter votre visibilité, attirer du trafic qualifié 
                  et générer des leads sans dépendre de la publicité.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Améliorer mon SEO
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Audit SEO gratuit</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-6 h-full">
                    {/* Mockup résultats Google */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Search size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 h-8 bg-muted rounded-full px-4 flex items-center text-sm text-muted-foreground">
                          votre entreprise abidjan
                        </div>
                      </div>
                      
                      {[
                        { pos: "1", you: true },
                        { pos: "2", you: false },
                        { pos: "3", you: false },
                      ].map((result, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className={`p-3 rounded-lg mb-2 ${result.you ? 'bg-primary/10 border border-primary/30' : 'bg-background'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold ${result.you ? 'text-primary' : 'text-muted-foreground'}`}>
                              #{result.pos}
                            </span>
                            {result.you && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                Vous
                              </span>
                            )}
                          </div>
                          <div className="h-2 bg-muted rounded w-3/4 mb-1"></div>
                          <div className="h-2 bg-muted rounded w-1/2"></div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl"
                    >
                      <div className="text-sm">
                        <span className="text-muted-foreground">Position moyenne</span>
                        <div className="font-bold text-green-600">#1.2</div>
                      </div>
                      <TrendingUp className="text-green-500" size={24} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                Ces problèmes vous concernent ?
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
                Les bénéfices du SEO
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
                Nos services SEO
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
                Notre approche SEO
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
                Résultats clients
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
                Nos tarifs SEO
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
                    <span className="text-muted-foreground"> FCFA{plan.period}</span>
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
                    <Link to={`/demarrer-projet?service=seo&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>Choisir ce plan</Link>
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
              Audit SEO gratuit disponible ! <Link to="/audit-gratuit" className="text-primary hover:underline">Demander maintenant</Link>
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
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-blue-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à conquérir la première page ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de votre visibilité et créons ensemble une stratégie SEO gagnante.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/audit-gratuit">
                    Audit SEO gratuit
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demarrer-projet">Démarrer mon SEO</Link>
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

export default SEO;
