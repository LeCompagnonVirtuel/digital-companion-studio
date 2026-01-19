import { motion } from "framer-motion";
import { HelpCircle, Shield, Clock, CreditCard, Headphones, Download, RefreshCw, Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";

const faqData = {
  fr: [
    {
      icon: Shield,
      question: "Quelle garantie offrez-vous sur vos produits digitaux ?",
      answer: "Nous offrons une garantie satisfait ou remboursé de 30 jours sur tous nos produits digitaux. Si le produit ne répond pas à vos attentes, nous vous remboursons intégralement, sans questions.",
      category: "garantie"
    },
    {
      icon: Download,
      question: "Comment accéder à mes produits après l'achat ?",
      answer: "Dès que votre paiement est confirmé, vous recevez automatiquement un email avec votre lien de téléchargement. Vous pouvez également accéder à vos produits depuis votre espace client à tout moment.",
      category: "livraison"
    },
    {
      icon: CreditCard,
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par Mobile Money (Orange Money, MTN, Wave, Moov) pour l'Afrique, ainsi que les cartes bancaires (Visa, Mastercard) et PayPal pour l'international.",
      category: "paiement"
    },
    {
      icon: Clock,
      question: "Combien de temps faut-il pour recevoir mes produits ?",
      answer: "La livraison est instantanée ! Dès confirmation de votre paiement, vous recevez votre produit par email. Pour Mobile Money, cela prend généralement moins de 5 minutes.",
      category: "livraison"
    },
    {
      icon: Headphones,
      question: "Proposez-vous un support après l'achat ?",
      answer: "Absolument ! Notre équipe est disponible 7j/7 par email, WhatsApp et chat en direct. Nous vous accompagnons dans l'utilisation de nos produits pour garantir votre réussite.",
      category: "support"
    },
    {
      icon: RefreshCw,
      question: "Puis-je modifier ou annuler ma commande ?",
      answer: "Une fois le paiement effectué, les produits digitaux sont livrés immédiatement. Vous pouvez cependant demander un remboursement dans les 30 jours si le produit ne vous convient pas.",
      category: "commande"
    },
    {
      icon: Globe,
      question: "Vos produits sont-ils adaptés au marché africain ?",
      answer: "Oui ! Nos produits sont spécialement conçus pour répondre aux besoins des entrepreneurs africains et internationaux. Les templates, guides et formations sont adaptés aux réalités locales tout en suivant les standards internationaux.",
      category: "produit"
    },
    {
      icon: Shield,
      question: "Mes données sont-elles sécurisées ?",
      answer: "Votre sécurité est notre priorité. Nous utilisons un cryptage SSL 256 bits et nos partenaires de paiement (Money Fusion, Stripe) sont certifiés PCI-DSS. Vos données ne sont jamais partagées.",
      category: "sécurité"
    }
  ],
  en: [
    {
      icon: Shield,
      question: "What guarantee do you offer on your digital products?",
      answer: "We offer a 30-day money-back guarantee on all our digital products. If the product doesn't meet your expectations, we'll refund you in full, no questions asked.",
      category: "guarantee"
    },
    {
      icon: Download,
      question: "How do I access my products after purchase?",
      answer: "As soon as your payment is confirmed, you'll automatically receive an email with your download link. You can also access your products from your customer area at any time.",
      category: "delivery"
    },
    {
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer: "We accept Mobile Money payments (Orange Money, MTN, Wave, Moov) for Africa, as well as credit cards (Visa, Mastercard) and PayPal for international customers.",
      category: "payment"
    },
    {
      icon: Clock,
      question: "How long does it take to receive my products?",
      answer: "Delivery is instant! As soon as your payment is confirmed, you receive your product by email. For Mobile Money, it usually takes less than 5 minutes.",
      category: "delivery"
    },
    {
      icon: Headphones,
      question: "Do you offer post-purchase support?",
      answer: "Absolutely! Our team is available 7 days a week via email, WhatsApp, and live chat. We support you in using our products to ensure your success.",
      category: "support"
    },
    {
      icon: RefreshCw,
      question: "Can I modify or cancel my order?",
      answer: "Once payment is made, digital products are delivered immediately. However, you can request a refund within 30 days if the product doesn't suit you.",
      category: "order"
    },
    {
      icon: Globe,
      question: "Are your products adapted to the African market?",
      answer: "Yes! Our products are specially designed to meet the needs of African and international entrepreneurs. Templates, guides, and training are adapted to local realities while following international standards.",
      category: "product"
    },
    {
      icon: Shield,
      question: "Is my data secure?",
      answer: "Your security is our priority. We use 256-bit SSL encryption and our payment partners (Money Fusion, Stripe) are PCI-DSS certified. Your data is never shared.",
      category: "security"
    }
  ]
};

const content = {
  fr: {
    badge: "FAQ",
    title: "Questions",
    titleHighlight: "Fréquentes",
    subtitle: "Trouvez rapidement les réponses à vos questions. Notre équipe est également disponible pour vous accompagner."
  },
  en: {
    badge: "FAQ",
    title: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle: "Quickly find answers to your questions. Our team is also available to assist you."
  }
};

export function FAQSection() {
  const { language } = useLanguage();
  const faqs = faqData[language];
  const t = content[language];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-5 border border-primary/15 shadow-sm"
          >
            <HelpCircle size={14} />
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

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/60 rounded-xl px-6 hover:border-primary/25 transition-colors data-[state=open]:border-primary/40 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <faq.icon size={18} className="text-primary" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-14 pr-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}