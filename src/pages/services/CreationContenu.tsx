import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Camera, 
  Video, 
  PenTool, 
  Image, 
  FileText, 
  ArrowRight, 
  Check, 
  Clock,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
  TrendingUp,
  Play,
  Mic,
  Phone
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Image,
    title: "Visuels Réseaux Sociaux",
    description: "Posts, stories, carrousels et bannières optimisés pour chaque plateforme.",
    features: ["Posts Instagram/Facebook", "Stories animées", "Carrousels", "Bannières LinkedIn"],
  },
  {
    icon: Video,
    title: "Vidéos & Reels",
    description: "Contenus vidéo courts et impactants qui captent l'attention.",
    features: ["Reels/TikTok", "Vidéos promo", "Animations", "Montage professionnel"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textes persuasifs qui convertissent et engagent votre audience.",
    features: ["Légendes posts", "Articles blog", "Scripts vidéo", "Newsletters"],
  },
  {
    icon: Camera,
    title: "Photographie",
    description: "Séances photo professionnelles pour vos produits et équipes.",
    features: ["Photos produits", "Portraits corporate", "Événements", "Retouches pro"],
  },
  {
    icon: Mic,
    title: "Contenu Audio",
    description: "Podcasts, voix off et contenus audio de qualité.",
    features: ["Podcasts", "Voix off", "Jingles", "Audio branding"],
  },
  {
    icon: FileText,
    title: "Documents Marketing",
    description: "Présentations, brochures et supports commerciaux professionnels.",
    features: ["Présentations", "Brochures", "Catalogues", "Infographies"],
  },
];

const contentTypes = [
  { type: "Visuels statiques", examples: "Posts, bannières, affiches" },
  { type: "Contenus animés", examples: "Stories, GIFs, animations" },
  { type: "Vidéos courtes", examples: "Reels, TikTok, Shorts" },
  { type: "Vidéos longues", examples: "Tutoriels, interviews, promos" },
  { type: "Textes", examples: "Articles, newsletters, scripts" },
  { type: "Audio", examples: "Podcasts, voix off, jingles" },
];

const problems = [
  "Vous manquez de visuels professionnels pour vos réseaux",
  "Votre contenu n'attire pas l'attention de votre audience",
  "Vous n'avez pas les compétences ou outils pour créer du contenu",
  "Votre image de marque manque de cohérence visuelle",
  "Vous n'avez pas le temps de produire du contenu régulièrement",
  "Vos vidéos ne sont pas assez engageantes",
];

const benefits = [
  {
    title: "Contenu professionnel",
    description: "Des créations de qualité studio sans les coûts",
  },
  {
    title: "Cohérence visuelle",
    description: "Une identité de marque forte et reconnaissable",
  },
  {
    title: "Engagement accru",
    description: "Des contenus qui génèrent likes, partages et commentaires",
  },
  {
    title: "Gain de temps",
    description: "Concentrez-vous sur votre métier, on gère la création",
  },
];

const process = [
  { 
    step: "01", 
    title: "Brief Créatif", 
    description: "Compréhension de vos besoins, objectifs et identité de marque",
    duration: "1-2 jours"
  },
  { 
    step: "02", 
    title: "Conception", 
    description: "Création des maquettes et propositions créatives",
    duration: "2-5 jours"
  },
  { 
    step: "03", 
    title: "Production", 
    description: "Réalisation des contenus avec retouches et optimisations",
    duration: "3-7 jours"
  },
  { 
    step: "04", 
    title: "Livraison", 
    description: "Livraison des fichiers dans tous les formats nécessaires",
    duration: "1 jour"
  },
];

const deliverables = [
  "Fichiers sources éditables (si applicable)",
  "Exports optimisés pour chaque plateforme",
  "Variations de formats (story, feed, etc.)",
  "Guide d'utilisation des contenus",
  "Banque d'assets réutilisables",
  "Révisions incluses selon le pack",
  "Stockage cloud partagé",
  "Support pour les modifications mineures",
];

const pricing = [
  {
    name: "Lancement",
    price: "75 000",
    period: " FCFA/mois",
    description: "Pour un flux de contenu basique",
    features: [
      "8 visuels statiques/mois",
      "2 stories animées/mois",
      "Légendes rédigées",
      "2 révisions par contenu",
      "Livraison 5 jours ouvrés",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "175 000",
    period: " FCFA/mois",
    description: "Pour une présence visuelle forte",
    features: [
      "16 visuels statiques/mois",
      "8 stories animées/mois",
      "4 Reels/mois",
      "Copywriting complet",
      "3 révisions par contenu",
      "Livraison 3 jours ouvrés",
      "Calendrier de contenu",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "350 000",
    period: " FCFA/mois",
    description: "Pour dominer avec du contenu premium",
    features: [
      "30+ visuels/mois",
      "Stories quotidiennes",
      "8+ Reels/TikTok/mois",
      "Vidéos longues (jusqu'à 3min)",
      "Copywriting illimité",
      "Révisions illimitées",
      "Livraison 24-48h",
      "Directeur artistique dédié",
    ],
    popular: false,
  },
];

const useCases = [
  {
    title: "Marque Cosmétique",
    description: "Création de contenu lifestyle qui a augmenté l'engagement de 250%",
    result: "+250% engagement",
  },
  {
    title: "Restaurant Lounge",
    description: "Photos et vidéos food qui ont boosté les réservations",
    result: "+80% réservations",
  },
  {
    title: "Startup Tech",
    description: "Contenus explicatifs qui ont simplifié un produit complexe",
    result: "+45% conversions",
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

const CreationContenu = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/4 right-[15%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl -z-10"
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
                  <Palette size={16} />
                  Création de Contenus
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Des contenus qui{" "}
                  <span className="text-primary">captent</span>{" "}
                  l'attention
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Visuels, vidéos et textes professionnels qui font briller votre marque. 
                  Contenus optimisés pour engager votre audience et convertir.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Créer mon contenu
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Voir nos créations</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {contentTypes.slice(0, 4).map((ct) => (
                    <span key={ct.type} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium">
                      {ct.type}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-6 h-full">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center"
                      >
                        <Image size={40} className="text-primary" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
                      >
                        <Video size={40} className="text-primary" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center"
                      >
                        <PenTool size={40} className="text-primary" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center relative"
                      >
                        <Play size={40} className="text-primary" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Types de contenu */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              {contentTypes.map((ct, i) => (
                <motion.div
                  key={ct.type}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center"
                >
                  <div className="text-sm font-semibold mb-1">{ct.type}</div>
                  <div className="text-xs text-muted-foreground">{ct.examples}</div>
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
                Ces défis vous parlent ?
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
                Nos services de création
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
                Notre processus créatif
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
                    <Link to={`/demarrer-projet?service=creation-contenu&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>Choisir ce plan</Link>
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
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-purple-500/10 border border-border"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Prêt à créer du contenu qui marque les esprits ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discutons de vos besoins en contenu et créons ensemble des visuels qui convertissent.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link to="/demarrer-projet">
                    Démarrer mon projet
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Voir nos créations</Link>
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
                  href="tel:+2250504292778"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} />
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

export default CreationContenu;
