import { Shield, Award, Users, Clock } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.png";

const stats = [
  { icon: Users, value: "50K+", label: "Happy Investors" },
  { icon: Shield, value: "₹100Cr+", label: "Assets Managed" },
  { icon: Award, value: "4.8★", label: "User Rating" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const AboutFinease = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              About Us
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary font-display leading-tight">
              Why Choose FinEase?
            </h2>
            
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                FinEase simplifies wealth creation with a multi-asset investment platform offering opportunities in <span className="text-foreground font-medium">Equity, Mutual Fund, Bond, IPO, FD, Digital Gold, NPS, and Unlisted Shares</span>.
              </p>
              <p>
                We simplify investing by providing accessible, transparent analytics and financial information, empowering you to confidently navigate your financial journey and achieve lasting success.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border/50">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
            <img 
              src={aboutIllustration} 
              alt="About Finease illustration" 
              className="w-full max-w-sm md:max-w-md object-contain relative z-10 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinease;
