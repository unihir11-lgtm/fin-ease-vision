import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.png";

const stats = [
  { icon: Users, value: "50K+", label: "Happy Investors", color: "from-primary/20 to-primary/5" },
  { icon: Shield, value: "₹100Cr+", label: "Assets Managed", color: "from-blue-500/20 to-blue-500/5" },
  { icon: Star, value: "4.8", label: "User Rating", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Clock, value: "24/7", label: "Support", color: "from-purple-500/20 to-purple-500/5" },
];

const features = [
  "SEBI & RBI compliant platform",
  "Bank-grade security encryption",
  "Instant KYC verification",
  "Dedicated relationship manager",
];

const AboutFinease = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-bold border border-primary/20">
              <Award className="w-4 h-4" />
              About Us
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-display leading-tight">
              Why Choose <span className="text-primary">FinEase</span>?
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                FinEase simplifies wealth creation with a multi-asset investment platform offering opportunities in <span className="text-foreground font-semibold">Equity, Mutual Fund, Bond, IPO, FD, Digital Gold, NPS, and Unlisted Shares</span>.
              </p>
              <p>
                We simplify investing by providing accessible, transparent analytics and financial information, empowering you to confidently navigate your financial journey and achieve lasting success.
              </p>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center p-5 rounded-2xl bg-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-full blur-3xl scale-150" />
            <div className="relative">
              <img 
                src={aboutIllustration} 
                alt="About Finease illustration" 
                className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain relative z-10 drop-shadow-2xl animate-float"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-border/50 animate-fade-in hidden md:block" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Trusted by</p>
                    <p className="text-lg font-bold text-secondary">50K+ Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinease;