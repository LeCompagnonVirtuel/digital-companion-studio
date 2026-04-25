import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Calendar, Clock, Users, CheckCircle, Phone, Mail } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { AppointmentBooking } from "@/components/AppointmentBooking";

const talkSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères").max(2000),
  preferredContact: z.string().min(1, "Veuillez choisir un moyen de contact"),
  availability: z.string().optional(),
});

const contactMethods = [
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Téléphone", icon: Phone },
  { value: "video", label: "Visioconférence", icon: Calendar },
];

const availabilities = [
  { value: "morning", label: "Matin (9h-12h)" },
  { value: "afternoon", label: "Après-midi (14h-18h)" },
  { value: "evening", label: "Fin de journée (18h-20h)" },
  { value: "flexible", label: "Flexible" },
];

const TalkProject = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredContact: "",
    availability: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = talkSchema.safeParse(formData);
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
      const contactLabel = contactMethods.find((c) => c.value === formData.preferredContact)?.label || formData.preferredContact;
      const availabilityLabel = availabilities.find((a) => a.value === formData.availability)?.label || formData.availability;

      const message = `
[PARLONS DE VOTRE PROJET]
Contact préféré: ${contactLabel}
Disponibilités: ${availabilityLabel || "Non précisé"}

Message:
${formData.message}
      `.trim();

      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          company: formData.company?.trim() || null,
          message,
          source: "talk_project",
          status: "new",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons très rapidement pour échanger.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        preferredContact: "",
        availability: "",
      });
    } catch (error) {
      console.error("Error submitting talk form:", error);
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
                <MessageCircle size={16} />
                Échangeons
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Parlons de{" "}
                <span className="gradient-text">votre projet</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Prenons le temps d'échanger sur votre vision. Un simple échange pour comprendre vos besoins et vous proposer les meilleures solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Réponse rapide", description: "Nous vous recontactons sous 24h" },
                { icon: Users, title: "Échange humain", description: "Un vrai interlocuteur, pas un robot" },
                { icon: CheckCircle, title: "Sans engagement", description: "Échangez librement, sans pression" },
                { icon: Calendar, title: "Flexible", description: "On s'adapte à vos disponibilités" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="font-display font-bold text-2xl mb-6">Comment nous joindre</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href={`mailto:${settings.contact_email}`} className="font-medium hover:text-primary transition-colors">
                        {settings.contact_email}
                      </a>
                    </div>
                  </div>
                  
                  {settings.business_info.phone && (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                        <a href={`tel:${settings.business_info.phone.replace(/\s/g, '')}`} className="font-medium hover:text-primary transition-colors">
                          {settings.business_info.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-display font-semibold mb-3">💬 Notre promesse</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nous prenons le temps de vraiment comprendre votre projet. Pas de jargon technique, pas de pression commerciale, juste un échange constructif.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Écoute active de vos besoins",
                      "Conseils personnalisés",
                      "Transparence totale",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className="text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
                  <h2 className="font-display font-bold text-2xl mb-6">Dites-nous en plus</h2>

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
                    <label className="block text-sm font-medium mb-3">Comment préférez-vous être contacté(e) ? *</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {contactMethods.map((method) => (
                        <label
                          key={method.value}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.preferredContact === method.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method.value}
                            checked={formData.preferredContact === method.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <method.icon size={18} className={formData.preferredContact === method.value ? "text-primary" : "text-muted-foreground"} />
                          <span className="text-sm font-medium">{method.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredContact && <p className="text-sm text-destructive mt-2">{errors.preferredContact}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="availability" className="block text-sm font-medium mb-2">Vos disponibilités</label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Sélectionner...</option>
                      {availabilities.map((a) => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Parlez-nous de votre projet *</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet, vos idées, vos questions... Nous sommes à l'écoute !"
                      rows={6}
                      required
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Envoi en cours..." : (
                      <>
                        Envoyer mon message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>

                {/* Appointment Booking */}
                <div className="mt-8">
                  <AppointmentBooking 
                    source="talk_project"
                    title="Planifier un appel"
                    description="Réservez directement un créneau de 30 min pour échanger sur votre projet."
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

export default TalkProject;
