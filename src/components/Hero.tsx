import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Percent, Building2 } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-32 bg-gradient-hero overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 lg:py-14">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-subtle" />
              <span>India's Trusted Investment Platform</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-[1.1] font-display tracking-tight">
              Your Digital <span className="text-primary">Wealth Mall</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white/85 max-w-lg">
              Diversify Assets, Multiply Opportunities, Grow Your Wealth
            </h2>
            
            <ul className="space-y-3.5 text-sm md:text-base text-white/85">
              <li className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
                IPOs, Bonds, FDs & NPS in one platform
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-4 h-4" />
                </div>
                SEBI & RBI compliant investments
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Percent className="w-4 h-4" />
                </div>
                Earn up to 9.10% on Fixed Deposits
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Investing <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/nps/register">
                <Button variant="heroOutline" size="lg" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Open NPS Account
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex gap-8 lg:gap-10 pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">50K+</p>
                <p className="text-sm text-white/60 font-medium">Active Users</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">₹100Cr+</p>
                <p className="text-sm text-white/60 font-medium">AUM</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">4.8★</p>
                <p className="text-sm text-white/60 font-medium">User Rating</p>
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
            <div className="absolute top-6 left-0 bg-white rounded-2xl p-4 shadow-xl animate-fade-in hidden lg:block border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">IPO Returns</p>
                  <p className="text-base font-bold text-green-600">+45.2%</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 right-0 bg-white rounded-2xl p-4 shadow-xl animate-fade-in hidden lg:block border border-border/50" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">FD Interest</p>
                  <p className="text-base font-bold text-primary">9.10% p.a.</p>
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