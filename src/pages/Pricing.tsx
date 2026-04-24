import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Star, Shield, Clock, Headphones, BadgePercent, Crown } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const pricingPlans = [
  {
    name: "Starter", tagline: "Exister et être crédible", price: "149 900", currency: "FCFA",
    description: "Idéal pour lancer votre présence digitale avec les bases essentielles.",
    features: ["Site vitrine responsive (5 pages)", "Design moderne personnalisé", "Optimisation SEO de base", "Formulaire de contact", "Hébergement 1 an inclus", "Support par email"],
    notIncluded: ["Stratégie marketing", "Création de contenu", "Automatisation"],
    popular: false, href: "/contact?pack=starter", savings: null,
  },
  {
    name: "Croissance", tagline: "Attirer et convertir", price: "349 900", currency: "FCFA",
    description: "Pour les entreprises prêtes à accélérer leur acquisition de clients.",
    features: ["Tout du pack Starter", "Stratégie marketing digital", "Création de contenu (4/mois)", "Gestion réseaux sociaux", "Landing pages optimisées", "Analytics & reporting mensuel", "Support prioritaire"],
    notIncluded: ["Automatisation IA", "Account manager dédié"],
    popular: true, href: "/contact?pack=croissance", savings: null,
  },
  {
    name: "Scale", tagline: "Performer et automatiser", price: "749 900", currency: "FCFA",
    description: "Automatisation avancée et IA pour maximiser votre ROI.",
    features: ["Tout du pack Croissance", "Automatisation marketing IA", "Chatbot intelligent 24/7", "Intégrations CRM/outils", "Funnels de conversion avancés", "A/B testing continu", "Account manager dédié", "Audit trimestriel complet"],
    notIncluded: [],
    popular: false, href: "/contact?pack=scale", savings: "Économisez 35%",
  },
  {
    name: "Business", tagline: "Dominer son marché", price: "900 000", currency: "FCFA",
    description: "Solution complète pour les entreprises ambitieuses qui veulent dominer leur secteur digital.",
    features: ["Tout du pack Scale", "Site web jusqu'à 15 pages", "Design premium sur-mesure", "Système de réservation/booking", "E-commerce intégré", "Formation équipe (2 sessions)", "Maintenance 6 mois incluse", "Reporting avancé bi-mensuel", "Stratégie de contenu complète"],
    notIncluded: [],
    popular: false, href: "/contact?pack=business", savings: null,
  },
  {
    name: "VIP", tagline: "L'excellence digitale totale", price: "1 200 000", currency: "FCFA",
    description: "Accompagnement premium 360° avec accès prioritaire et stratégie personnalisée à long terme.",
    features: ["Tout du pack Business", "Site web illimité en pages", "Application mobile dédiée", "Branding & identité visuelle complète", "Campagnes publicitaires gérées", "Formation équipe illimitée", "Maintenance 12 mois incluse", "Account manager VIP dédié", "Audit mensuel + recommandations", "Accès prioritaire 24/7", "Paiement en 3 fois sans frais"],
    notIncluded: [],
    popular: false, href: "/contact?pack=vip", savings: "Pack Premium",
  },
];

const guarantees = [
  { icon: Shield, title: "Satisfait ou remboursé", description: "30 jours pour tester, remboursement intégral si pas convaincu." },
  { icon: Clock, title: "Livraison dans les délais", description: "Respect des deadlines ou réduction sur la prochaine prestation." },
  { icon: Headphones, title: "Support inclus", description: "3 mois de support et maintenance inclus après chaque livraison." },
];

const faqs = [
  { question: "Comment se déroule un projet avec Le Compagnon Virtuel ?", answer: "Nous commençons par un audit gratuit pour comprendre vos besoins. Ensuite, nous vous proposons une solution sur-mesure avec un planning clair. Vous êtes impliqué à chaque étape avec des points réguliers." },
  { question: "Les tarifs sont-ils fixes ?", answer: "Les tarifs affichés sont des bases. Chaque projet étant unique, nous adaptons notre offre à vos besoins spécifiques. Demandez un devis personnalisé pour un chiffrage précis." },
  { question: "Proposez-vous des facilités de paiement ?", answer: "Oui, nous proposons un paiement en plusieurs fois pour tous nos packs. Contactez-nous pour discuter des modalités adaptées à votre situation." },
  { question: "Quelle est la durée d'engagement ?", answer: "Nos packs sont sans engagement longue durée. Les prestations mensuelles (community management, maintenance) sont reconduites tacitement avec préavis d'un mois." },
];

const Pricing = () => {
  useDocumentMeta({
    title: "Tarifs — Packs digitaux à partir de 149 900 FCFA",
    description: "Découvrez nos packs Starter, Croissance et Scale. Des tarifs clairs et adaptés au marché africain, sans surprise.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Tarifs</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Des offres claires, <span className="gradient-text">sans surprise</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choisissez le pack adapté à vos besoins. Tous sont personnalisables selon votre projet.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-3xl p-8 ${plan.popular ? "bg-foreground text-background shadow-elevated scale-105" : "bg-card border border-border"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Star size={14} fill="currentColor" /> Le plus populaire
                    </div>
                  )}
                  {plan.savings && (
                    <div className="absolute -top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold">
                      <BadgePercent size={14} /> {plan.savings}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-2xl mb-1">{plan.name}</h3>
                    <p className={`text-sm ${plan.popular ? "text-background/60" : "text-muted-foreground"}`}>{plan.tagline}</p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold">{plan.price}</span>
                      <span className={`text-sm font-medium ${plan.popular ? "text-background/80" : "text-foreground"}`}>FCFA</span>
                    </div>
                    <p className={`text-sm mt-2 ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={18} className="mt-0.5 text-primary" />
                        <span className={`text-sm ${plan.popular ? "text-background/80" : ""}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "hero" : "heroOutline"} size="lg" className="w-full" asChild>
                    <Link to={plan.href} className="group">
                      Choisir ce pack <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>

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

        {/* Guarantees */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Nos Garanties</h2>
              <p className="text-muted-foreground">Nous nous engageons pour votre satisfaction à chaque étape.</p>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {guarantees.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
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
        <section className="section-padding bg-card">
          <div className="container-narrow">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Questions Fréquentes</h2>
              <p className="text-muted-foreground">Tout ce que vous devez savoir sur nos tarifs et notre fonctionnement.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-2xl px-6 bg-background">
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
