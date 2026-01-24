import { motion } from "framer-motion";
import { Shield, Award, Clock, Headphones, CheckCircle, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function TrustBadgesSection() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Shield,
      titleKey: 'trust.satisfaction',
      descKey: 'trust.satisfaction_desc',
    },
    {
      icon: Clock,
      titleKey: 'trust.delivery',
      descKey: 'trust.delivery_desc',
    },
    {
      icon: Headphones,
      titleKey: 'trust.support',
      descKey: 'trust.support_desc',
    },
    {
      icon: Award,
      titleKey: 'trust.expertise',
      descKey: 'trust.expertise_desc',
    },
    {
      icon: CheckCircle,
      titleKey: 'trust.quality',
      descKey: 'trust.quality_desc',
    },
    {
      icon: Zap,
      titleKey: 'trust.tech',
      descKey: 'trust.tech_desc',
    },
  ];

  return (
    <section className="py-12 border-y border-border bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-12"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <badge.icon size={20} />
              </div>
              <div>
                <div className="font-medium text-sm">{t(badge.titleKey)}</div>
                <div className="text-xs text-muted-foreground">{t(badge.descKey)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
