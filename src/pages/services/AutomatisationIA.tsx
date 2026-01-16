import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Workflow, 
  MessageSquare, 
  Zap, 
  BarChart3, 
  Settings, 
  ArrowRight, 
  Check, 
  Star,
  Brain,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: MessageSquare,
    title: "Chatbots IA",
    description: "Assistants virtuels intelligents pour votre service client et support 24/7.",
    features: ["Compréhension naturelle", "Multilingue", "Intégration CRM", "Apprentissage continu"],
  },
  {
    icon: Workflow,
    title: "Workflows Automatisés",
    description: "Automatisation de vos processus métiers pour gagner du temps et réduire les erreurs.",
    features: ["Zapier / Make", "N8N / Activepieces", "Workflows sur-mesure", "Monitoring"],
  },
  {
    icon: Brain,
    title: "IA Générative",
    description: "Création de contenu, analyse de données et génération automatisée avec l'IA.",
    features: ["Génération de contenu", "Analyse de documents", "Résumés automatiques", "Classification"],
  },
  {
    icon: RefreshCw,
    title: "Intégrations",
    description: "Connectez vos outils entre eux pour un écosystème digital fluide et efficace.",
    features: ["APIs personnalisées", "Synchronisation données", "Webhooks", "ETL"],
  },
];

const useCases = [
  { title: "Support client", description: "Répondez instantanément aux questions fréquentes", icon: MessageSquare },
  { title: "Facturation auto", description: "Automatisez la création et l'envoi de factures", icon: Zap },
  { title: "Lead scoring", description: "Qualifiez vos prospects automatiquement", icon: BarChart3 },
  { title: "Onboarding", description: "Automatisez l'intégration de nouveaux clients", icon: Settings },
];

const stats = [
  { value: "70%", label: "Temps gagné" },
  { value: "24/7", label: "Disponibilité" },
  { value: "95%", label: "Précision" },
  { value: "-60%", label: "Coûts support" },
];

const pricing = [
  {
    name: "Chatbot",
    price: "200 000",
    period: " FCFA",
    description: "Assistant virtuel intelligent",
    features: [
      "Chatbot IA personnalisé",
      "Intégration site web",
      "Réponses automatiques FAQ",
      "Qualification des leads",
      "Dashboard analytics",
      "Support 30 jours",
    ],
    popular: false,
  },
  {
    name: "Automatisation",
    price: "350 000",
    period: " FCFA",
    description: "Workflows automatisés complets",
    features: [
      "Analyse de vos processus",
      "3 workflows automatisés",
      "Intégrations outils (CRM, email, etc.)",
      "Chatbot IA inclus",
      "Formation équipe",
      "Monitoring & alertes",
      "Support 60 jours",
    ],
    popular: true,
  },
  {
    name: "IA Avancée",
    price: "À partir de 600 000",
    period: " FCFA",
    description: "Solutions IA sur-mesure",
    features: [
      "Audit IA complet",
      "Workflows illimités",
      "IA générative personnalisée",
      "Agents IA autonomes",
      "Intégrations avancées",
      "API personnalisées",
      "Accompagnement 3 mois",
      "Support prioritaire",
    ],
    popular: false,
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

const AutomatisationIA = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-background to-background" />
          <motion.div 
            className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  <Bot size={16} />
                  Automatisation & IA
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  L'intelligence{" "}
                  <span className="gradient-text">artificielle</span>{" "}
                  au service de votre croissance
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Automatisez vos processus, libérez du temps et gagnez en productivité grâce à nos solutions d'IA et d'automatisation sur-mesure.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/demarrer-projet">
                      Automatiser maintenant
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/audit-gratuit">Audit gratuit</Link>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Bot size={48} className="text-accent" />
                      </motion.div>
                      <div className="flex justify-center gap-2 mb-4">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-accent"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">IA en action...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container-wide">
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
                  <div className="text-3xl sm:text-4xl font-display font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos solutions d'automatisation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                De l'IA conversationnelle aux workflows complexes, nous automatisons vos processus.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Cas d'usage
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez comment l'automatisation transforme le quotidien de nos clients.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <useCase.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Nos tarifs automatisation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des solutions pour tous les budgets et tous les besoins.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-6 rounded-2xl bg-card border ${
                    plan.popular ? "border-accent shadow-lg" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      Recommandé
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full" 
                    asChild
                  >
                    <Link to={`/demarrer-projet?service=automatisation-ia&plan=${i === 0 ? "starter" : i === 1 ? "pro" : "premium"}`}>
                      Choisir ce plan
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default AutomatisationIA;
