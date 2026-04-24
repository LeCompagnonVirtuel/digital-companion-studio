import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Megaphone, Palette, Users, Bot, Globe, ShoppingCart, Code, Smartphone,
  Search, Zap, FileSearch, ArrowRight, Check, Star, Rocket, Crown,
  Shield, Sparkles, CheckCircle, BadgePercent, Clock, Headphones
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { TiltCard } from "@/components/animations/TiltCard";
import { GlowingOrb } from "@/components/animations/GlowingOrb";
import { ParticleField } from "@/components/animations/ParticleField";
import { useRef } from "react";

const services = [
  {
    icon: Megaphone, title: "Marketing Digital", popular: true,
    description: "Stratégies marketing complètes pour attirer, convertir et fidéliser vos clients. SEO, publicités, email marketing.",
    features: ["Stratégie multicanale", "Publicités Google/Meta", "Email marketing", "Analytics"],
    link: "/services/marketing-digital", color: "from-orange-500/20 to-amber-500/20",
    iconBg: "bg-orange-500/10", iconColor: "text-orange-600",
  },
  {
    icon: Users, title: "Community Management", popular: false,
    description: "Animation et croissance de vos communautés sur tous les réseaux sociaux.",
    features: ["Calendrier éditorial", "Engagement quotidien", "Modération", "Reporting"],
    link: "/services/community-management", color: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-pink-500/10", iconColor: "text-pink-600",
  },
  {
    icon: Palette, title: "Création de Contenus", popular: false,
    description: "Visuels, vidéos et textes professionnels qui captent l'attention et convertissent.",
    features: ["Visuels réseaux sociaux", "Reels & TikTok", "Copywriting", "Photos produits"],
    link: "/services/creation-contenu", color: "from-purple-500/20 to-violet-500/20",
    iconBg: "bg-purple-500/10", iconColor: "text-purple-600",
  },
  {
    icon: Smartphone, title: "Branding & Identité", popular: false,
    description: "Création d'identités visuelles uniques et mémorables qui marquent les esprits.",
    features: ["Logo & charte graphique", "Guidelines", "Supports print", "Brand book"],
    link: "/services/design-branding", color: "from-fuchsia-500/20 to-pink-500/20",
    iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-600",
  },
  {
    icon: Zap, title: "Gadgets Numériques", popular: false,
    description: "Calculateurs, QR codes, formulaires intelligents et outils digitaux sur-mesure.",
    features: ["Calculateurs", "QR codes dynamiques", "Formulaires avancés", "Cartes digitales"],
    link: "/services/gadgets-numeriques", color: "from-cyan-500/20 to-blue-500/20",
    iconBg: "bg-cyan-500/10", iconColor: "text-cyan-600",
  },
  {
    icon: Globe, title: "Sites Internet Pro", popular: true,
    description: "Sites vitrines et landing pages professionnels, modernes et optimisés SEO.",
    features: ["Design sur-mesure", "Responsive", "SEO optimisé", "Performance"],
    link: "/services/developpement-web", color: "from-blue-500/20 to-indigo-500/20",
    iconBg: "bg-blue-500/10", iconColor: "text-blue-600",
  },
  {
    icon: ShoppingCart, title: "E-commerce", popular: true,
    description: "Boutiques en ligne complètes avec paiement Mobile Money et gestion des stocks.",
    features: ["Mobile Money intégré", "Gestion stocks", "Multi-devises", "Livraison"],
    link: "/services/ecommerce", color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-500/10", iconColor: "text-green-600",
  },
  {
    icon: Code, title: "Applications Web", popular: false,
    description: "Plateformes web complexes, SaaS, dashboards et outils métiers sur-mesure.",
    features: ["React / Next.js", "Backend robuste", "API & intégrations", "Scalabilité"],
    link: "/services/applications-mobiles", color: "from-indigo-500/20 to-purple-500/20",
    iconBg: "bg-indigo-500/10", iconColor: "text-indigo-600",
  },
  {
    icon: Bot, title: "Automatisation & IA", popular: false,
    description: "Optimisez vos processus avec l'intelligence artificielle et l'automatisation.",
    features: ["Chatbots IA", "Workflows automatisés", "Intégrations", "Agents IA"],
    link: "/services/automatisation-ia", color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10", iconColor: "text-violet-600",
  },
  {
    icon: FileSearch, title: "Audit Digital & Stratégie", popular: false,
    description: "Analyse complète de votre présence en ligne avec recommandations actionnables.",
    features: ["Audit complet", "Recommandations", "Plan d'action", "Accompagnement"],
    link: "/services/audit-digital", color: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10", iconColor: "text-amber-600",
  },
  {
    icon: Search, title: "SEO & Visibilité", popular: false,
    description: "Atteignez la première page de Google et générez du trafic qualifié gratuit.",
    features: ["Audit technique", "Optimisation on-page", "Netlinking", "SEO local"],
    link: "/services/seo", color: "from-teal-500/20 to-cyan-500/20",
    iconBg: "bg-teal-500/10", iconColor: "text-teal-600",
  },
];

