import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock, Headphones, RefreshCw, Lock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const content = {
  fr: {
    badge: "Garantie",
    title: "Achetez en toute",
    titleHighlight: "confiance",
    subtitle: "Nous croyons en la qualité de nos produits. C'est pourquoi nous offrons une garantie complète.",
    mainGuarantee: {
      title: "Garantie Satisfait ou Remboursé 30 Jours",
      description: "Si nos produits ne répondent pas à vos attentes, nous vous remboursons intégralement dans les 30 jours suivant votre achat. Aucune question posée, aucune condition cachée."
    },
    features: [
      {
        icon: RefreshCw,
        title: "Remboursement Simple",
        description: "Demandez votre remboursement par email ou WhatsApp, nous traitons votre demande sous 48h."
      },
      {
        icon: Clock,
        title: "Livraison Instantanée",
        description: "Accédez à vos produits immédiatement après le paiement, 24h/24 et 7j/7."
      },
      {
        icon: Headphones,
        title: "Support Premium",
        description: "Notre équipe vous accompagne dans l'utilisation de vos produits pour garantir votre succès."
      },
      {
        icon: Lock,
        title: "Paiement Sécurisé",
        description: "Vos données sont protégées par un cryptage SSL 256 bits. Partenaires certifiés PCI-DSS."
      }
    ]
  },
  en: {
    badge: "Guarantee",
    title: "Buy with complete",
    titleHighlight: "confidence",
    subtitle: "We believe in the quality of our products. That's why we offer a complete guarantee.",
    mainGuarantee: {
      title: "30-Day Money-Back Guarantee",
      description: "If our products don't meet your expectations, we'll refund you in full within 30 days of your purchase. No questions asked, no hidden conditions."
    },
    features: [
      {
        icon: RefreshCw,
        title: "Simple Refund",
        description: "Request your refund by email or WhatsApp, we process your request within 48 hours."
      },
      {
        icon: Clock,
        title: "Instant Delivery",
        description: "Access your products immediately after payment, 24/7."
      },
      {
        icon: Headphones,
        title: "Premium Support",
        description: "Our team supports you in using your products to ensure your success."
      },
      {
        icon: Lock,
        title: "Secure Payment",
        description: "Your data is protected by 256-bit SSL encryption. PCI-DSS certified partners."
      }
    ]
  }
};

export function GuaranteeSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-5 border border-emerald-500/20 shadow-sm"
          >
            <Shield size={14} />
            {t.badge}
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 md:mb-6 px-4">
            {t.title}{" "}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Guarantee Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20 p-6 md:p-8 text-center overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <Shield size={40} className="text-emerald-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t.mainGuarantee.title}</h3>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {t.mainGuarantee.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <div className="bg-card border border-border/60 rounded-xl p-6 h-full hover:border-primary/25 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={22} className="text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}