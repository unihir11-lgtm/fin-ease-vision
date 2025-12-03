const stats = [
  { value: "$2B+", label: "Assets Under Management", description: "Trusted with billions" },
  { value: "50K+", label: "Active Users", description: "Growing community" },
  { value: "99.9%", label: "Uptime", description: "Always available" },
  { value: "4.9", label: "App Rating", description: "Loved by users" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-muted/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2 transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-foreground/70 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-foreground/40">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
