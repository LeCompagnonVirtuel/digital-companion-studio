import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Clock,
  FileText,
  Mail,
  MapPin,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Share2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Calendar,
    title: "Stratégie Éditoriale",
    description: "Planification et création de contenu aligné sur vos objectifs business.",
    features: ["Calendrier éditorial", "Ligne éditoriale", "Thématiques clés", "Planning publications"],
  },
  {
    icon: Heart,
    title: "Animation Communauté",
    description: "Engagement actif avec votre audience pour créer une communauté fidèle.",
    features: ["Réponses commentaires", "Messages privés", "Engagement proactif", "Gestion crises"],
  },
  {
    icon: Share2,
    title: "Création de Contenu",
    description: "Visuels et textes captivants adaptés à chaque plateforme.",
    features: ["Posts visuels", "Stories", "Reels/TikTok", "Carrousels"],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Suivi des performances et optimisation continue de votre stratégie.",
    features: ["KPIs clés", "Rapports mensuels", "Analyse concurrence", "Recommandations"],
  },
  {
    icon: Users,
    title: "Croissance Organique",
    description: "Stratégies pour augmenter naturellement votre audience.",
    features: ["Hashtags optimisés", "Collaborations", "Tendances", "Viralité"],
  },
  {
    icon: MessageCircle,
    title: "Modération",
    description: "Gestion des commentaires et protection de votre image de marque.",
    features: ["Filtrage spam", "Gestion négativité", "FAQ automatisée", "Veille réputation"],
  },
];

const platforms = [
  { name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { name: "TikTok", icon: Share2, color: "text-foreground" },
];

const problems = [
  "Vous n'avez pas le temps de gérer vos réseaux sociaux",
  "Votre engagement est faible malgré vos efforts",
  "Vous ne savez pas quoi publier ni quand",
  "Vous perdez des opportunités de vente via les réseaux",
  "Votre image de marque n'est pas cohérente",
  "Vous ne répondez pas assez vite aux messages",
];

const benefits = [
  {
    title: "Présence constante",
    description: "Publications régulières qui maintiennent l'engagement",
  },
  {
    title: "Communauté engagée",
    description: "Des followers qui interagissent et deviennent clients",
  },
  {
    title: "Image professionnelle",
    description: "Une marque cohérente et mémorable",
  },
  {
    title: "Gain de temps",
    description: "Concentrez-vous sur votre cœur de métier",
  },
];

const process = [
  { 
    step: "01", 
    title: "Audit & Brief", 
    description: "Analyse de votre présence actuelle et définition de vos objectifs",
    duration: "2-3 jours"
  },
  { 
    step: "02", 
    title: "Stratégie", 
    description: "Création du calendrier éditorial et de la ligne graphique",
    duration: "3-5 jours"
  },
  { 
    step: "03", 
    title: "Production", 
    description: "Création des contenus et programmation des publications",
    duration: "Continu"
  },
  { 
    step: "04", 
    title: "Animation", 
    description: "Gestion quotidienne, engagement et modération",
    duration: "Quotidien"
  },
];

const deliverables = [
  "Calendrier éditorial mensuel",
  "12-30 publications/mois selon le pack",
  "Visuels et textes optimisés",
  "Stories et contenus éphémères",
  "Rapport de performance mensuel",
  "Veille concurrentielle",
  "Gestion des messages et commentaires",
  "Recommandations stratégiques",
];

const pricing = [
  {
    name: "Starter",
    price: "100 000",
    period: " FCFA/mois",
    description: "Pour maintenir une présence de base",
    features: [
      "1 réseau social géré",
      "8 publications/mois",
      "Création visuels basiques",
      "Réponses commentaires (J+1)",
      "Rapport mensuel simplifié",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "200 000",
    period: " FCFA/mois",
    description: "Pour une présence active et engageante",
    features: [
      "2 réseaux sociaux gérés",
      "16 publications/mois",
      "Visuels professionnels",
      "Stories hebdomadaires",
      "Réponses commentaires/DM (même jour)",
      "Rapport mensuel détaillé",
      "1 session stratégie/mois",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "400 000",
    period: " FCFA/mois",
    description: "Pour dominer vos réseaux sociaux",
    features: [
      "Tous réseaux sociaux gérés",
      "30+ publications/mois",
      "Visuels premium + Reels/TikTok",
      "Stories quotidiennes",
      "Réponses en temps réel",
      "Gestion de crise",
      "Collaborations influenceurs",
      "Consulting stratégique illimité",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Restaurant Abidjan",
    description: "Gestion Instagram qui a augmenté les réservations de 60% en 3 mois",
    result: "+60% réservations",
  },
  {
    title: "Boutique Mode",
    description: "Stratégie multi-plateforme qui a doublé les ventes via réseaux sociaux",
    result: "x2 ventes sociales",
  },
  {
    title: "Coach Business",
    description: "Personal branding LinkedIn qui a généré 50+ leads qualifiés/mois",
    result: "50+ leads/mois",
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

const CommunityManagement = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl -z-10"
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
                  <Users size={16} />
                  Community Management
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Animez vos{" "}
                  <span className="text-primary">réseaux sociaux</span>{" "}
                  avec impact
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Créez une communauté engagée qui devient vos meilleurs ambassadeurs. 
                  Nous gérons vos réseaux pour vous pendant que vous développez votre business.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Développer ma communauté
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Plateformes gérées :</span>
                  <div className="flex items-center gap-3">
                    {platforms.map((platform) => (
                      <div key={platform.name} className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
                        <platform.icon size={16} className={platform.color} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex flex-col items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 rounded-xl bg-muted/50 text-center"
                      >
                        <div className="text-2xl font-bold text-primary">+340%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 rounded-xl bg-muted/50 text-center"
                      >
                        <div className="text-2xl font-bold text-primary">15K</div>
                        <div className="text-xs text-muted-foreground">Followers gagnés</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-4 rounded-xl bg-muted/50 text-center"
                      >
                        <div className="text-2xl font-bold text-primary">98%</div>
                        <div className="text-xs text-muted-foreground">Taux réponse</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-4 rounded-xl bg-muted/50 text-center"
                      >
                        <div className="text-2xl font-bold text-primary">x3</div>
                        <div className="text-xs text-muted-foreground">Conversions</div>
                      </motion.div>
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
                Ces défis vous parlent ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                La gestion des réseaux sociaux est chronophage. Nous prenons le relais.
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
                Nos services Community Management
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
                    <Link to={`/demarrer-projet?service=community-management&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>Choisir ce plan</Link>
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
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-pink-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à développer votre communauté ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de votre stratégie réseaux sociaux et créons ensemble une communauté engagée.
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

export default CommunityManagement;
