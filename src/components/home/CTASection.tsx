import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div 
            className="absolute inset-0 -z-10"
            style={{ background: "var(--gradient-dark)" }}
          />
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/40 rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-background mb-6">
                Prêt à transformer{" "}
                <span className="text-primary">votre digital ?</span>
              </h2>
              <p className="text-lg text-background/70 max-w-2xl mx-auto mb-10">
                Discutons de votre projet. Audit gratuit et sans engagement pour identifier vos opportunités de croissance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact" className="group">
                    Demander un audit gratuit
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  variant="glass" 
                  size="xl" 
                  asChild
                  className="border-background/20 text-background hover:bg-background/10"
                >
                  <Link to="/contact">
                    <MessageCircle size={20} className="mr-2" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
