import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Award, Rocket, ArrowRight, Code, Megaphone, Palette, Bot } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import logoImage from "@/assets/logo.png";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [isInView, target]);

  return <div ref={ref} className="text-3xl font-display font-bold gradient-text">{count}{suffix}</div>;
};

const values = [
  { title: "Expertise Multi-domaines", description: "Développement web, mobile, IA, automatisation & marketing digital. Une expertise complète pour des solutions intégrées." },
  { title: "Innovation", description: "Adoption des dernières technologies pour rester à la pointe et为您提供 des solutions modernes." },
  { title: "Transparence", description: "Communication claire, reporting régulier et pas de surprises. Vous savez toujours où en est votre projet." },
  { title: "Résultats concrets", description: "Mon succès se mesure au vôtre. Objectifs clairs, ROI démontré et satisfaction client garantie." },
];

const team = [
  { name: "Kouassi Kouakou Harouna", role: "Fondateur & Développeur Full-Stack", icon: Rocket, description: "Freelance passionné, je conçois et développe des solutions digitales innovantes et sur-mesures pour transformer votre business. Expertise : React, Node.js, IA & Automatisation.", image: "founder" },
];

const timeline = [
  { year: "2024", title: "Création", description: "Fondation de Le Compagnon Virtuel avec une vision : démocratiser l'accès au digital de qualité en Afrique.", icon: "🚀", status: "completed" as const },
  { year: "2025", title: "Croissance", description: "100+ projets livrés, expansion des services et diversification vers l'IA et l'automatisation.", icon: "📈", status: "completed" as const },
  { year: "2026", title: "Innovation", description: "Lancement de solutions IA avancées, partenariats stratégiques et expansion régionale.", icon: "💡", status: "current" as const },
  { year: "2027", title: "Leadership", description: "Positionnement comme leader du digital en Afrique francophone et academy de formation.", icon: "👑", status: "vision" as const },
];

const About = () => {
  useDocumentMeta({
    title: "À propos — Notre équipe & histoire",
    description: "Découvrez Le Compagnon Virtuel : une équipe passionnée du digital en Côte d'Ivoire, 150+ projets livrés et 100% de satisfaction client.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">À propos</span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                  Une équipe passionnée <span className="gradient-text">à votre service</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Le Compagnon Virtuel, c'est avant tout une équipe de passionnés du digital qui croit en la puissance de la technologie pour transformer les entreprises.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div><AnimatedCounter target={150} suffix="+" /><div className="text-sm text-muted-foreground">Projets livrés</div></div>
                  <div><AnimatedCounter target={80} suffix="+" /><div className="text-sm text-muted-foreground">Clients satisfaits</div></div>
                  <div><AnimatedCounter target={100} suffix="%" /><div className="text-sm text-muted-foreground">Satisfaction</div></div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1">
                  <div className="w-full h-full rounded-[calc(1.5rem-4px)] bg-card flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto mb-6 shadow-glow">
                        <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-2">Le Compagnon <span className="text-destructive">Virtuel.</span></h3>
                      <p className="text-muted-foreground">Depuis 2020</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">L'Équipe</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Les talents derrière <span className="gradient-text">vos projets</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Une équipe pluridisciplinaire passionnée par l'innovation et l'excellence.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 text-center"
                >
                  {member.image === "founder" ? (
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-white">KH</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                        <Rocket size={12} className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <member.icon size={28} />
                    </div>
                  )}
                  <h3 className="font-display font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-xs font-medium text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Ces principes guident chacune de nos actions et chaque projet que nous réalisons.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><CheckCircle2 size={20} className="text-primary" /></div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Nos Partenaires & Certifications</h2>
              <p className="text-muted-foreground">Nous travaillons avec les meilleurs outils et plateformes du marché.</p>
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {["Google Partner", "Meta Business", "HubSpot", "Shopify", "Supabase", "Vercel"].map((partner, i) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="px-6 py-3 rounded-xl bg-muted/50 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
          <motion.div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }} />
          <div className="container-narrow">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Notre Parcours</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">Notre <span className="gradient-text">Histoire</span></h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Une aventure entrepreneuriale guidée par la passion du digital et l'ambition de transformer l'Afrique.</p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
              {timeline.map((item, index) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className={`relative flex items-start gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className={`absolute left-8 lg:left-1/2 -translate-x-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 transition-all duration-300 ${item.status === "current" ? "bg-gradient-to-br from-primary to-accent shadow-glow animate-pulse" : item.status === "vision" ? "bg-gradient-to-br from-accent/80 to-primary/80 border-2 border-dashed border-white/30" : "bg-card border-2 border-primary/50"}`}>
                    <span>{item.icon}</span>
                  </div>
                  <motion.div className={`flex-1 pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:pl-20"}`} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className={`p-6 rounded-2xl transition-all duration-300 ${item.status === "current" ? "bg-gradient-to-br from-primary/15 to-accent/10 border-2 border-primary/40 shadow-elevated" : item.status === "vision" ? "bg-gradient-to-br from-accent/10 to-primary/5 border border-dashed border-accent/40" : "bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30"}`}>
                      <div className={`flex items-center gap-3 mb-3 flex-wrap ${index % 2 === 0 ? "lg:justify-end" : ""}`}>
                        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${item.status === "current" ? "bg-primary text-primary-foreground" : item.status === "vision" ? "bg-accent/20 text-accent-foreground border border-accent/30" : "bg-muted text-muted-foreground"}`}>{item.year}</span>
                        {item.status === "completed" && <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1"><CheckCircle2 size={12} />Terminé</span>}
                        {item.status === "current" && <span className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/30 flex items-center gap-1"><Rocket size={12} />En cours</span>}
                        {item.status === "vision" && <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent-foreground border border-accent/30 flex items-center gap-1"><Award size={12} />Vision</span>}
                      </div>
                      <h3 className={`font-display font-bold text-xl mb-2 ${item.status === "current" ? "gradient-text" : item.status === "vision" ? "text-accent-foreground" : ""}`}>{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                <Rocket size={20} className="text-primary" />
                <span className="font-medium">Et ce n'est que le début de notre aventure...</span>
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

export default About;
