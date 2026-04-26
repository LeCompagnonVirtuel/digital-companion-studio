import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";
import { useLanguage } from "@/hooks/useLanguage";
import { ParticleField } from "@/components/animations/ParticleField";

export function CTASection() {
  const { t } = useLanguage();

  const benefits = [
    t('cta.benefit.audit'),
    t('cta.benefit.recommendations'),
    t('cta.benefit.roadmap'),
    t('cta.benefit.no_commitment'),
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Enhanced Animated Background */}
          <div
            className="absolute inset-0 z-0"
            style={{ background: "var(--gradient-dark)" }}
          />
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/40 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/25 rounded-full blur-3xl" />
          </motion.div>

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Animated Particles */}
          <ParticleField count={18} className="z-0 opacity-60" />

          <div className="relative z-10 px-6 py-14 md:px-12 lg:px-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Content - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/25 text-primary-foreground text-sm font-medium mb-6 border border-primary/30"
                >
                  <Sparkles size={16} />
                  <span>{t('cta.badge')}</span>
                </motion.div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-5 md:mb-6 leading-tight">
                  {t('cta.title')}{" "}
                  <span className="text-primary">{t('cta.title_highlight')}</span>
                </h2>
                <p className="text-base md:text-lg text-white/75 mb-8 leading-relaxed">
                  {t('cta.subtitle')}
                </p>

                {/* Benefits List - Enhanced */}
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, i) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-white/85"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-accent" />
                      </div>
                      <span className="text-sm md:text-base">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="hero" size="xl" asChild className="shadow-premium">
                      <Link to="/demarrer-audit" className="group">
                        {t('cta.request_audit')}
                        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="glass" 
                      size="xl" 
                      asChild
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                    >
                      <Link to="/parlons-projet">
                        <MessageCircle size={18} className="mr-2" />
                        {t('cta.contact_us')}
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-8 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-elevated z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                        +200%
                      </div>
                      <div className="text-foreground text-sm">
                        <div className="font-semibold">{t('cta.conversion')}</div>
                        <div className="text-muted-foreground text-xs">{t('cta.avg_clients')}</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-8 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-elevated z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        24h
                      </div>
                      <div className="text-foreground text-sm">
                        <div className="font-semibold">{t('cta.fast_response')}</div>
                        <div className="text-muted-foreground text-xs">{t('cta.always_available')}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Element */}
                  <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border border-background/10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-background/20"
                    />
                    <div className="absolute w-20 h-20 rounded-2xl bg-background flex items-center justify-center shadow-elevated overflow-hidden">
                      <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
