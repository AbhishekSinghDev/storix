import CtaSection from "@/components/landing-page/cta-section";
import FaqSection from "@/components/landing-page/faq-section";
import FeaturesSection from "@/components/landing-page/features-section";
import HeroSection from "@/components/landing-page/hero-section";
import HowItWorksSection from "@/components/landing-page/how-it-works-section";

const LandingPageComponents = () => {
  return (
    <main className="flex-1 mx-auto max-w-screen-xl">
      <HeroSection />
      {/* <LogosSection /> */}
      <FeaturesSection />
      <HowItWorksSection />
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      <FaqSection />
      <CtaSection />
    </main>
  );
};

export default LandingPageComponents;
