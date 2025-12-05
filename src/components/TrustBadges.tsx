import { Shield, Lock, Award, CheckCircle, BadgeCheck, Verified } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "SEBI Registered",
    description: "Fully compliant with SEBI regulations",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "256-bit SSL encryption",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: BadgeCheck,
    title: "RBI Compliant",
    description: "Regulated financial services",
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    icon: Verified,
    title: "DICGC Insured",
    description: "FDs insured up to ₹5 lakh",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-secondary to-secondary/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(168_72%_40%/0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-10">
          <p className="text-white/60 text-sm font-medium tracking-wider uppercase">Why Choose FinEase</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div 
              key={badge.title} 
              className="group text-center text-white/90 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <badge.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base mb-1.5">{badge.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
