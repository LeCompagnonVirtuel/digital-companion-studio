import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "CEO, TechStartup",
    content: {
      fr: "Le Compagnon Virtuel a transformé notre présence digitale. Leur expertise et leur réactivité sont exceptionnelles. Notre taux de conversion a augmenté de 150% en 3 mois.",
      en: "Le Compagnon Virtuel transformed our digital presence. Their expertise and responsiveness are exceptional. Our conversion rate increased by 150% in 3 months."
    },
    rating: 5,
    avatar: "MD",
  },
  {
    name: "Jean-Pierre Martin",
    role: "Commercial Director, InnovatePME",
    content: {
      fr: "Une équipe à l'écoute qui comprend vraiment les enjeux business. Notre site e-commerce génère maintenant 40% de notre chiffre d'affaires.",
      en: "A team that truly listens and understands business challenges. Our e-commerce site now generates 40% of our revenue."
    },
    rating: 5,
    avatar: "JM",
  },
  {
    name: "Sophie Laurent",
    role: "Founder, BioCosmetics",
    content: {
      fr: "Professionnalisme, créativité et résultats concrets. Ils ont su capturer l'essence de notre marque et la traduire en une expérience digitale unique.",
      en: "Professionalism, creativity and concrete results. They captured the essence of our brand and translated it into a unique digital experience."
    },
    rating: 5,
    avatar: "SL",
  },
];

export function TestimonialsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background Decoration - Enhanced */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
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
            <Star size={14} className="fill-current" />
            {t('testimonials.badge')}
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 md:mb-6 px-4">
            {t('testimonials.title')}{" "}
            <span className="gradient-text">{t('testimonials.title_highlight')}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid - Enhanced */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/25 hover:shadow-elevated transition-all duration-500 h-full">
                {/* Quote Icon - Enhanced */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25">
                  <Quote size={20} className="text-primary-foreground" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
                  "{testimonial.content[language]}"
                </p>

                {/* Author - Enhanced */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
