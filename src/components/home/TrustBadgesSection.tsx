import { motion } from "framer-motion";
import { Shield, Award, Clock, Headphones, CheckCircle, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function TrustBadgesSection() {
  const { t } = useLanguage();

  const badges = [
    { icon: Shield, titleKey: 'trust.satisfaction', descKey: 'trust.satisfaction_desc' },
    { icon: Clock, titleKey: 'trust.delivery', descKey: 'trust.delivery_desc' },
    { icon: Headphones, titleKey: 'trust.support', descKey: 'trust.support_desc' },
    { icon: Award, titleKey: 'trust.expertise', descKey: 'trust.expertise_desc' },
    { icon: CheckCircle, titleKey: 'trust.quality', descKey: 'trust.quality_desc' },
    { icon: Zap, titleKey: 'trust.tech', descKey: 'trust.tech_desc' },
  ];

  return (
    <section className="py-8 sm:py-12 border-y border-border/50 bg-gradient-to-r from-primary/[0.03] via-transparent to-accent/[0.03] overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Marquee-style scroll on mobile, grid on desktop */}
          <div className="hidden md:flex flex-wrap justify-center gap-8 lg:gap-12">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.titleKey}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-glow transition-all duration-400">
                  <badge.icon size={18} />
                </div>
                <div>
                  <div className="font-medium text-sm">{t(badge.titleKey)}</div>
                  <div className="text-xs text-muted-foreground">{t(badge.descKey)}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-6 overflow-x-auto pb-2 px-1 scrollbar-thin snap-x snap-mandatory">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.titleKey}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 shrink-0 snap-start"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center">
                  <badge.icon size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-xs whitespace-nowrap">{t(badge.titleKey)}</div>
                  <div className="text-[10px] text-muted-foreground whitespace-nowrap">{t(badge.descKey)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}