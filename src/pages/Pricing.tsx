import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X as XIcon, ArrowRight, Sparkles, Star, Shield, Clock, Headphones, Crown, Zap, BadgePercent, Rocket, BarChart3, MessageSquare, Search, Palette } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useState } from "react";

const planIcons = [Zap, Star, Sparkles, Shield, Crown] as const;

const pricingPlans = [
  {
    name: "Lancement", tagline: "Exister et être crédible", price: "150 000", currency: "FCFA",
    description: "Idéal pour lancer votre présence digitale avec les bases essentielles.",
    features: ["Site vitrine 3-4 pages", "Design professionnel", "Formulaire de contact", "SEO de base", "Hébergement 1 an inclus", "Responsive mobile"],
    notIncluded: ["Stratégie marketing", "Création de contenu", "Automatisation"],
    popular: false, href: "/contact?pack=lancement", savings: null,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "from-blue-500 to-cyan-500",
  },
  {
    name: "Standard", tagline: "Attirer et convertir", price: "350 000", currency: "FCFA",
    description: "Pour les entreprises prêtes à accélérer leur acquisition de clients.",
    features: ["Site 5-7 pages", "Tout du pack Lancement", "SEO local avancé", "Blog intégré", "Google Analytics", "Stratégie marketing de base", "4 contenus/mois"],
    notIncluded: ["Automatisation IA", "Account manager dédié"],
    popular: true, href: "/contact?pack=standard", savings: null,
    gradient: "from-primary/30 to-primary/10",
    iconBg: "from-primary to-primary/80",
  },
  {
    name: "Premium", tagline: "Performer et automatiser", price: "600 000", currency: "FCFA",
    description: "Automatisation avancée et IA pour maximiser votre ROI.",
    features: ["Site 7-10 pages", "Tout du pack Standard", "E-commerce ou réservation", "Chatbot IA intégré", "Automatisations", "3 mois maintenance", "Formation incluse"],
    notIncluded: [],
    popular: false, href: "/contact?pack=premium", savings: null,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconBg: "from-purple-500 to-pink-500",
  },
  {
    name: "Business", tagline: "Dominer son marché", price: "900 000", currency: "FCFA",
    description: "Solution complète pour les entreprises ambitieuses qui veulent dominer leur secteur digital.",
    features: ["Site 10-15 pages", "Tout du pack Premium", "SEO avancé complet", "Dashboard admin", "CRM intégré", "6 mois maintenance", "2 sessions de formation"],
    notIncluded: [],
    popular: false, href: "/contact?pack=business", savings: null,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconBg: "from-orange-500 to-amber-500",
  },
  {
    name: "VIP", tagline: "L'excellence digitale totale", price: "1 200 000", currency: "FCFA",
    description: "Accompagnement premium 360° avec accès prioritaire et stratégie personnalisée à long terme.",
    features: ["Site 15-20 pages", "Tout du pack Business", "E-commerce avancé", "Email marketing", "1 campagne Facebook Ads", "12 mois maintenance", "Account manager VIP", "Paiement en 3x"],
    notIncluded: [],
    popular: false, href: "/contact?pack=vip", savings: "Pack Premium",
    gradient: "from-amber-400/30 to-yellow-500/20",
    iconBg: "from-amber-400 to-yellow-500",
  },
];

const guarantees = [
  { icon: Shield, title: "Satisfait ou remboursé", description: "30 jours pour tester, remboursement intégral si pas convaincu." },
  { icon: Clock, title: "Livraison dans les délais", description: "Respect des deadlines ou réduction sur la prochaine prestation." },
  { icon: Headphones, title: "Support inclus", description: "3 mois de support et maintenance inclus après chaque livraison." },
  { icon: BadgePercent, title: "Paiement flexible", description: "Paiement en 2x ou 3x sans frais. Mobile Money, carte et virement acceptés." },
];

const processSteps = [
  { icon: Search, title: "Audit gratuit", description: "Analyse complète de vos besoins et de votre présence digitale actuelle.", number: "01" },
  { icon: Palette, title: "Proposition sur-mesure", description: "Devis détaillé avec planning et livrables clairs adaptés à votre budget.", number: "02" },
  { icon: Rocket, title: "Développement", description: "Réalisation avec des points d'étape réguliers pour valider l'avancement.", number: "03" },
  { icon: BarChart3, title: "Livraison & suivi", description: "Mise en ligne, formation et support continu selon votre pack.", number: "04" },
];

