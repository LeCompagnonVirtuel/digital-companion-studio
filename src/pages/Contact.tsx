import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle2, MessageCircle, Calendar, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  subject: z.string().trim().min(3, "Le sujet doit contenir au moins 3 caractères").max(200),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

const packInfo: Record<string, { name: string; price: string }> = {
  lancement: { name: "Pack Lancement", price: "150 000 FCFA" },
  standard: { name: "Pack Standard", price: "350 000 FCFA" },
  premium: { name: "Pack Premium", price: "600 000 FCFA" },
  business: { name: "Pack Business", price: "900 000 FCFA" },
  vip: { name: "Pack VIP", price: "1 200 000 FCFA" },
};

const Contact = () => {
  useDocumentMeta({
    title: "Contact — Parlons de votre projet",
    description: "Contactez Le Compagnon Virtuel pour un audit gratuit, un devis personnalisé ou discuter de votre projet digital. Réponse sous 24h.",
  });

  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const selectedPack = searchParams.get("pack");
  const packDetails = selectedPack ? packInfo[selectedPack] : null;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    subject: packDetails ? `Demande pour ${packDetails.name}` : "",
    message: packDetails ? `Bonjour,\n\nJe suis intéressé(e) par le ${packDetails.name} (${packDetails.price}).\n\nMerci de me recontacter pour en discuter.` : "",
  });

  useEffect(() => {
    if (packDetails) {
      setFormData(prev => ({
        ...prev,
        subject: `Demande pour ${packDetails.name}`,
        message: `Bonjour,\n\nJe suis intéressé(e) par le ${packDetails.name} (${packDetails.price}).\n\nMerci de me recontacter pour en discuter.`,
      }));
    }
  }, [selectedPack]);

  const contactInfo = [
    { icon: Mail, title: "Email", value: settings.contact_email, href: `mailto:${settings.contact_email}` },
    { icon: Phone, title: "Téléphone / WhatsApp", value: settings.business_info.phone || "+225 07 06 69 30 38", href: settings.business_info.phone ? `tel:${settings.business_info.phone.replace(/\s/g, '')}` : "tel:+2250706693038" },
    { icon: MapPin, title: "Adresse", value: settings.business_info.address || "Côte d'Ivoire", href: null },
    { icon: Clock, title: "Horaires", value: settings.business_info.hours || "Lun-Ven 8h-18h", href: null },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      toast({ variant: "destructive", title: "Erreur de validation", description: "Veuillez vérifier les champs du formulaire" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert([{
        name: formData.name.trim(), email: formData.email.trim(),
        phone: formData.phone?.trim() || null, company: formData.company?.trim() || null,
        message: `[${formData.subject}] ${formData.message}`.trim(), source: "contact_form", status: "new",
      }]);
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({ variant: "destructive", title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Contact</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Parlons de <span className="gradient-text">votre projet</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une question ? Un projet ? Contactez-nous pour un audit gratuit et sans engagement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8 border-b border-border/50">
          <div className="container-wide">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="https://wa.me/2250706693038" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} className="mr-2 text-green-500" /> WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="tel:+2250706693038">
                  <Phone size={18} className="mr-2 text-primary" /> Appeler
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="/audit-gratuit">
                  <Zap size={18} className="mr-2 text-amber-500" /> Audit gratuit
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-1">
                <h2 className="font-display font-bold text-2xl mb-6">Coordonnées</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                        {info.href ? (
                          <a href={info.href} className="font-medium hover:text-primary transition-colors">{info.value}</a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response time indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">Temps de réponse moyen</p>
                      <p className="text-xs text-green-600 dark:text-green-500">Moins de 2 heures en semaine</p>
                    </div>
                  </div>
                </motion.div>

                {/* Benefits */}
                <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-display font-semibold mb-4">Pourquoi nous contacter ?</h3>
                  <ul className="space-y-3">
                    {["Audit gratuit et sans engagement", "Réponse sous 24h garantie", "Conseils personnalisés", "Devis détaillé offert"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 rounded-3xl bg-card border border-border shadow-card text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 size={40} className="text-green-500" />
                      </motion.div>
                      <h3 className="font-display font-bold text-2xl mb-3">Message envoyé !</h3>
                      <p className="text-muted-foreground mb-8">Merci pour votre message. Nous vous répondrons dans les 24 heures.</p>
                      <Button onClick={() => setIsSubmitted(false)}>Envoyer un autre message</Button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border shadow-card">
                      <h2 className="font-display font-bold text-2xl mb-6">Envoyez-nous un message</h2>
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet *</label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" required className={errors.name ? "border-destructive" : ""} />
                          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jean@exemple.fr" required className={errors.email ? "border-destructive" : ""} />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+225 07 06 69 30 38" />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">Entreprise</label>
                          <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Nom de votre entreprise" />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Sujet *</label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Ex: Demande de devis pour un site e-commerce" required className={errors.subject ? "border-destructive" : ""} />
                        {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet, vos besoins et vos objectifs..." rows={6} required className={errors.message ? "border-destructive" : ""} />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>
                      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                        {isSubmitting ? "Envoi en cours..." : <><Send size={18} className="mr-2" /> Envoyer le message</>}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
