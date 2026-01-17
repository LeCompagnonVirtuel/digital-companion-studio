import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Mail, 
  Search, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Clock,
  FileText,
  Phone,
  MessageCircle,
  MapPin,
  Zap,
  PenTool,
  Users,
  Sparkles
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Génération de Leads",
    description: "Stratégies d'acquisition de prospects qualifiés via tous les canaux digitaux.",
    features: ["Lead magnets", "Landing pages", "Publicités ciblées", "Qualification automatique"],
  },
  {
    icon: Search,
    title: "SEO & Référencement",
    description: "Optimisation pour les moteurs de recherche et stratégies de visibilité long terme.",
    features: ["Audit technique", "Optimisation on-page", "Netlinking", "Suivi positions"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Campagnes email performantes, séquences automatisées et newsletters engageantes.",
    features: ["Séquences nurturing", "Newsletters", "A/B testing", "Segmentation"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textes persuasifs qui convertissent : pages de vente, emails, publicités.",
    features: ["Pages de vente", "Scripts vidéo", "Publicités", "Storytelling"],
  },
  {
    icon: BarChart3,
    title: "Publicité Digitale",
    description: "Campagnes publicitaires optimisées sur Google, Meta, LinkedIn et TikTok.",
    features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Retargeting"],
  },
  {
    icon: Users,
    title: "Stratégie Marketing",
    description: "Plans marketing complets adaptés à vos objectifs et votre marché.",
    features: ["Analyse marché", "Positionnement", "Plan d'action", "KPIs"],
  },
];

const problems = [
  "Vous n'arrivez pas à attirer de nouveaux clients en ligne",
  "Votre site web génère peu ou pas de trafic",
  "Vos publicités ne donnent pas de résultats",
  "Vous ne savez pas comment communiquer efficacement",
  "Vos concurrents sont plus visibles que vous",
  "Votre budget marketing est gaspillé sans retour",
];

const benefits = [
  {
    title: "Visibilité accrue",
    description: "Soyez trouvé par vos clients potentiels au bon moment",
  },
  {
    title: "Leads qualifiés",
    description: "Attirez des prospects vraiment intéressés par vos services",
  },
  {
    title: "ROI mesurable",
    description: "Chaque franc investi est tracké et optimisé",
  },
  {
    title: "Croissance durable",
    description: "Construisez une présence en ligne qui génère des résultats long terme",
  },
];

const process = [
  { 
    step: "01", 
    title: "Audit & Analyse", 
    description: "Analyse complète de votre présence digitale actuelle, de votre marché et de vos concurrents",
    duration: "2-3 jours"
  },
  { 
    step: "02", 
    title: "Stratégie", 
    description: "Élaboration d'un plan d'action personnalisé avec objectifs SMART et KPIs",
    duration: "3-5 jours"
  },
  { 
    step: "03", 
    title: "Exécution", 
    description: "Mise en œuvre des actions marketing : campagnes, contenus, optimisations",
    duration: "Continu"
  },
  { 
    step: "04", 
    title: "Optimisation", 
    description: "Analyse des résultats, tests A/B et amélioration continue des performances",
    duration: "Mensuel"
  },
];

const deliverables = [
  "Audit marketing complet (rapport PDF détaillé)",
  "Stratégie marketing documentée",
  "Calendrier éditorial mensuel",
  "Campagnes publicitaires configurées",
  "Rapports de performance hebdomadaires",
  "Recommandations d'optimisation",
  "Accès aux tableaux de bord analytics",
  "Sessions de consulting stratégique",
];

const pricing = [
  {
    name: "Starter",
    price: "150 000",
    period: " FCFA/mois",
    description: "Pour démarrer votre présence digitale",
    features: [
      "Audit initial de votre présence en ligne",
      "1 canal marketing (SEO ou Réseaux sociaux)",
      "4 publications/mois",
      "Rapport mensuel simplifié",
      "1 session consulting/mois (30min)",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "350 000",
    period: " FCFA/mois",
    description: "Pour une croissance accélérée",
    features: [
      "Audit complet multi-canal",
      "3 canaux marketing intégrés",
      "12 publications/mois",
      "Gestion campagnes publicitaires",
      "Rapports hebdomadaires détaillés",
      "2 sessions consulting/mois (1h)",
      "Optimisation continue",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "650 000",
    period: " FCFA/mois",
    description: "Pour dominer votre marché",
    features: [
      "Stratégie marketing 360° complète",
      "Tous canaux marketing",
      "25+ publications/mois",
      "Gestion publicitaire avancée (budget illimité)",
      "Email marketing & automation",
      "Rapports en temps réel",
      "Consulting illimité",
      "Équipe dédiée",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Startup Tech",
    description: "Lancement d'une campagne de génération de leads qui a généré 200+ prospects qualifiés en 2 mois",
    result: "+340% de trafic",
  },
  {
    title: "E-commerce Mode",
    description: "Optimisation SEO et publicités Meta qui ont triplé les ventes en ligne",
    result: "x3 ventes en 3 mois",
  },
  {
    title: "Cabinet Conseil",
    description: "Stratégie LinkedIn et contenu expert qui a positionné le cabinet comme leader",
    result: "+45% nouveaux clients",
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

const MarketingDigital = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Premium */}
        <section className="pt-32 pb-24 relative overflow-hidden">
          {/* Background premium */}
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
          
          {/* Animated orbs */}
          <motion.div 
            className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-[5%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl -z-10"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.span 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Megaphone size={16} />
                  Marketing Digital Premium
                </motion.span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1]">
                  Accélérez votre{" "}
                  <span className="gradient-text">croissance</span>{" "}
                  digitale
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Stratégies marketing sur-mesure pour attirer, convertir et fidéliser vos clients idéaux. 
                  Du SEO aux publicités, nous maximisons votre ROI avec des résultats mesurables.
                </p>
                
                {/* Stats rapides */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { value: "+340%", label: "Trafic moyen" },
                    { value: "x3", label: "Conversions" },
                    { value: "95%", label: "Clients satisfaits" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" className="shadow-premium" asChild>
                    <Link to="/demarrer-projet">
                      Booster ma visibilité
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="backdrop-blur-sm" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 rounded-3xl blur-3xl" />
                  
                  {/* Card with analytics mockup */}
                  <div className="relative bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center justify-center shadow-premium">
                    <motion.div 
                      className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-glow"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <TrendingUp size={40} className="text-primary-foreground" />
                    </motion.div>
                    
                    {/* Growth chart */}
                    <div className="w-full h-32 relative px-4">
                      <svg viewBox="0 0 200 70" className="w-full h-full">
                        {/* Grid lines */}
                        <motion.line x1="0" y1="60" x2="200" y2="60" stroke="hsl(var(--border))" strokeWidth="1" />
                        <motion.line x1="0" y1="40" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4" />
                        <motion.line x1="0" y1="20" x2="200" y2="20" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4" />
                        
                        {/* Area fill */}
                        <motion.path
                          d="M 0 60 L 0 55 Q 30 50 60 45 T 100 30 T 150 20 T 200 5 L 200 60 Z"
                          fill="url(#areaGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                        
                        {/* Main line */}
                        <motion.path
                          d="M 0 55 Q 30 50 60 45 T 100 30 T 150 20 T 200 5"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        
                        {/* Data points */}
                        {[{ x: 0, y: 55 }, { x: 60, y: 45 }, { x: 100, y: 30 }, { x: 150, y: 20 }, { x: 200, y: 5 }].map((point, i) => (
                          <motion.circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="hsl(var(--primary))"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.2 }}
                          />
                        ))}
                        
                        <defs>
                          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    
                    {/* Metrics badges */}
                    <motion.div 
                      className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-medium flex items-center gap-1"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <TrendingUp size={12} />
                      +127% ce mois
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ROI positif garanti
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
                Vous vous reconnaissez ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ces défis sont courants, mais nous avons les solutions pour les surmonter.
              </p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des résultats concrets et mesurables pour votre entreprise.
              </p>
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
                Nos expertises marketing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une approche 360° pour maximiser votre présence en ligne.
              </p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une approche structurée pour des résultats mesurables.
              </p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des livrables concrets et actionnables.
              </p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.
              </p>
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
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des forfaits adaptés à votre budget et vos objectifs.
              </p>
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
                    <Link to={`/demarrer-projet?service=marketing-digital&plan=${i === 0 ? "starter" : i === 1 ? "croissance" : "premium"}`}>Choisir ce plan</Link>
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
              Besoin d'un devis personnalisé ? <Link to="/contact" className="text-primary hover:underline">Contactez-nous</Link>
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
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à booster votre marketing ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de vos objectifs et créons ensemble une stratégie qui vous démarque.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Démarrer mon projet
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

export default MarketingDigital;
