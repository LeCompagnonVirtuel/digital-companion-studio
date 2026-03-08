import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Rocket, Clock, Shield, Sparkles, Users, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const projectSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  projectType: z.string().min(1, "Veuillez sélectionner un type de projet"),
  budget: z.string().min(1, "Veuillez indiquer votre budget"),
  timeline: z.string().min(1, "Veuillez indiquer vos délais"),
  description: z.string().trim().min(20, "Décrivez votre projet en au moins 20 caractères").max(2000),
});

const projectTypes = [
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "application-web", label: "Application web" },
  { value: "application-mobile", label: "Application mobile" },
  { value: "refonte", label: "Refonte de site" },
  { value: "marketing-digital", label: "Marketing digital" },
  { value: "seo", label: "SEO & Référencement" },
  { value: "design-branding", label: "Design & Branding" },
  { value: "community-management", label: "Community Management" },
  { value: "creation-contenu", label: "Création de contenu" },
  { value: "automatisation", label: "Automatisation / IA" },
  { value: "audit", label: "Audit digital" },
  { value: "autre", label: "Autre" },
];

const budgets = [
  { value: "moins-100k", label: "Moins de 100 000 FCFA" },
  { value: "100k-250k", label: "100 000 - 250 000 FCFA" },
  { value: "250k-500k", label: "250 000 - 500 000 FCFA" },
  { value: "500k-1m", label: "500 000 - 1 000 000 FCFA" },
  { value: "plus-1m", label: "Plus de 1 000 000 FCFA" },
  { value: "a-definir", label: "À définir ensemble" },
];

const timelines = [
  { value: "urgent", label: "Urgent (< 2 semaines)" },
  { value: "1-mois", label: "1 mois" },
  { value: "2-3-mois", label: "2-3 mois" },
  { value: "flexible", label: "Flexible" },
];

const serviceToProjectType: Record<string, string> = {
  "developpement-web": "site-vitrine",
  "applications-mobiles": "application-mobile",
  "e-commerce": "e-commerce",
  "ecommerce": "e-commerce",
  "marketing-digital": "marketing-digital",
  "seo": "seo",
  "design-branding": "design-branding",
  "community-management": "community-management",
  "creation-contenu": "creation-contenu",
  "automatisation-ia": "automatisation",
  "audit-digital": "audit",
  "gadgets-numeriques": "autre",
};

const planToBudget: Record<string, string> = {
  "starter": "100k-250k",
  "essentiel": "100k-250k",
  "pro": "250k-500k",
  "croissance": "250k-500k",
  "premium": "500k-1m",
  "scale": "500k-1m",
  "entreprise": "plus-1m",
};

const processSteps = [
  {
    icon: Sparkles,
    title: "1. Échange découverte",
    description: "Nous analysons vos besoins, objectifs et contraintes lors d'un appel de 30 min.",
  },
  {
    icon: Zap,
    title: "2. Proposition sur-mesure",
    description: "Vous recevez un devis détaillé avec planning, livrables et garanties.",
  },
  {
    icon: Users,
    title: "3. Réalisation collaborative",
    description: "Nous travaillons ensemble avec des points réguliers et votre validation.",
  },
  {
    icon: Rocket,
    title: "4. Lancement & suivi",
    description: "Mise en ligne de votre projet et accompagnement post-livraison.",
  },
];

