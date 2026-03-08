import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Gift, 
  Sparkles,
  BookOpen,
  BarChart3,
  Palette,
  Target,
  Zap,
  Users
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";

const leadMagnets = {
  fr: [
    {
      id: "checklist-site",
      icon: CheckCircle,
      title: "Checklist Site Web Parfait",
      description: "50 points essentiels pour un site web qui convertit vos visiteurs en clients.",
      benefits: ["50 points de vérification", "Optimisation SEO incluse", "Version imprimable"],
      downloadUrl: "#",
      category: "Site Web",
      popular: true
    },
    {
      id: "guide-reseaux",
      icon: Users,
      title: "Guide Réseaux Sociaux 2024",
      description: "Stratégies et templates pour exploser sur les réseaux sociaux en Afrique.",
      benefits: ["20+ templates de posts", "Calendrier éditorial", "Stratégies par plateforme"],
      downloadUrl: "#",
      category: "Marketing"
    },
    {
      id: "template-business",
      icon: Target,
      title: "Template Business Plan",
      description: "Modèle complet de business plan adapté aux entrepreneurs africains.",
      benefits: ["Modèle prêt à remplir", "Projections financières", "Guide pas à pas"],
      downloadUrl: "#",
      category: "Business",
      popular: true
    },
    {
      id: "ebook-ecommerce",
      icon: BookOpen,
      title: "Ebook E-commerce Afrique",
      description: "Comment lancer et développer votre boutique en ligne en Afrique.",
      benefits: ["Guide complet de 50 pages", "Études de cas locales", "Stratégies de paiement"],
      downloadUrl: "#",
      category: "E-commerce"
    },
    {
      id: "template-logo",
      icon: Palette,
      title: "Kit Identité Visuelle",
      description: "Templates et guide pour créer une identité de marque professionnelle.",
      benefits: ["5 templates de logo", "Charte graphique", "Guide couleurs & typo"],
      downloadUrl: "#",
      category: "Design"
    },
    {
      id: "analyse-concurrence",
      icon: BarChart3,
      title: "Template Analyse Concurrentielle",
      description: "Analysez votre marché et positionnez-vous stratégiquement.",
      benefits: ["Tableau d'analyse prêt", "Méthodologie complète", "Recommandations auto"],
      downloadUrl: "#",
      category: "Stratégie"
    }
  ],
  en: [
    {
      id: "checklist-site",
      icon: CheckCircle,
      title: "Perfect Website Checklist",
      description: "50 essential points for a website that converts visitors into customers.",
      benefits: ["50 check points", "SEO optimization included", "Printable version"],
      downloadUrl: "#",
      category: "Website",
      popular: true
    },
    {
      id: "guide-reseaux",
      icon: Users,
      title: "Social Media Guide 2024",
      description: "Strategies and templates to explode on social media in Africa.",
      benefits: ["20+ post templates", "Editorial calendar", "Platform strategies"],
      downloadUrl: "#",
      category: "Marketing"
    },
    {
      id: "template-business",
      icon: Target,
      title: "Business Plan Template",
      description: "Complete business plan template adapted for African entrepreneurs.",
      benefits: ["Ready-to-fill template", "Financial projections", "Step-by-step guide"],
      downloadUrl: "#",
      category: "Business",
      popular: true
    },
    {
      id: "ebook-ecommerce",
      icon: BookOpen,
      title: "E-commerce Africa Ebook",
      description: "How to launch and grow your online store in Africa.",
      benefits: ["Complete 50-page guide", "Local case studies", "Payment strategies"],
      downloadUrl: "#",
      category: "E-commerce"
    },
    {
      id: "template-logo",
      icon: Palette,
      title: "Visual Identity Kit",
      description: "Templates and guide to create a professional brand identity.",
      benefits: ["5 logo templates", "Brand guidelines", "Colors & typography guide"],
      downloadUrl: "#",
      category: "Design"
    },
    {
      id: "analyse-concurrence",
      icon: BarChart3,
      title: "Competitive Analysis Template",
      description: "Analyze your market and position yourself strategically.",
      benefits: ["Ready analysis table", "Complete methodology", "Auto recommendations"],
      downloadUrl: "#",
      category: "Strategy"
    }
  ]
};

