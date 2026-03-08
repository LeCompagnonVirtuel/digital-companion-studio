import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Euro, 
  Heart, 
  Zap, 
  Users, 
  Rocket,
  Coffee,
  Laptop,
  GraduationCap,
  ArrowRight,
  Send
} from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const benefits = [
  {
    icon: Laptop,
    title: "Full Remote",
    description: "Travaillez d'où vous voulez, quand vous voulez"
  },
  {
    icon: Clock,
    title: "Flexibilité",
    description: "Horaires adaptables selon votre rythme"
  },
  {
    icon: Euro,
    title: "Rémunération attractive",
    description: "Salaire compétitif + participation aux bénéfices"
  },
  {
    icon: GraduationCap,
    title: "Formation continue",
    description: "Budget formation illimité pour votre développement"
  },
  {
    icon: Coffee,
    title: "Équilibre vie pro/perso",
    description: "RTT, congés flexibles et respect de votre temps"
  },
  {
    icon: Rocket,
    title: "Projets stimulants",
    description: "Technologies de pointe et clients variés"
  }
];

const openPositions = [
  {
    id: 1,
    title: "Développeur Full-Stack Senior",
    department: "Technique",
    location: "Remote / Paris",
    type: "CDI",
    salary: "55-70K€",
    description: "Rejoignez notre équipe technique pour développer des solutions web innovantes avec React, Node.js et les dernières technologies cloud.",
    requirements: [
      "5+ ans d'expérience en développement web",
      "Maîtrise de React, TypeScript, Node.js",
      "Expérience avec les bases de données SQL/NoSQL",
      "Sensibilité UX/UI"
    ]
  },
  {
    id: 2,
    title: "Chef de Projet Digital",
    department: "Opérations",
    location: "Remote / Paris",
    type: "CDI",
    salary: "45-55K€",
    description: "Pilotez nos projets clients de A à Z, de la conception à la livraison, en garantissant qualité et satisfaction client.",
    requirements: [
      "3+ ans en gestion de projets digitaux",
      "Excellentes compétences en communication",
      "Maîtrise des méthodologies Agile/Scrum",
      "Connaissance du marketing digital"
    ]
  },
  {
    id: 3,
    title: "Expert SEO / SEA",
    department: "Marketing",
    location: "Remote / Paris",
    type: "CDI",
    salary: "40-50K€",
    description: "Développez et exécutez des stratégies d'acquisition performantes pour nos clients à travers le référencement naturel et payant.",
    requirements: [
      "3+ ans d'expérience en SEO/SEA",
      "Maîtrise de Google Ads, Analytics, Search Console",
      "Expérience en audit technique SEO",
      "Capacité à analyser et présenter les résultats"
    ]
  },
  {
    id: 4,
    title: "Designer UI/UX",
    department: "Créatif",
    location: "Remote / Paris",
    type: "CDI",
    salary: "42-52K€",
    description: "Créez des interfaces utilisateur exceptionnelles et des expériences digitales mémorables pour nos clients.",
    requirements: [
      "3+ ans en design UI/UX",
      "Maîtrise de Figma et des outils de prototypage",
      "Portfolio démontrant votre créativité",
      "Compréhension des contraintes techniques"
    ]
  }
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "On aime ce qu'on fait et ça se voit dans nos réalisations"
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "On vise toujours la meilleure solution possible"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "On réussit ensemble, jamais seul"
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "On explore constamment de nouvelles approches"
  }
];

const Careers = () => {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Briefcase size={16} />
                Rejoignez l'aventure
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Construisez le digital <span className="gradient-text">de demain</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Rejoignez une équipe passionnée où l'innovation, la créativité et le bien-être sont au cœur de tout ce que nous faisons.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#positions" className="group">
                    Voir les offres
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/about">
                    Découvrir notre culture
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ce qui nous anime au quotidien et guide chacune de nos décisions.
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
                  className="p-6 rounded-2xl bg-background border border-border text-center group hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Pourquoi nous rejoindre ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des avantages pensés pour votre épanouissement professionnel et personnel.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="section-padding bg-card">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Postes ouverts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trouvez le poste qui correspond à vos ambitions et vos compétences.
              </p>
            </motion.div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 lg:p-8 rounded-3xl bg-background border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {position.department}
                        </span>
                        <span className="text-xs text-muted-foreground">{position.type}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{position.title}</h3>
                      <p className="text-muted-foreground mb-4">{position.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Euro size={14} />
                          {position.salary}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Compétences requises :</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="lg:shrink-0">
                      <Button variant="hero" asChild>
                        <a href={`mailto:careers@lecompagnonvirtuel.fr?subject=Candidature : ${position.title}`} className="group">
                          <Send size={16} className="mr-2" />
                          Postuler
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spontaneous Application */}
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 rounded-3xl bg-foreground text-background text-center"
            >
              <h2 className="font-display font-bold text-2xl lg:text-3xl mb-4">
                Votre profil ne correspond pas aux offres actuelles ?
              </h2>
              <p className="text-background/70 mb-8 max-w-xl mx-auto">
                Nous sommes toujours à la recherche de talents passionnés. Envoyez-nous votre candidature spontanée !
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:careers@lecompagnonvirtuel.fr?subject=Candidature spontanée" className="group">
                  <Send size={18} className="mr-2" />
                  Candidature spontanée
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
