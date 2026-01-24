import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code2, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      titleKey: 'process.step1.title',
      descKey: 'process.step1.desc',
    },
    {
      number: "02",
      icon: Lightbulb,
      titleKey: 'process.step2.title',
      descKey: 'process.step2.desc',
    },
    {
      number: "03",
      icon: Code2,
      titleKey: 'process.step3.title',
      descKey: 'process.step3.desc',
    },
    {
      number: "04",
      icon: Rocket,
      titleKey: 'process.step4.title',
      descKey: 'process.step4.desc',
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-wide">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-5 border border-primary/15 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t('process.badge')}
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 md:mb-6 px-4">
            {t('process.title')}{" "}
            <span className="gradient-text">{t('process.title_highlight')}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Process Steps - Enhanced */}
        <div className="relative">
          {/* Connection Line - Desktop - Enhanced */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-elevated transition-all duration-500 text-center h-full">
                  {/* Step Number - Enhanced */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground text-xs font-bold z-10 shadow-lg shadow-primary/30">
                    {step.number}
                  </div>

                  {/* Icon - Enhanced */}
                  <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-5 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-105 transition-all duration-400">
                    <step.icon size={28} className="md:w-8 md:h-8" />
                  </div>

                  <h3 className="font-display font-semibold text-lg md:text-xl mb-3">{t(step.titleKey)}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </div>

                {/* Arrow - Desktop - Enhanced */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-primary/60 z-10">
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
