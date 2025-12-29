import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "CEO, TechStartup",
    content: "Le Compagnon Virtuel a transformé notre présence digitale. Leur expertise et leur réactivité sont exceptionnelles. Notre taux de conversion a augmenté de 150% en 3 mois.",
    rating: 5,
    avatar: "MD",
  },
  {
    name: "Jean-Pierre Martin",
    role: "Directeur Commercial, InnovatePME",
    content: "Une équipe à l'écoute qui comprend vraiment les enjeux business. Notre site e-commerce génère maintenant 40% de notre chiffre d'affaires.",
    rating: 5,
    avatar: "JM",
  },
  {
    name: "Sophie Laurent",
    role: "Fondatrice, BioCosmetics",
    content: "Professionnalisme, créativité et résultats concrets. Ils ont su capturer l'essence de notre marque et la traduire en une expérience digitale unique.",
    rating: 5,
    avatar: "SL",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
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
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Ils nous font{" "}
            <span className="gradient-text">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de notre collaboration.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-500 h-full">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                  <Quote size={20} className="text-primary-foreground" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
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
