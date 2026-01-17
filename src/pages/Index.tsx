import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";
import { ShopSection } from "@/components/home/ShopSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBadgesSection />
        <StatsSection />
        <ServicesSection />
        <ShopSection />
        <ProcessSection />
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <AboutSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
