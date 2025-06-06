import CtaSection from "./cta-section";
import FaqsSection from "./faqs-section";
import FeaturesSection from "./features-section";
import HeroSection from "./hero-section";
import HowItWorksSection from "./how-it-works-section";
import LogosSection from "./logos-section";
import PricingSection from "./pricing-section";
import TestimonialsSection from "./testimonials-section";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqsSection />
      <CtaSection />
    </>
  );
};

export default LandingPage;