const packages = [
  {
    name: "Lancement",
    price: "150 000",
    tagline: "Exister et être crédible",
    icon: Rocket,
    popular: false,
    vip: false,
    color: "border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    delivery: "5 jours",
    features: [
      "Site vitrine 3-4 pages",
      "Design professionnel",
      "Formulaire de contact",
      "SEO de base",
      "Hébergement 1 an inclus",
      "Responsive mobile",
    ],
  },
  {
    name: "Standard",
    price: "350 000",
    tagline: "Attirer et convertir",
    icon: Star,
    popular: true,
    vip: false,
    color: "border-primary/40",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    delivery: "10 jours",
    features: [
      "Site 5-7 pages",
      "Tout le pack Lancement",
      "SEO local avancé",
      "Blog intégré",
      "Google Analytics",
      "Stratégie marketing de base",
      "4 contenus/mois",
    ],
  },
  {
    name: "Premium",
    price: "600 000",
    tagline: "Performer et automatiser",
    icon: Sparkles,
    popular: false,
    vip: false,
    color: "border-accent/30",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    delivery: "12 jours",
    features: [
      "Site 7-10 pages",
      "Tout le pack Standard",
      "E-commerce ou réservation",
      "Chatbot IA intégré",
      "Automatisations",
      "3 mois maintenance",
      "Formation incluse",
    ],
  },
  {
    name: "Business",
    price: "900 000",
    tagline: "Dominer son marché",
    icon: Shield,
    popular: false,
    vip: false,
    color: "border-orange-500/30",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    delivery: "15 jours",
    features: [
      "Site 10-15 pages",
      "Tout le pack Premium",
      "SEO avancé complet",
      "Dashboard admin",
      "CRM intégré",
      "6 mois maintenance",
      "2 sessions de formation",
    ],
  },
  {
    name: "VIP",
    price: "1 200 000",
    tagline: "L'excellence digitale totale",
    icon: Crown,
    popular: false,
    vip: true,
    color: "border-gold/50",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    delivery: "15-20 jours",
    features: [
      "Site 15-20 pages",
      "Tout le pack Business",
      "E-commerce avancé",
      "Email marketing",
      "1 campagne Facebook Ads",
      "12 mois maintenance",
      "Account manager VIP",
      "Paiement en 3x",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useDocumentMeta({
    title: "Nos 11 Services Digitaux & 5 Packs",
    description: "Marketing digital, sites web, e-commerce, automatisation IA, branding, SEO et plus. 5 packs de 150K à 1.2M FCFA. Solutions complètes pour votre succès digital en Afrique.",
  });

  const firstHalf = services.slice(0, 6);
  const secondHalf = services.slice(6);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero with Parallax & Particles */}
        <section ref={heroRef} className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
          <GlowingOrb color="primary" size="500px" className="top-10 right-[10%] -z-10" duration={8} />
          <GlowingOrb color="accent" size="350px" className="bottom-10 left-[5%] -z-10" duration={12} />
          <ParticleField count={20} className="-z-10" />

          <motion.div className="container mx-auto px-4 text-center relative" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 border border-primary/15 text-sm font-medium mb-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                11 Services & 5 Packs
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
                Expertise complète pour{" "}
                <span className="gradient-text block sm:inline mt-2 sm:mt-0">votre succès digital</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                De la stratégie à l'exécution, nous couvrons tous les aspects de votre transformation digitale
                avec des tarifs adaptés au marché africain.
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button variant="hero" size="xl" asChild className="shadow-premium">
                  <Link to="/demarrer-projet" className="group">
                    Démarrer un projet <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="heroOutline" asChild>
                  <Link to="/audit-gratuit">Audit gratuit</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Clock, label: "Livraison 5-15 jours" },
                { icon: Headphones, label: "Support inclus" },
                { icon: Shield, label: "Satisfait ou remboursé" },
                { icon: BadgePercent, label: "Paiement en 3x" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm">
                  <item.icon size={16} className="text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ─── 5 PACKS SECTION ─── */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
          <ParticleField count={15} className="-z-10 opacity-50" />
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="badge-premium mb-4">
                <Crown size={14} className="mr-1" /> 5 Packs Adaptés
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5">
                Choisissez votre <span className="gradient-text">pack idéal</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Du lancement à l'excellence — un pack pour chaque étape de votre croissance digitale.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard tiltAmount={6} className="h-full">
                    <div className={`relative h-full p-6 rounded-2xl bg-card border-2 ${pkg.color} transition-all duration-500 hover:shadow-elevated ${pkg.vip ? "bg-gradient-to-b from-gold/5 to-card" : ""}`}>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                          Le + populaire
                        </div>
                      )}
                      {pkg.vip && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold to-gold-dark text-white text-xs font-bold shadow-lg">
                          VIP Exclusif
                        </div>
                      )}

                      <div className={`w-12 h-12 rounded-xl ${pkg.iconBg} flex items-center justify-center mb-4`}>
                        <pkg.icon size={24} className={pkg.iconColor} />
                      </div>

                      <h3 className="font-display font-bold text-xl mb-1">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{pkg.tagline}</p>

                      <div className="mb-1">
                        <span className="font-display font-bold text-3xl">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">FCFA</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
                        <Clock size={12} />
                        Livraison en {pkg.delivery}
                      </div>

                      <ul className="space-y-2.5 mb-6">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle size={15} className="text-accent shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={pkg.popular ? "hero" : pkg.vip ? "gold" : "heroOutline"}
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <Link to="/demarrer-projet">
                          Choisir ce pack <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Pack Guarantees */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: Shield, text: "Satisfait ou remboursé 30 jours" },
                { icon: Clock, text: "Livraison dans les délais garantie" },
                { icon: Headphones, text: "Support post-lancement inclus" },
              ].map((g) => (
                <div key={g.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <g.icon size={16} className="text-accent" />
                  <span>{g.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 11 SERVICES GRID ─── */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <GlowingOrb color="accent" size="400px" className="top-20 left-[5%] -z-10" />
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge-premium mb-4">
                <Sparkles size={14} className="mr-1" /> Nos Expertises
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5">
                11 services pour <span className="gradient-text">tout couvrir</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Chaque service est conçu pour maximiser votre impact digital sur le marché africain.
              </p>
            </motion.div>

            {/* First half */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              {firstHalf.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </motion.div>

            {/* Mini CTA Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
                <div className="text-center sm:text-left">
                  <h3 className="font-display font-bold text-xl mb-1">Pas sûr quel service choisir ?</h3>
                  <p className="text-muted-foreground text-sm">Recevez un audit gratuit et des recommandations personnalisées en 24h.</p>
                </div>
                <Button size="lg" asChild className="shrink-0">
                  <Link to="/audit-gratuit" className="group">
                    Audit gratuit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Second half */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {secondHalf.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── MAINTENANCE COSTS INFO ─── */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                  Maintenance & <span className="gradient-text">accompagnement</span>
                </h2>
                <p className="text-muted-foreground">Après la période de maintenance incluse, restez accompagné à petit prix.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { pack: "Lancement / Standard", price: "30 000" },
                  { pack: "Premium", price: "35 000" },
                  { pack: "Business", price: "45 000" },
                  { pack: "VIP", price: "60 000" },
                ].map((m) => (
                  <motion.div
                    key={m.pack}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-5 rounded-2xl bg-card border border-border text-center hover:border-primary/20 hover:shadow-card transition-all duration-300"
                  >
                    <div className="font-display font-bold text-xl mb-1">{m.price} <span className="text-sm font-normal text-muted-foreground">FCFA/mois</span></div>
                    <div className="text-sm text-muted-foreground">{m.pack}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <ParticleField count={12} className="-z-10 opacity-40" />
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border shadow-elevated"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Rocket size={32} className="text-primary" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Prêt à transformer votre business ?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                Discutons de votre projet et trouvons le pack parfait pour vos objectifs. Consultation gratuite, sans engagement.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="xl" asChild className="shadow-premium">
                  <Link to="/demarrer-projet" className="group">
                    Démarrer mon projet <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="heroOutline" asChild>
                  <a href="https://wa.me/2250504292778" target="_blank" rel="noopener noreferrer">
                    Discuter sur WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => (
  <motion.div variants={itemVariants} className="group relative">
    <TiltCard tiltAmount={5} className="h-full">
      <Link to={service.link} className="block h-full">
        <div className="h-full p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-elevated transition-all duration-500 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

          {service.popular && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
              <Star size={12} fill="currentColor" /> Populaire
            </div>
          )}

          <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <service.icon size={24} className={service.iconColor} />
          </div>

          <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

          <ul className="space-y-2 mb-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-accent shrink-0" /> {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            En savoir plus <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </TiltCard>
  </motion.div>
);

export default Services;
