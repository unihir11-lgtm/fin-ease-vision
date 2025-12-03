import { Link } from "react-router-dom";
import { TrendingUp, Landmark, Banknote, PiggyBank, Calculator, ArrowRight } from "lucide-react";

const offerings = [
  {
    icon: TrendingUp,
    title: "IPO",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey.",
    color: "bg-[#E4FFFB]",
    iconColor: "text-primary",
    href: "/ipo",
    stats: "5+ Open IPOs",
  },
  {
    icon: Landmark,
    title: "Bonds",
    description: "Secure, fixed-income investments with predictable returns. Diversify your portfolio with AAA-rated bonds.",
    color: "bg-[#FFF4E4]",
    iconColor: "text-[#F5A623]",
    href: "/bonds",
    stats: "Up to 9.5% Yield",
  },
  {
    icon: Banknote,
    title: "Fixed Deposits",
    description: "DICGC insured FDs from trusted banks and NBFCs. Earn up to 9.10% with complete safety.",
    color: "bg-[#E4F4FF]",
    iconColor: "text-[#4A90D9]",
    href: "/fds",
    stats: "Up to 9.10% p.a.",
  },
  {
    icon: PiggyBank,
    title: "NPS",
    description: "Plan your retirement with National Pension System. Tax benefits under Section 80C and 80CCD.",
    color: "bg-[#F4E4FF]",
    iconColor: "text-[#9B51E0]",
    href: "/dashboard/nps",
    stats: "Tax Savings",
  },
  {
    icon: Calculator,
    title: "Calculators",
    description: "Plan your investments with our FD, SIP, and Lumpsum calculators. Make informed financial decisions.",
    color: "bg-[#FFE4E4]",
    iconColor: "text-[#E05151]",
    href: "/calculators",
    stats: "Free Tools",
  },
];

const Offerings = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold text-secondary font-['Raleway'] mb-3">
            Our Investment Offerings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access diverse investment options tailored to your financial goals. Start your wealth creation journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {offerings.map((offering) => (
            <Link
              key={offering.title}
              to={offering.href}
              className="group p-5 md:p-6 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${offering.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <offering.icon className={`w-6 h-6 ${offering.iconColor}`} />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/5 text-secondary">
                  {offering.stats}
                </span>
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                {offering.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {offering.description}
              </p>
              <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
