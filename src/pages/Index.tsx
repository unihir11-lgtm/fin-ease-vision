import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
import Offerings from "@/components/Offerings";
import TrustBadges from "@/components/TrustBadges";
import AboutFinease from "@/components/AboutFinease";
import ServicesSections from "@/components/ServicesSections";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Tagline />
        <Offerings />
        <TrustBadges />
        <AboutFinease />
        <ServicesSections />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
