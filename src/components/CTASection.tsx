import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle, TrendingUp, Shield, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-secondary via-secondary to-primary/80 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold border border-white/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            Start Your Investment Journey
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Ready to Grow Your Wealth?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join 50,000+ investors who trust FinEase for their investment needs. Start with as little as ₹100.
          </p>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-white/70 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No hidden charges</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>SEBI registered</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>High returns</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/auth">
              <Button variant="hero" size="xl" className="gap-2 bg-white text-secondary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/calculators">
              <Button variant="heroOutline" size="xl" className="backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                Explore Products
              </Button>
            </Link>
          </div>
          
          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 pt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/60 border-2 border-white/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white/80" />
                </div>
              ))}
            </div>
            <p className="text-sm text-white/60">
              <span className="font-semibold text-white">50,000+</span> investors trust us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;