const comparisonFeatures = [
  { name: "Pages du site", values: ["3-4", "5-7", "7-10", "10-15", "15-20"] },
  { name: "Design professionnel", values: [true, true, true, true, true] },
  { name: "SEO", values: ["Base", "Avancé", "Avancé", "Complet", "Complet"] },
  { name: "Blog intégré", values: [false, true, true, true, true] },
  { name: "Google Analytics", values: [false, true, true, true, true] },
  { name: "Stratégie marketing", values: [false, "Base", "Base", "Avancée", "Complète"] },
  { name: "E-commerce", values: [false, false, true, true, "Avancé"] },
  { name: "Chatbot IA", values: [false, false, true, true, true] },
  { name: "CRM intégré", values: [false, false, false, true, true] },
  { name: "Email marketing", values: [false, false, false, false, true] },
  { name: "Facebook Ads", values: [false, false, false, false, "1 campagne"] },
  { name: "Maintenance", values: ["—", "—", "3 mois", "6 mois", "12 mois"] },
  { name: "Formation", values: [false, false, "1 session", "2 sessions", "Illimité"] },
  { name: "Account manager", values: [false, false, false, false, "VIP dédié"] },
];

const faqs = [
  { question: "Comment se déroule un projet avec Le Compagnon Virtuel ?", answer: "Nous commençons par un audit gratuit pour comprendre vos besoins. Ensuite, nous vous proposons une solution sur-mesure avec un planning clair. Vous êtes impliqué à chaque étape avec des points réguliers." },
  { question: "Les tarifs sont-ils fixes ?", answer: "Les tarifs affichés sont des bases. Chaque projet étant unique, nous adaptons notre offre à vos besoins spécifiques. Demandez un devis personnalisé pour un chiffrage précis." },
  { question: "Proposez-vous des facilités de paiement ?", answer: "Oui, nous proposons un paiement en 2x ou 3x sans frais pour tous nos packs. Mobile Money (Orange, MTN, Wave), carte bancaire et virement sont acceptés." },
  { question: "Quelle est la durée d'engagement ?", answer: "Nos packs sont sans engagement longue durée. Les prestations mensuelles (community management, maintenance) sont reconduites tacitement avec préavis d'un mois." },
  { question: "Puis-je personnaliser un pack ?", answer: "Absolument ! Tous nos packs sont personnalisables. Contactez-nous pour construire une offre sur-mesure qui correspond exactement à vos besoins et votre budget." },
  { question: "Que se passe-t-il après la livraison ?", answer: "Selon votre pack, vous bénéficiez de 3 à 12 mois de maintenance et support. Nous assurons les mises à jour, corrections et vous accompagnons dans la prise en main." },
];

function HeroParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ComparisonValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-primary mx-auto" />;
  if (value === false) return <XIcon size={16} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm font-medium">{value}</span>;
}

