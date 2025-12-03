import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-card-gradient border border-border/50 p-12 md:p-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-muted/10 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto">
              Join thousands of users who are already simplifying their financial lives with FinEase.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline">
                Schedule a Demo
              </Button>
            </div>

            <p className="mt-8 text-sm text-foreground/40">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
