import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Globe, Target, Calendar, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { z } from "zod";

const auditSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  website: z.string().url("URL invalide").max(500).or(z.literal("")),
  objectives: z.array(z.string()).min(1, "Sélectionnez au moins un objectif"),
  challenges: z.string().trim().max(1000).optional(),
  wantsCall: z.boolean(),
});

const objectivesList = [
  { value: "visibility", label: "Améliorer ma visibilité en ligne" },
  { value: "conversions", label: "Augmenter mes conversions/ventes" },
  { value: "seo", label: "Améliorer mon référencement SEO" },
  { value: "redesign", label: "Refondre mon site web" },
  { value: "performance", label: "Améliorer les performances" },
  { value: "mobile", label: "Optimiser pour mobile" },
  { value: "other", label: "Autre" },
];

const StartAudit = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    objectives: [] as string[],
    challenges: "",
    wantsCall: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = auditSchema.safeParse(formData);
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
      const objectivesLabels = formData.objectives.map(
        (obj) => objectivesList.find((o) => o.value === obj)?.label || obj
      );

      const message = `
[DEMANDE D'AUDIT GRATUIT]
Site web: ${formData.website || "Non renseigné"}
Objectifs: ${objectivesLabels.join(", ")}
Souhaite un appel: ${formData.wantsCall ? "Oui" : "Non"}

Problématiques:
${formData.challenges || "Non précisé"}
      `.trim();

      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          company: formData.company?.trim() || null,
          message,
          source: "audit_request",
          status: "new",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Demande d'audit envoyée !",
        description: "Vous recevrez votre audit personnalisé sous 48h.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        objectives: [],
        challenges: "",
        wantsCall: false,
      });
    } catch (error) {
      console.error("Error submitting audit form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleObjectiveToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(value)
        ? prev.objectives.filter((o) => o !== value)
        : [...prev.objectives, value],
    }));
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
                <Search size={16} />
                Audit gratuit
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Démarrer votre{" "}
                <span className="gradient-text">audit gratuit</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Remplissez ce formulaire et recevez une analyse complète de votre présence digitale sous 48h.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="font-display font-bold text-2xl mb-6">Ce que vous allez recevoir</h2>
                <div className="space-y-4">
                  {[
                    { icon: Globe, text: "Analyse technique de votre site" },
                    { icon: Search, text: "Évaluation SEO complète" },
                    { icon: Target, text: "Recommandations personnalisées" },
                    { icon: Calendar, text: "Plan d'action prioritaire" },
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
                  <h3 className="font-display font-semibold mb-2">⏰ Délai de livraison</h3>
                  <p className="text-sm text-muted-foreground">
                    Votre audit sera envoyé par email sous 48h ouvrées maximum.
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
                  <h2 className="font-display font-bold text-2xl mb-6">Vos informations</h2>

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
                        placeholder="+225 07 06 69 30 38"
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

                  <div className="mb-6">
                    <label htmlFor="website" className="block text-sm font-medium mb-2">URL de votre site web</label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.votre-site.fr"
                      className={errors.website ? "border-destructive" : ""}
                    />
                    {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Laissez vide si vous n'avez pas encore de site</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Vos objectifs * (plusieurs choix possibles)</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {objectivesList.map((objective) => (
                        <label
                          key={objective.value}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.objectives.includes(objective.value)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.objectives.includes(objective.value)}
                            onChange={() => handleObjectiveToggle(objective.value)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            formData.objectives.includes(objective.value)
                              ? "bg-primary text-primary-foreground"
                              : "border border-input"
                          }`}>
                            {formData.objectives.includes(objective.value) && <CheckCircle size={14} />}
                          </div>
                          <span className="text-sm">{objective.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.objectives && <p className="text-sm text-destructive mt-2">{errors.objectives}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="challenges" className="block text-sm font-medium mb-2">Vos problématiques actuelles (optionnel)</label>
                    <Textarea
                      id="challenges"
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleChange}
                      placeholder="Décrivez les difficultés que vous rencontrez actuellement..."
                      rows={4}
                    />
                  </div>

                  <div className="mb-8 p-4 rounded-xl bg-card border border-border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="wantsCall"
                        checked={formData.wantsCall}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-input"
                      />
                      <div>
                        <span className="font-medium">Je souhaite être rappelé(e)</span>
                        <p className="text-sm text-muted-foreground">Un expert vous contactera pour discuter de votre audit</p>
                      </div>
                    </label>
                  </div>

                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Envoi en cours..." : (
                      <>
                        Demander mon audit gratuit
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>

                {/* Appointment Booking */}
                <div className="mt-8">
                  <AppointmentBooking 
                    source="audit"
                    title="Préférez-vous un appel ?"
                    description="Réservez un créneau de 30 min pour discuter de votre audit avec un expert."
                  />
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

export default StartAudit;