const Pricing = () => {
  useDocumentMeta({
    title: "Tarifs — Packs digitaux à partir de 150 000 FCFA",
    description: "Découvrez nos packs Lancement, Standard, Premium, Business et VIP. Des tarifs clairs et adaptés au marché africain, sans surprise.",
  });

  const [activeTab, setActiveTab] = useState<"cards" | "table">("cards");

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero with particles */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <HeroParticles />
          <div className="container-wide text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} />
                Tarifs transparents
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Investissez dans votre{" "}
                <span className="gradient-text">succès digital</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Des packs conçus pour le marché africain. Tarifs clairs, résultats concrets, paiement flexible.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Satisfait ou remboursé</span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="flex items-center gap-2"><BadgePercent size={16} className="text-primary" /> Paiement en 3x</span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="flex items-center gap-2"><MessageSquare size={16} className="text-primary" /> Audit gratuit offert</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* View toggle */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border">
                <button
                  onClick={() => setActiveTab("cards")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "cards" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Vue cartes
                </button>
                <button
                  onClick={() => setActiveTab("table")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "table" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Comparatif
                </button>
              </div>
            </div>

            {/* Cards View */}
            {activeTab === "cards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {pricingPlans.map((plan, index) => {
                  const Icon = planIcons[index];
                  const isVIP = plan.name === "VIP";

                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -8 }}
                      className="group relative"
                    >
                      {/* Gradient border for popular and VIP */}
                      {(plan.popular || isVIP) && (
                        <div
                          className={`absolute -inset-[2px] rounded-[1.6rem] ${
                            isVIP
                              ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600"
                              : "bg-gradient-to-br from-primary via-primary/80 to-cyan-500"
                          } opacity-80 group-hover:opacity-100 transition-opacity`}
                        />
                      )}

                      <div
                        className={`relative h-full rounded-3xl p-7 flex flex-col transition-shadow duration-300 ${
                          plan.popular
                            ? "bg-foreground text-background shadow-elevated"
                            : isVIP
                            ? "bg-card shadow-elevated"
                            : "bg-card border border-border hover:shadow-elevated"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
                            <Star size={14} fill="currentColor" /> Le plus populaire
                          </div>
                        )}
                        {plan.savings && (
                          <div className="absolute -top-3 sm:-top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 text-xs font-bold shadow-lg">
                            <Crown size={14} /> {plan.savings}
                          </div>
                        )}

                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.iconBg} flex items-center justify-center mb-5 shadow-lg`}>
                          <Icon size={22} className="text-white" />
                        </div>

                        <div className="mb-5">
                          <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                          <p className={`text-sm ${plan.popular ? "text-background/60" : "text-muted-foreground"}`}>{plan.tagline}</p>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-baseline gap-1">
                            <span className={`text-3xl font-display font-bold ${isVIP ? "gradient-text-gold" : ""}`}>{plan.price}</span>
                            <span className={`text-sm font-medium ${plan.popular ? "text-background/80" : "text-foreground"}`}>FCFA</span>
                          </div>
                          <p className={`text-sm mt-2 ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>{plan.description}</p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-2.5 mb-4 flex-1">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? "bg-primary" : "bg-primary/10"}`}>
                                <Check size={12} className={plan.popular ? "text-primary-foreground" : "text-primary"} />
                              </div>
                              <span className={`text-sm ${plan.popular ? "text-background/85" : ""}`}>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Not included */}
                        {plan.notIncluded.length > 0 && (
                          <ul className="space-y-2 mb-6 pt-4 border-t border-border/30">
                            {plan.notIncluded.map((item) => (
                              <li key={item} className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-muted/50">
                                  <XIcon size={12} className={plan.popular ? "text-background/40" : "text-muted-foreground/50"} />
                                </div>
                                <span className={`text-sm line-through ${plan.popular ? "text-background/40" : "text-muted-foreground/50"}`}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <Button
                          variant={plan.popular ? "hero" : isVIP ? "hero" : "heroOutline"}
                          size="lg"
                          className={`w-full mt-auto ${isVIP ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 hover:from-amber-500 hover:to-yellow-600 border-0" : ""}`}
                          asChild
                        >
                          <Link to={plan.href} className="group/btn">
                            Choisir ce pack <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Comparison Table View */}
            {activeTab === "table" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto overflow-x-auto"
              >
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-4 font-display font-semibold text-muted-foreground sticky left-0 bg-background z-10 min-w-[180px]">Fonctionnalité</th>
                      {pricingPlans.map((plan, i) => {
                        const Icon = planIcons[i];
                        return (
                          <th key={plan.name} className={`p-4 text-center min-w-[130px] ${plan.popular ? "bg-primary/5 rounded-t-2xl" : ""}`}>
                            <div className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${plan.iconBg} items-center justify-center mb-2`}>
                              <Icon size={18} className="text-white" />
                            </div>
                            <div className="font-display font-bold">{plan.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{plan.price} FCFA</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, i) => (
                      <tr key={feature.name} className={`border-t border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                        <td className="p-4 font-medium sticky left-0 bg-inherit z-10">{feature.name}</td>
                        {feature.values.map((value, j) => (
                          <td key={j} className={`p-4 text-center ${pricingPlans[j].popular ? "bg-primary/5" : ""}`}>
                            <ComparisonValue value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border">
                      <td className="p-4 sticky left-0 bg-background z-10" />
                      {pricingPlans.map((plan) => (
                        <td key={plan.name} className={`p-4 text-center ${plan.popular ? "bg-primary/5 rounded-b-2xl" : ""}`}>
                          <Button
                            variant={plan.popular ? "hero" : "heroOutline"}
                            size="sm"
                            className={`${plan.name === "VIP" ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 hover:from-amber-500 hover:to-yellow-600 border-0" : ""}`}
                            asChild
                          >
                            <Link to={plan.href}>Choisir</Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Besoin d'une solution sur-mesure ?</p>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact" className="group">
                  <Sparkles size={18} className="mr-2" /> Demander un devis personnalisé <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-subtle)" }} />
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Rocket size={14} /> Notre processus
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                De l'idée à la <span className="gradient-text">réalité</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Un processus clair et transparent, du premier contact à la livraison.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto relative z-10 border border-primary/20">
                      <step.icon size={28} className="text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees with glass effect */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Shield size={14} /> Nos engagements
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Des <span className="gradient-text">garanties</span> solides
              </h2>
              <p className="text-muted-foreground">Nous nous engageons pour votre satisfaction à chaque étape.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {guarantees.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-6 rounded-2xl glass border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <g.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">{g.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
          <div className="container-narrow">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <MessageSquare size={14} /> FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Questions Fréquentes</h2>
              <p className="text-muted-foreground">Tout ce que vous devez savoir sur nos tarifs et notre fonctionnement.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-2xl px-6 bg-card">
                    <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
