import { Shield, Lock, Award, CheckCircle } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "SEBI Registered",
    description: "Fully compliant with SEBI regulations",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "256-bit SSL encryption",
  },
  {
    icon: Award,
    title: "RBI Compliant",
    description: "Regulated financial services",
  },
  {
    icon: CheckCircle,
    title: "DICGC Insured",
    description: "FDs insured up to ₹5 lakh",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="text-center text-white/90">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm md:text-base mb-1">{badge.title}</h4>
              <p className="text-xs text-white/60">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
