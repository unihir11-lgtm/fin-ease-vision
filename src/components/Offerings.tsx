import { Link } from "react-router-dom";
import { TrendingUp, Landmark, Banknote, PiggyBank, Calculator, ArrowRight, Sparkles } from "lucide-react";

const offerings = [
  {
    icon: TrendingUp,
    title: "IPO",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey.",
    iconBg: "bg-[hsl(var(--icon-teal))]",
    iconColor: "text-primary",
    href: "/ipo",
    stats: "5+ Open IPOs",
    badge: "Popular",
  },
  {
    icon: Landmark,
    title: "Bonds",
    description: "Secure, fixed-income investments with predictable returns. Diversify your portfolio with AAA-rated bonds.",
    iconBg: "bg-[hsl(var(--icon-orange))]",
    iconColor: "text-orange-500",
    href: "/bonds",
    stats: "Up to 9.5% Yield",
    badge: null,
  },
  {
    icon: Banknote,
    title: "Fixed Deposits",
    description: "DICGC insured FDs from trusted banks and NBFCs. Earn up to 9.10% with complete safety.",
    iconBg: "bg-[hsl(var(--icon-blue))]",
    iconColor: "text-blue-500",
    href: "/fds",
    stats: "Up to 9.10% p.a.",
    badge: "Trending",
  },
  {
    icon: PiggyBank,
    title: "NPS",
    description: "Plan your retirement with National Pension System. Tax benefits under Section 80C and 80CCD.",
    iconBg: "bg-[hsl(var(--icon-purple))]",
    iconColor: "text-purple-500",
    href: "/dashboard/nps",
    stats: "Tax Savings",
    badge: null,
  },
  {
    icon: Calculator,
    title: "Calculators",
    description: "Plan your investments with our FD, SIP, and Lumpsum calculators. Make informed financial decisions.",
    iconBg: "bg-[hsl(var(--icon-red))]",
    iconColor: "text-red-500",
    href: "/calculators",
    stats: "Free Tools",
    badge: null,
  },
];

const Offerings = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(168_40%_97%)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Investment Options
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary font-display mb-4">
            Our Investment Offerings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Access diverse investment options tailored to your financial goals. Start your wealth creation journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {offerings.map((offering, index) => (
            <Link
              key={offering.title}
              to={offering.href}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              {offering.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                  {offering.badge}
                </span>
              )}
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${offering.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <offering.icon className={`w-7 h-7 ${offering.iconColor}`} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                {offering.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {offering.description}
              </p>
              
              {/* Stats & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary/5 text-secondary">
                  {offering.stats}
                </span>
                <div className="flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
