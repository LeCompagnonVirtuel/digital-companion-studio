import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Code, Megaphone, Bot, Palette, Globe, Mail, Phone, Linkedin, Github, Rocket, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import harounaImage from "@/assets/harouna.jpg";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST API"] },
  { category: "IA & Automatisation", items: ["ChatGPT API", "Claude API", "n8n", "Make", "Zapier"] },
  { category: "Marketing Digital", items: ["SEO", "Google Ads", "Meta Ads", "Analytics", "Content Marketing"] },
  { category: "Design", items: ["Figma", "UI/UX Design", "Branding", "Responsive Design"] },
  { category: "DevOps", items: ["Vercel", "Git", "GitHub", "CI/CD", "Docker"] },
];

const experiences = [
  {
    period: "2024 — Présent",
    title: "Fondateur & Développeur Full-Stack",
    company: "Le Compagnon Virtuel",
    description: "Création et direction d'une agence digitale spécialisée dans le développement web, l'IA et l'automatisation. Plus de 50 projets livrés avec 100% de satisfaction client.",
  },
];

const services = [
  { icon: Code, title: "Développement Web & Mobile", description: "Sites vitrines, e-commerce, applications web et mobiles sur-mesure avec les technologies les plus modernes." },
  { icon: Bot, title: "IA & Automatisation", description: "Chatbots intelligents, automatisation de processus, intégration d'IA pour optimiser votre productivité." },
  { icon: Megaphone, title: "Marketing Digital", description: "SEO, publicité en ligne, stratégie de contenu et community management pour booster votre visibilité." },
  { icon: Palette, title: "Design & Branding", description: "Identité visuelle, UI/UX design, charte graphique et supports de communication percutants." },
];

const Founder = () => {
  useDocumentMeta({
    title: "Kouassi Kouakou Harouna — Fondateur & Développeur Full-Stack",
    description: "Découvrez le parcours de Kouassi Kouakou Harouna, fondateur de Le Compagnon Virtuel. Développeur Full-Stack passionné, expert en React, Node.js, IA & Automatisation.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <motion.div
            className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft size={16} />
                Retour à propos
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Fondateur & CEO
                </span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                  Kouassi Kouakou <span className="gradient-text">Harouna</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-2">Développeur Full-Stack & Entrepreneur Digital</p>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin size={16} />
                  <span>Côte d'Ivoire</span>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Freelance passionné par le digital, je conçois et développe des solutions innovantes et sur-mesure pour transformer les entreprises.
                  Mon objectif : démocratiser l'accès au digital de qualité en Afrique et accompagner les entrepreneurs dans leur croissance.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/parlons-projet" className="group">
                      Discutons de votre projet
                      <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">
                      <Mail size={18} />
                      Me contacter
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="text-3xl font-display font-bold gradient-text">50+</div>
                    <div className="text-sm text-muted-foreground">Projets livrés</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold gradient-text">10+</div>
                    <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold gradient-text">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1">
                  <img
                    src={harounaImage}
                    alt="Kouassi Kouakou Harouna"
                    className="w-full h-full object-cover rounded-[calc(1.5rem-4px)]"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services / Expertise */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Ce que je fais</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Mes <span className="gradient-text">domaines d'expertise</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Des compétences variées pour répondre à tous vos besoins digitaux.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Compétences</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Stack <span className="gradient-text">technique</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Les technologies et outils que j'utilise au quotidien pour créer des solutions performantes.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <h3 className="font-display font-semibold text-lg mb-4 gradient-text">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Parcours</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Mon <span className="gradient-text">expérience</span></h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{exp.period}</span>
                    <span className="text-sm text-muted-foreground">{exp.company}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
          <div className="container-narrow text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Ma Vision</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Démocratiser le <span className="gradient-text">digital en Afrique</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Je crois fermement que chaque entreprise, quelle que soit sa taille, mérite d'avoir accès à des solutions digitales de qualité.
                Mon ambition est de positionner Le Compagnon Virtuel comme un acteur majeur de la transformation digitale en Afrique francophone,
                en offrant des services innovants, accessibles et orientés résultats.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Accessibilité", "Innovation", "Excellence", "Impact"].map((value, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
                  >
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-sm font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Founder;
