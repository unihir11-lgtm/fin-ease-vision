import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, TrendingUp, Users, Building } from "lucide-react";

const services = [
  {
    icon: Wallet,
    title: "Personal Banking",
    description: "Everyday banking made simple. Checking, savings, and money transfers with zero fees.",
    features: ["Free transfers", "No minimum balance", "Cashback rewards"],
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Investment Tools",
    description: "Build your wealth with smart portfolios, fractional shares, and automated investing.",
    features: ["Auto-invest", "Diversified portfolios", "Tax optimization"],
    color: "muted",
  },
  {
    icon: Users,
    title: "Family Plans",
    description: "Manage finances together. Shared accounts, allowances, and spending controls.",
    features: ["Joint accounts", "Kid-friendly cards", "Family budgets"],
    color: "primary",
  },
  {
    icon: Building,
    title: "Business Solutions",
    description: "Scale your business with expense management, invoicing, and team cards.",
    features: ["Multi-user access", "Expense tracking", "API integrations"],
    color: "muted",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-muted/10 text-muted text-sm font-medium mb-6">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Financial solutions for every need
            </h2>
          </div>
          <p className="text-foreground/60 max-w-md lg:text-right">
            Whether you're saving for the future, investing for growth, or managing a business, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-3xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  service.color === "primary"
                    ? "bg-gradient-to-br from-primary/5 to-transparent"
                    : "bg-gradient-to-br from-muted/5 to-transparent"
                }`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      service.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5 text-secondary" />
                  </Button>
                </div>

                <h3 className="text-2xl font-bold text-secondary mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-full bg-background/50 border border-border/50 text-xs font-medium text-foreground/70"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
