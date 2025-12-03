import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Percent } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-32 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-8 lg:py-12">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-5 lg:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>India's Trusted Investment Platform</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-extrabold leading-tight font-['Raleway']">
              Your Digital <span className="text-primary">Wealth Mall</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-[24px] font-medium leading-snug text-white/90">
              Diversify Assets, Multiply Opportunities,<br className="hidden sm:block" />
              Grow Your Wealth
            </h2>
            
            <ul className="space-y-3 text-sm md:text-base text-white/90">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                IPOs, Bonds, FDs & NPS in one platform
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                SEBI & RBI compliant investments
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Percent className="w-4 h-4" />
                </div>
                Earn up to 9.10% on Fixed Deposits
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Investing <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/calculators">
                <Button variant="heroOutline" size="lg">
                  Try Calculators
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold">50K+</p>
                <p className="text-sm text-white/70">Active Users</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">₹100Cr+</p>
                <p className="text-sm text-white/70">AUM</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">4.8★</p>
                <p className="text-sm text-white/70">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <img 
              src={heroIllustration} 
              alt="Investment illustration" 
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl animate-float"
            />
            {/* Floating Cards */}
            <div className="absolute top-4 left-0 bg-white rounded-xl p-3 shadow-lg animate-fade-in hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">IPO Returns</p>
                  <p className="text-sm font-bold text-green-600">+45.2%</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-0 bg-white rounded-xl p-3 shadow-lg animate-fade-in hidden lg:block" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">FD Interest</p>
                  <p className="text-sm font-bold text-primary">9.10% p.a.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
