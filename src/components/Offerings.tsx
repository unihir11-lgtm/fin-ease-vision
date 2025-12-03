import { TrendingUp, Heart, Banknote, PiggyBank, BarChart3 } from "lucide-react";

const offerings = [
  {
    icon: TrendingUp,
    title: "IPO",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey from day one.",
    color: "bg-[#E4FFFB]",
    iconColor: "text-primary",
  },
  {
    icon: Heart,
    title: "Bond",
    description: "Professionally managed mutual funds ensuring effective portfolio diversification across various sectors and asset classes.",
    color: "bg-[#FFF4E4]",
    iconColor: "text-[#F5A623]",
  },
  {
    icon: Banknote,
    title: "FD",
    description: "Invest directly in high-potential companies, capitalizing on growth opportunities and maximizing returns.",
    color: "bg-[#E4F4FF]",
    iconColor: "text-[#4A90D9]",
  },
  {
    icon: PiggyBank,
    title: "NPS",
    description: "Access exclusive opportunities to invest early in promising startups before their public listing, potentially multiplying wealth.",
    color: "bg-[#F4E4FF]",
    iconColor: "text-[#9B51E0]",
  },
  {
    icon: BarChart3,
    title: "Stock Analytics",
    description: "Access comprehensive stock financials and powerful tools to analyze, compare, and discover investment opportunities with ease.",
    color: "bg-[#FFE4E4]",
    iconColor: "text-[#E05151]",
  },
];

const Offerings = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold text-secondary text-center font-['Raleway'] mb-8 md:mb-12">
          Our offerings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="p-5 md:p-6 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-lg ${offering.color} flex items-center justify-center mb-4`}>
                <offering.icon className={`w-5 h-5 ${offering.iconColor}`} />
              </div>
              <h3 className="text-base md:text-lg font-bold text-secondary mb-2">{offering.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
