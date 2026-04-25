import { motion } from "framer-motion";
import { Search, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLanguage } from "@/hooks/useLanguage";
import { GlowingOrb } from "@/components/animations/GlowingOrb";

const faqCategories = [
  {
    id: "general",
    labelKey: "faq.cat.general",
    faqs: [
      { questionKey: "faq.general.q1", answerKey: "faq.general.a1" },
      { questionKey: "faq.general.q2", answerKey: "faq.general.a2" },
      { questionKey: "faq.general.q3", answerKey: "faq.general.a3" },
      { questionKey: "faq.general.q4", answerKey: "faq.general.a4" },
    ],
  },
  {
    id: "pricing",
    labelKey: "faq.cat.pricing",
    faqs: [
      { questionKey: "faq.pricing.q1", answerKey: "faq.pricing.a1" },
      { questionKey: "faq.pricing.q2", answerKey: "faq.pricing.a2" },
      { questionKey: "faq.pricing.q3", answerKey: "faq.pricing.a3" },
      { questionKey: "faq.pricing.q4", answerKey: "faq.pricing.a4" },
    ],
  },
  {
    id: "technical",
    labelKey: "faq.cat.technical",
    faqs: [
      { questionKey: "faq.technical.q1", answerKey: "faq.technical.a1" },
      { questionKey: "faq.technical.q2", answerKey: "faq.technical.a2" },
      { questionKey: "faq.technical.q3", answerKey: "faq.technical.a3" },
    ],
  },
  {
    id: "support",
    labelKey: "faq.cat.support",
    faqs: [
      { questionKey: "faq.support.q1", answerKey: "faq.support.a1" },
      { questionKey: "faq.support.q2", answerKey: "faq.support.a2" },
      { questionKey: "faq.support.q3", answerKey: "faq.support.a3" },
    ],
  },
];

const FAQ = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  useDocumentMeta({
    title: t("faq.meta.title"),
    description: t("faq.meta.description"),
  });

  const filteredCategories = searchQuery.trim()
    ? faqCategories.map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (faq) =>
            t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
            t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.faqs.length > 0)
    : faqCategories.filter((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <GlowingOrb color="primary" size="400px" className="top-10 right-[10%] -z-10" duration={10} />
          <GlowingOrb color="accent" size="300px" className="bottom-0 left-[5%] -z-10" duration={14} />

          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <HelpCircle size={14} />
                {t("faq.badge")}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                {t("faq.hero.title")} <span className="gradient-text">{t("faq.hero.title_highlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("faq.hero.subtitle")}
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("faq.search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-6 rounded-full text-base bg-card border-border/50 shadow-card"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Tabs + FAQ Content */}
        <section className="section-padding">
          <div className="container-narrow">
            {/* Category Tabs */}
            {!searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2 mb-12"
              >
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(cat.labelKey)}
                  </button>
                ))}
              </motion.div>
            )}

            {/* FAQ Items */}
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {searchQuery.trim() && (
                  <h3 className="font-display font-semibold text-lg mb-4 text-primary">{t(cat.labelKey)}</h3>
                )}
                <Accordion type="single" collapsible className="space-y-3 mb-8">
                  {cat.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${cat.id}-${index}`}
                      className="border border-border rounded-2xl px-6 bg-card hover:border-primary/20 transition-colors"
                    >
                      <AccordionTrigger className="font-display font-semibold text-left hover:no-underline py-5">
                        {t(faq.questionKey)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {t(faq.answerKey)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <HelpCircle size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-lg mb-2">{t("faq.no_results")}</p>
                <p className="text-sm text-muted-foreground">{t("faq.no_results_hint")}</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle size={40} className="mx-auto text-primary mb-4" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">{t("faq.cta.title")}</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{t("faq.cta.subtitle")}</p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="group">
                  {t("faq.cta.button")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
