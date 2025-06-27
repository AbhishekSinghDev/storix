import LandingPageComponents from "@/components/landing-page";
import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <LandingPageComponents />
      <Footer />
    </div>
  );
}