const StartProject = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceParam = searchParams.get("service");
  const planParam = searchParams.get("plan");

  const getInitialProjectType = () => {
    if (serviceParam && serviceToProjectType[serviceParam]) {
      return serviceToProjectType[serviceParam];
    }
    return "";
  };

  const getInitialBudget = () => {
    if (planParam && planToBudget[planParam.toLowerCase()]) {
      return planToBudget[planParam.toLowerCase()];
    }
    return "";
  };

  const getInitialDescription = () => {
    const parts: string[] = [];
    if (serviceParam) {
      const serviceLabel = projectTypes.find(t => t.value === serviceToProjectType[serviceParam])?.label;
      if (serviceLabel) {
        parts.push(`Je suis intéressé(e) par le service : ${serviceLabel}`);
      }
    }
    if (planParam) {
      parts.push(`Pack choisi : ${planParam.charAt(0).toUpperCase() + planParam.slice(1)}`);
    }
    if (parts.length > 0) {
      parts.push("\n\nMerci de me recontacter pour en discuter.");
      return parts.join("\n");
    }
    return "";
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: getInitialProjectType(),
    budget: getInitialBudget(),
    timeline: "",
    description: getInitialDescription(),
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      projectType: getInitialProjectType(),
      budget: getInitialBudget(),
      description: prev.description || getInitialDescription(),
    }));
  }, [serviceParam, planParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = projectSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Veuillez vérifier les champs du formulaire",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const projectTypeLabel = projectTypes.find(t => t.value === formData.projectType)?.label || formData.projectType;
      const budgetLabel = budgets.find(b => b.value === formData.budget)?.label || formData.budget;
      const timelineLabel = timelines.find(t => t.value === formData.timeline)?.label || formData.timeline;

      const message = `
[NOUVEAU PROJET]
Type: ${projectTypeLabel}
Budget: ${budgetLabel}
Délais: ${timelineLabel}

Description:
${formData.description}
      `.trim();

      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          company: formData.company?.trim() || null,
          message,
          source: "start_project",
          status: "new",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons sous 24h pour discuter de votre projet.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting project form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Rocket size={16} />
                Démarrer un projet
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Donnez vie à{" "}
                <span className="gradient-text">votre vision</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Décrivez-nous votre projet et recevez une proposition personnalisée sous 24h. Notre équipe vous accompagne de A à Z.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">Notre processus en 4 étapes</h2>
              <p className="text-muted-foreground">Simple, transparent et efficace</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="font-display font-bold text-2xl mb-6">Pourquoi nous faire confiance ?</h2>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: "Réponse garantie sous 24h" },
                    { icon: Shield, text: "Devis transparent, sans surprise" },
                    { icon: Users, text: "Accompagnement personnalisé" },
                    { icon: CheckCircle, text: "+150 projets réalisés avec succès" },
                    { icon: Sparkles, text: "Technologies modernes et performantes" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-accent/10 border border-accent/20">
                  <h3 className="font-display font-semibold text-accent mb-2">💡 Conseil</h3>
                  <p className="text-sm text-muted-foreground">
                    Plus votre description est détaillée, plus notre proposition sera précise et adaptée à vos besoins.
                  </p>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border shadow-card">
                  <h2 className="font-display font-bold text-2xl mb-6">Décrivez votre projet</h2>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet *</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        required
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@exemple.fr"
                        required
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">Entreprise</label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">Type de projet *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`w-full h-10 px-3 rounded-md border bg-background text-sm ${errors.projectType ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Sélectionner...</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {errors.projectType && <p className="text-sm text-destructive mt-1">{errors.projectType}</p>}
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">Budget *</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className={`w-full h-10 px-3 rounded-md border bg-background text-sm ${errors.budget ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Sélectionner...</option>
                        {budgets.map((b) => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                      {errors.budget && <p className="text-sm text-destructive mt-1">{errors.budget}</p>}
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium mb-2">Délais *</label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className={`w-full h-10 px-3 rounded-md border bg-background text-sm ${errors.timeline ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Sélectionner...</option>
                        {timelines.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      {errors.timeline && <p className="text-sm text-destructive mt-1">{errors.timeline}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium mb-2">Décrivez votre projet *</label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet, vos objectifs, votre cible, vos fonctionnalités souhaitées..."
                      rows={6}
                      required
                      className={errors.description ? "border-destructive" : ""}
                    />
                    {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                  </div>

                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Envoi en cours..." : (
                      <>
                        Envoyer ma demande
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartProject;