const pageContent = {
  fr: {
    badge: "Ressources Gratuites",
    title: "Boostez votre business avec nos",
    titleHighlight: "ressources gratuites",
    subtitle: "Templates, guides et outils gratuits pour lancer et développer votre entreprise digitale. Téléchargez-les immédiatement.",
    emailPlaceholder: "Votre email professionnel",
    downloadCta: "Télécharger gratuitement",
    downloading: "Envoi en cours...",
    successTitle: "Ressource envoyée !",
    successDesc: "Vérifiez votre boîte de réception. Si vous ne voyez pas l'email, vérifiez vos spams.",
    errorTitle: "Erreur",
    errorDesc: "Une erreur est survenue. Veuillez réessayer.",
    popular: "Populaire",
    whyTitle: "Pourquoi ces ressources ?",
    whySubtitle: "Créées spécialement pour les entrepreneurs africains et internationaux",
    whyItems: [
      { icon: Zap, title: "Actionnable immédiatement", description: "Pas de théorie inutile, que du concret à appliquer dès maintenant." },
      { icon: Target, title: "Adapté à votre marché", description: "Conçu pour les réalités du business en Afrique et à l'international." },
      { icon: Gift, title: "100% Gratuit", description: "Aucune carte bancaire requise, aucun engagement. Téléchargez et utilisez." }
    ],
    ctaTitle: "Besoin d'un accompagnement personnalisé ?",
    ctaSubtitle: "Nos experts sont là pour vous aider à atteindre vos objectifs business.",
    ctaButton: "Parler à un expert"
  },
  en: {
    badge: "Free Resources",
    title: "Boost your business with our",
    titleHighlight: "free resources",
    subtitle: "Free templates, guides and tools to launch and grow your digital business. Download them immediately.",
    emailPlaceholder: "Your professional email",
    downloadCta: "Download for free",
    downloading: "Sending...",
    successTitle: "Resource sent!",
    successDesc: "Check your inbox. If you don't see the email, check your spam folder.",
    errorTitle: "Error",
    errorDesc: "An error occurred. Please try again.",
    popular: "Popular",
    whyTitle: "Why these resources?",
    whySubtitle: "Created especially for African and international entrepreneurs",
    whyItems: [
      { icon: Zap, title: "Immediately actionable", description: "No useless theory, only concrete steps to apply right now." },
      { icon: Target, title: "Adapted to your market", description: "Designed for business realities in Africa and internationally." },
      { icon: Gift, title: "100% Free", description: "No credit card required, no commitment. Download and use." }
    ],
    ctaTitle: "Need personalized support?",
    ctaSubtitle: "Our experts are here to help you achieve your business goals.",
    ctaButton: "Talk to an expert"
  }
};

const FreeResources = () => {
  useDocumentMeta({
    title: "Ressources gratuites",
    description: "Templates, guides et outils gratuits pour entrepreneurs : checklist site web, guide réseaux sociaux, templates Canva et plus.",
  });

  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const resources = leadMagnets[language];
  const t = pageContent[language];

  const handleDownload = async (resourceId: string) => {
    if (!email) {
      setSelectedResource(resourceId);
      return;
    }

    setIsLoading(true);
    try {
      // Save lead to database
      const { error } = await supabase.from("leads").insert({
        email,
        name: email.split("@")[0],
        source: `lead_magnet_${resourceId}`,
        message: `Téléchargement: ${resourceId}`,
      });

      if (error) throw error;

      toast({
        title: t.successTitle,
        description: t.successDesc,
      });

      setEmail("");
      setSelectedResource(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.errorTitle,
        description: t.errorDesc,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
            >
              <Gift size={16} />
              {t.badge}
            </motion.span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              {t.title}{" "}
              <span className="gradient-text">{t.titleHighlight}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="container-wide px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-card border border-border/60 rounded-2xl p-6 h-full hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Popular Badge */}
                  {resource.popular && (
                    <div className="absolute -top-3 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-medium">
                        <Sparkles size={12} />
                        {t.popular}
                      </span>
                    </div>
                  )}

                  {/* Icon & Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <resource.icon size={28} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {resource.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className="text-accent shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Download Form */}
                  {selectedResource === resource.id ? (
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11"
                      />
                      <Button
                        onClick={() => handleDownload(resource.id)}
                        disabled={isLoading || !email}
                        className="w-full"
                      >
                        {isLoading ? t.downloading : t.downloadCta}
                        <Download size={16} className="ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setSelectedResource(resource.id)}
                      variant="outline"
                      className="w-full group/btn"
                    >
                      <Download size={16} className="mr-2" />
                      {t.downloadCta}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container-wide px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              {t.whyTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.whySubtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {t.whyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container-wide px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {t.ctaSubtitle}
            </p>
            <Button asChild size="lg">
              <Link to="/parlons-projet">
                {t.ctaButton}
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeResources;