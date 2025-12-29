import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Award, Rocket, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import logoImage from "@/assets/logo.png";

const values = [
  {
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque projet, du détail technique à l'expérience utilisateur.",
  },
  {
    title: "Innovation",
    description: "Nous adoptons les dernières technologies et méthodologies pour rester à la pointe.",
  },
  {
    title: "Transparence",
    description: "Communication claire, reporting régulier et pas de surprises. Vous savez toujours où en est votre projet.",
  },
  {
    title: "Résultats",
    description: "Notre succès se mesure au vôtre. Nous sommes orientés objectifs et ROI.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Création",
    description: "Fondation de Le Compagnon Virtuel avec une vision : démocratiser l'accès au digital de qualité.",
  },
  {
    year: "2021",
    title: "Croissance",
    description: "50 premiers projets livrés, expansion de l'équipe et diversification des services.",
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Lancement de notre offre automatisation et IA pour accompagner la transformation digitale.",
  },
  {
    year: "2023",
    title: "Expansion",
    description: "100+ clients accompagnés, développement de notre méthodologie agile unique.",
  },
  {
    year: "2024",
    title: "Excellence",
    description: "150+ projets livrés, 100% satisfaction client et nouvelles ambitions pour l'avenir.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  À propos
                </span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                  Une équipe passionnée{" "}
                  <span className="gradient-text">à votre service</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Le Compagnon Virtuel, c'est avant tout une équipe de passionnés du digital qui croit en la puissance de la technologie pour transformer les entreprises.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="text-3xl font-display font-bold gradient-text">150+</div>
                    <div className="text-sm text-muted-foreground">Projets livrés</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold gradient-text">80+</div>
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
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1">
                  <div className="w-full h-full rounded-[calc(1.5rem-4px)] bg-card flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto mb-6 shadow-glow">
                        <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-2">Le Compagnon Virtuel</h3>
                      <p className="text-muted-foreground">Depuis 2020</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ces principes guident chacune de nos actions et chaque projet que nous réalisons.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Notre Histoire</h2>
              <p className="text-muted-foreground">Une aventure entrepreneuriale guidée par la passion du digital.</p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 lg:-translate-x-1/2 mt-1.5" />

                  {/* Content */}
                  <div className={`flex-1 pl-16 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
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

export default About;
