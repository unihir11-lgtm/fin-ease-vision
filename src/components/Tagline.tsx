import { CheckCircle2 } from "lucide-react";

const features = [
  "SEBI & RBI Compliant",
  "Secure Investments",
  "Expert Support",
];

const Tagline = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 50,000+ Investors
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary font-display leading-tight">
            The Digital Wealth Mall for All Your Investments
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Seamlessly manage and track all your investments with cutting-edge technology and expert tools – empowering you to make informed decisions for a secure and prosperous financial future.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tagline;
