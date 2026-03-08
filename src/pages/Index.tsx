import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

// Lazy load below-the-fold sections for performance
const ServicesSection = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const StatsSection = lazy(() => import("@/components/home/StatsSection").then(m => ({ default: m.StatsSection })));
const FeaturedProjectsSection = lazy(() => import("@/components/home/FeaturedProjectsSection").then(m => ({ default: m.FeaturedProjectsSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ShopSection = lazy(() => import("@/components/home/ShopSection").then(m => ({ default: m.ShopSection })));
const PricingSection = lazy(() => import("@/components/home/PricingSection").then(m => ({ default: m.PricingSection })));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection").then(m => ({ default: m.ProcessSection })));
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
    title: "Agence Digitale en Côte d'Ivoire",
    description: "Le Compagnon Virtuel — Sites web, marketing digital, automatisation IA et e-commerce pour entrepreneurs africains. Audit gratuit.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBadgesSection />
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ShopSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
