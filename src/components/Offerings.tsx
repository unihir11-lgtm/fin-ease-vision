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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary text-center font-['Raleway'] mb-12">
          Our offerings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className={`p-6 rounded-xl card-shadow bg-card hover:shadow-lg transition-shadow ${
                index >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${offering.color} flex items-center justify-center mb-4`}>
                <offering.icon className={`w-6 h-6 ${offering.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">{offering.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
