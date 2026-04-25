import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Check,
  Code,
  Palette,
  Megaphone,
  Bot,
  ShoppingCart,
  Globe,
  Smartphone,
  Search,
  Users,
  FileText,
  CircleDot,
  Send,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { id: "dev-web", label: "Développement Web", icon: Code },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "app-mobile", label: "Applications Mobiles", icon: Smartphone },
  { id: "design", label: "Design & Branding", icon: Palette },
  { id: "marketing", label: "Marketing Digital", icon: Megaphone },
  { id: "seo", label: "SEO & Visibilité", icon: Search },
  { id: "automatisation", label: "Automatisation & IA", icon: Bot },
  { id: "community", label: "Community Management", icon: Users },
  { id: "contenu", label: "Création de Contenu", icon: FileText },
];

const budgets = [
  { id: "moins-150k", label: "Moins de 150 000 FCFA" },
  { id: "150k-350k", label: "150 000 - 350 000 FCFA" },
  { id: "350k-600k", label: "350 000 - 600 000 FCFA" },
  { id: "600k-1200k", label: "600 000 - 1 200 000 FCFA" },
  { id: "plus-1500k", label: "Plus de 1 500 000 FCFA" },
  { id: "a-definir", label: "À définir ensemble" },
];

const timelines = [
  { id: "urgent", label: "Urgent (< 2 semaines)" },
  { id: "court", label: "Court terme (2-4 semaines)" },
  { id: "moyen", label: "Moyen terme (1-2 mois)" },
  { id: "long", label: "Long terme (> 2 mois)" },
  { id: "flexible", label: "Flexible" },
];

const DevisPersonnalise = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    budget: searchParams.get("budget") || "",
    timeline: "",
    description: "",
    existingWebsite: "",
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.description) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedServices = services
        .filter(s => formData.services.includes(s.id))
        .map(s => s.label)
        .join(", ");

      const message = `
**Demande de devis personnalisé**

Services demandés: ${selectedServices || "Non spécifié"}
Budget: ${budgets.find(b => b.id === formData.budget)?.label || "Non spécifié"}
Délai souhaité: ${timelines.find(t => t.id === formData.timeline)?.label || "Non spécifié"}
Site existant: ${formData.existingWebsite || "Non"}

**Description du projet:**
${formData.description}
      `.trim();

      const { error } = await supabase.from("leads").insert({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        message,
        source: "devis-personnalise",
        status: "new",
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les 24h avec votre devis personnalisé.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        services: [],
        budget: "",
        timeline: "",
        description: "",
        existingWebsite: "",
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 bg-mesh" />
          
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="badge-premium mb-6">
                <Sparkles size={14} className="mr-1" />
                Devis Sur-Mesure
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6 tracking-tight">
                Demandez votre <span className="gradient-text">devis personnalisé</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Décrivez votre projet et recevez une proposition détaillée et adaptée à vos besoins sous 24h.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-20">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Info */}
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="font-display font-semibold text-lg mb-6">Vos coordonnées</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jean@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+225 07 06 69 30 38"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="font-display font-semibold text-lg mb-6">Services souhaités</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.services.includes(service.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={formData.services.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <service.icon size={18} className="text-primary" />
                          <span className="text-sm">{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-card border border-border">
                      <h2 className="font-display font-semibold text-lg mb-4">Budget estimé</h2>
                      <div className="space-y-2">
                        {budgets.map((budget) => (
                          <label
                            key={budget.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.budget === budget.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <CircleDot 
                              size={18} 
                              className={formData.budget === budget.id ? "text-primary" : "text-muted-foreground"} 
                            />
                            <input
                              type="radio"
                              name="budget"
                              value={budget.id}
                              checked={formData.budget === budget.id}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm">{budget.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border">
                      <h2 className="font-display font-semibold text-lg mb-4">Délai souhaité</h2>
                      <div className="space-y-2">
                        {timelines.map((timeline) => (
                          <label
                            key={timeline.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.timeline === timeline.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <CircleDot 
                              size={18} 
                              className={formData.timeline === timeline.id ? "text-primary" : "text-muted-foreground"} 
                            />
                            <input
                              type="radio"
                              name="timeline"
                              value={timeline.id}
                              checked={formData.timeline === timeline.id}
                              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm">{timeline.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="font-display font-semibold text-lg mb-4">Votre projet</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="existingWebsite">Site web existant (si applicable)</Label>
                        <Input
                          id="existingWebsite"
                          value={formData.existingWebsite}
                          onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                          placeholder="https://votre-site.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Décrivez votre projet en détail *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Parlez-nous de votre projet, vos objectifs, vos contraintes..."
                          rows={6}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* What you get */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg mb-4">Ce que vous recevrez</h3>
                  <ul className="space-y-3">
                    {[
                      "Analyse détaillée de vos besoins",
                      "Proposition technique sur-mesure",
                      "Estimation budgétaire précise",
                      "Planning de réalisation",
                      "Garanties et conditions",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-accent" />
                        </div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Response time */}
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Réponse sous 24h</h4>
                      <p className="text-xs text-muted-foreground">Jours ouvrés</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notre équipe analyse votre demande et vous envoie une proposition détaillée rapidement.
                  </p>
                </div>

                {/* Contact alternatives */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg mb-4">Préférez nous appeler ?</h3>
                  <div className="space-y-3">
                    <a 
                      href="tel:+2250706693038"
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Phone size={18} className="text-primary" />
                      <span className="text-sm">+225 07 06 69 30 38</span>
                    </a>
                    <a 
                      href="mailto:lecompagnonvirtuel@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Mail size={18} className="text-primary" />
                      <span className="text-sm">lecompagnonvirtuel@gmail.com</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DevisPersonnalise;
