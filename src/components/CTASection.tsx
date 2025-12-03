import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary to-primary/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Start Your Investment Journey
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight">
            Ready to Grow Your Wealth?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Join 50,000+ investors who trust FinEase for their investment needs. Start with as little as ₹100.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="gap-2 bg-white text-secondary hover:bg-white/90">
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/calculators">
              <Button variant="heroOutline" size="xl">
                Explore Products
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-white/50 pt-4">
            No hidden charges • Cancel anytime • SEBI registered
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
