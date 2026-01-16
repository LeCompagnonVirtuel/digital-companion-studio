import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  ClipboardCheck, 
  Target, 
  Lightbulb, 
  BarChart3, 
  FileSearch, 
  ArrowRight, 
  Check, 
  Clock,
  FileText,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FileSearch,
    title: "Audit Site Web",
    description: "Analyse complète de votre site : performance, UX, contenu et technique.",
    features: ["Vitesse chargement", "Expérience utilisateur", "Qualité contenu", "Architecture technique"],
  },
  {
    icon: Search,
    title: "Audit SEO",
    description: "Évaluation de votre visibilité sur les moteurs de recherche.",
    features: ["Mots-clés", "Backlinks", "Contenu SEO", "Concurrence"],
  },
  {
    icon: BarChart3,
    title: "Audit Réseaux Sociaux",
    description: "Analyse de votre présence et performance sur les réseaux sociaux.",
    features: ["Profils sociaux", "Engagement", "Croissance", "Benchmark"],
  },
  {
    icon: Target,
    title: "Audit Stratégique",
    description: "Évaluation globale de votre stratégie digitale et positionnement.",
    features: ["Positionnement", "Cibles", "Canaux", "Objectifs"],
  },
  {
    icon: ClipboardCheck,
    title: "Audit Conversion",
    description: "Analyse du parcours client et identification des freins à la conversion.",
    features: ["Tunnel de vente", "Points de friction", "CTA", "A/B testing"],
  },
  {
    icon: Lightbulb,
    title: "Recommandations",
    description: "Plan d'action concret et priorisé pour améliorer vos performances.",
    features: ["Actions prioritaires", "Planning", "Budget estimé", "ROI attendu"],
  },
];

const auditTypes = [
  { type: "Audit Express", duration: "3 jours", scope: "1 canal" },
  { type: "Audit Standard", duration: "1 semaine", scope: "Multi-canal" },
  { type: "Audit Complet", duration: "2 semaines", scope: "360° digital" },
];

const problems = [
  "Vous ne savez pas ce qui ne fonctionne pas dans votre stratégie",
  "Votre site génère du trafic mais pas de conversions",
  "Vous investissez sans mesurer le retour",
  "Vos concurrents vous dépassent en ligne",
  "Vous ne savez pas par où commencer",
  "Votre budget marketing semble gaspillé",
];

const benefits = [
  {
    title: "Vision claire",
    description: "Comprenez exactement où vous en êtes",
  },
  {
    title: "Priorités définies",
    description: "Savez quoi faire en premier",
  },
  {
    title: "Budget optimisé",
    description: "Investissez au bon endroit",
  },
  {
    title: "Résultats mesurables",
    description: "Des KPIs pour suivre vos progrès",
  },
];

const process = [
  { 
    step: "01", 
    title: "Collecte", 
    description: "Récupération des accès, données et informations sur votre activité",
    duration: "1 jour"
  },
  { 
    step: "02", 
    title: "Analyse", 
    description: "Audit approfondi de tous les éléments définis dans le scope",
    duration: "2-7 jours"
  },
  { 
    step: "03", 
    title: "Synthèse", 
    description: "Compilation des résultats et élaboration des recommandations",
    duration: "1-2 jours"
  },
  { 
    step: "04", 
    title: "Restitution", 
    description: "Présentation du rapport et discussion du plan d'action",
    duration: "1-2h"
  },
];

const deliverables = [
  "Rapport d'audit complet (PDF 30-50 pages)",
  "Scorecard digitale avec notes par domaine",
  "Liste des problèmes identifiés par priorité",
  "Recommandations actionnables",
  "Plan d'action priorisé sur 90 jours",
  "Estimation budgétaire par action",
  "Présentation de restitution",
  "Session Q&A de 1h incluse",
];

const pricing = [
  {
    name: "Express",
    price: "75 000",
    period: " FCFA",
    description: "Audit rapide d'un seul canal",
    features: [
      "1 canal au choix (site, SEO ou réseaux)",
      "Analyse en 3 jours",
      "Rapport synthétique (10-15 pages)",
      "5 recommandations clés",
      "Appel de restitution 30min",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "175 000",
    period: " FCFA",
    description: "Audit multi-canal approfondi",
    features: [
      "Site web + SEO + Réseaux sociaux",
      "Analyse concurrentielle incluse",
      "Rapport détaillé (30-40 pages)",
      "15+ recommandations priorisées",
      "Plan d'action 90 jours",
      "Appel de restitution 1h",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "350 000",
    period: " FCFA",
    description: "Audit 360° + stratégie complète",
    features: [
      "Tous canaux digitaux",
      "Audit technique approfondi",
      "Analyse concurrence détaillée",
      "Étude de marché digital",
      "Rapport complet (50+ pages)",
      "Feuille de route stratégique 1 an",
      "2 sessions de restitution",
      "Support post-audit 1 mois",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "PME Industrielle",
    description: "Audit complet qui a révélé un site non-indexé - correction = +300% trafic",
    result: "+300% trafic",
  },
  {
    title: "E-commerce",
    description: "Identification d'un tunnel de conversion défaillant - optimisation = +85% ventes",
    result: "+85% ventes",
  },
  {
    title: "Startup",
    description: "Audit stratégique qui a réorienté le positionnement et doublé les leads",
    result: "x2 leads",
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

const AuditDigital = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl -z-10"
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
                  Audit Digital & Stratégie
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Découvrez ce qui{" "}
                  <span className="text-primary">freine</span>{" "}
                  votre croissance digitale
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Audit complet de votre présence en ligne avec des recommandations concrètes. 
                  Identifiez les problèmes, priorisez les actions, maximisez votre ROI.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/audit-gratuit">
                      Demander un audit
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">En savoir plus</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  {auditTypes.map((at) => (
                    <div key={at.type} className="flex flex-col px-4 py-2 rounded-xl bg-muted text-center">
                      <span className="font-medium text-sm">{at.type}</span>
                      <span className="text-xs text-muted-foreground">{at.duration}</span>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-6 h-full">
                    <div className="space-y-4">
                      <div className="text-lg font-semibold mb-4">Score Digital</div>
                      
                      {[
                        { label: "Site Web", score: 45, status: "warning" },
                        { label: "SEO", score: 32, status: "error" },
                        { label: "Réseaux sociaux", score: 68, status: "ok" },
                        { label: "Conversion", score: 28, status: "error" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            item.status === 'error' ? 'bg-destructive/10' : 
                            item.status === 'warning' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                          }`}>
                            {item.status === 'error' ? (
                              <AlertTriangle size={16} className="text-destructive" />
                            ) : item.status === 'warning' ? (
                              <AlertTriangle size={16} className="text-yellow-500" />
                            ) : (
                              <CheckCircle size={16} className="text-green-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.label}</span>
                              <span className="font-semibold">{item.score}/100</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${
                                  item.status === 'error' ? 'bg-destructive' : 
                                  item.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
                    <span className="text-destructive text-sm">?</span>
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
                Ce que l'audit vous apportera
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
                Ce que nous analysons
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
                Notre méthodologie
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
                Résultats post-audit
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
                    <Link to={`/demarrer-projet?service=audit-digital&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>Choisir ce plan</Link>
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
              Audit gratuit disponible pour les nouveaux clients ! <Link to="/audit-gratuit" className="text-primary hover:underline">Demander maintenant</Link>
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
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-orange-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à découvrir votre potentiel digital ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Demandez votre audit et obtenez une vision claire de vos forces et axes d'amélioration.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/audit-gratuit">
                    Demander un audit gratuit
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Discuter de mes besoins</Link>
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

export default AuditDigital;
