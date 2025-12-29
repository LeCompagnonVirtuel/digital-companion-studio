import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Échange & Découverte",
    description: "Nous analysons vos besoins, objectifs et contraintes lors d'un premier échange approfondi.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Stratégie & Conception",
    description: "Nous élaborons une stratégie sur-mesure et concevons les solutions adaptées à vos enjeux.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Développement",
    description: "Notre équipe donne vie à votre projet avec les technologies les plus performantes.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement & Suivi",
    description: "Mise en production, formation et accompagnement continu pour garantir votre succès.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Notre Méthode
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Un processus{" "}
            <span className="gradient-text">éprouvé</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une méthodologie claire et transparente pour des projets réussis.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <step.icon size={28} />
                  </div>

                  <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-primary/50">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
