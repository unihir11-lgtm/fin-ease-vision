import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
import Offerings from "@/components/Offerings";
import AboutFinease from "@/components/AboutFinease";
import ServicesSections from "@/components/ServicesSections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Tagline />
        <Offerings />
        <AboutFinease />
        <ServicesSections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
