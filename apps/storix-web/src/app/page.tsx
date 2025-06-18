import CtaSection from "@/components/landing-page/cta-section";
import FaqSection from "@/components/landing-page/faq-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/hero-section";
import HowItWorksSection from "@/components/landing-page/how-it-works-section";
import LogosSection from "@/components/landing-page/logos-section";
import PricingSection from "@/components/landing-page/pricing-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-screen-xl">
        {/* Hero Section */}
        <HeroSection />

        {/* Logos Section */}
        <LogosSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
