import { CreditCard, PieChart, Bell, Smartphone, Lock, Repeat } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Smart Cards",
    description: "Virtual and physical cards with real-time spending controls and instant notifications.",
    color: "primary",
  },
  {
    icon: PieChart,
    title: "Analytics Dashboard",
    description: "Visualize your spending patterns with beautiful charts and actionable insights.",
    color: "muted",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Personalized notifications for bills, unusual activity, and savings opportunities.",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage everything on the go with our intuitive mobile app experience.",
    color: "muted",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "256-bit encryption, biometric auth, and real-time fraud protection.",
    color: "primary",
  },
  {
    icon: Repeat,
    title: "Auto Investments",
    description: "Set it and forget it. Automatic recurring investments to grow your wealth.",
    color: "muted",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-foreground/60 text-lg">
            Powerful tools designed to simplify your financial life and help you reach your goals faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/10 text-muted"
                }`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
