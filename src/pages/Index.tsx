import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const WelcomeSection = lazy(() => import("@/components/home/WelcomeSection").then(m => ({ default: m.WelcomeSection })));
const ServicesSection = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const StatsSection = lazy(() => import("@/components/home/StatsSection").then(m => ({ default: m.StatsSection })));
const FeaturedProjectsSection = lazy(() => import("@/components/home/FeaturedProjectsSection").then(m => ({ default: m.FeaturedProjectsSection })));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection").then(m => ({ default: m.ProcessSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const PricingSection = lazy(() => import("@/components/home/PricingSection").then(m => ({ default: m.PricingSection })));
const VideoShowcaseSection = lazy(() => import("@/components/home/VideoShowcaseSection").then(m => ({ default: m.VideoShowcaseSection })));
const PhilosophySection = lazy(() => import("@/components/home/PhilosophySection").then(m => ({ default: m.PhilosophySection })));
const EntrepreneurGuideSection = lazy(() => import("@/components/home/EntrepreneurGuideSection").then(m => ({ default: m.EntrepreneurGuideSection })));
const ShopSection = lazy(() => import("@/components/home/ShopSection").then(m => ({ default: m.ShopSection })));
const FAQSection = lazy(() => import("@/components/home/FAQSection").then(m => ({ default: m.FAQSection })));
const AboutSection = lazy(() => import("@/components/home/AboutSection").then(m => ({ default: m.AboutSection })));
const CTASection = lazy(() => import("@/components/home/CTASection").then(m => ({ default: m.CTASection })));

const SectionFallback = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useDocumentMeta({
    title: "Agence Digitale Premium en Côte d'Ivoire — Sites Web, Marketing & IA",
    description: "Le Compagnon Virtuel — Agence digitale à Abidjan. Sites web professionnels, marketing digital, automatisation IA et e-commerce pour entrepreneurs africains. Audit gratuit.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* 1. Accroche — Première impression forte */}
        <HeroSection />
        <TrustBadgesSection />

        {/* 2. Proposition de valeur — Qui sommes-nous et pourquoi nous */}
        <Suspense fallback={<SectionFallback />}>
          <WelcomeSection />
        </Suspense>

        {/* 3. Ce qu'on fait — Services et expertise */}
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>

        {/* 4. Preuve sociale — Chiffres qui rassurent */}
        <Suspense fallback={<SectionFallback />}>
          <StatsSection />
        </Suspense>

        {/* 5. Réalisations concrètes — Portfolio */}
        <Suspense fallback={<SectionFallback />}>
          <FeaturedProjectsSection />
        </Suspense>

        {/* 6. Ce qui nous différencie */}
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUsSection />
        </Suspense>

        {/* 7. Comment on travaille — Process clair */}
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>

        {/* 8. Témoignages — Confiance client */}
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>

        {/* 9. Tarifs — Conversion */}
        <Suspense fallback={<SectionFallback />}>
          <PricingSection />
        </Suspense>

        {/* 10. Vidéo — Engagement supplémentaire */}
        <Suspense fallback={<SectionFallback />}>
          <VideoShowcaseSection />
        </Suspense>

        {/* 11. Philosophie & valeurs */}
        <Suspense fallback={<SectionFallback />}>
          <PhilosophySection />
        </Suspense>

        {/* 12. Contenu à valeur ajoutée */}
        <Suspense fallback={<SectionFallback />}>
          <EntrepreneurGuideSection />
        </Suspense>

        {/* 13. Boutique */}
        <Suspense fallback={<SectionFallback />}>
          <ShopSection />
        </Suspense>

        {/* 14. FAQ — Lever les derniers doutes */}
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>

        {/* 15. À propos — Humaniser la marque */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        {/* 16. CTA final — Dernier push */}
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
