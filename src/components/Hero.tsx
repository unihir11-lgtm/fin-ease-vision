import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-muted/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/20 bg-card/50 backdrop-blur-sm animate-slide-up opacity-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-secondary/80">Trusted by 50,000+ users worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary animate-slide-up opacity-0 stagger-1">
              Simplify Your{" "}
              <span className="text-gradient">Financial</span>{" "}
              Journey
            </h1>

            {/* Description */}
            <p className="text-lg text-foreground/70 max-w-xl leading-relaxed animate-slide-up opacity-0 stagger-2">
              Take control of your finances with smart tools, real-time insights, and personalized recommendations. Experience the future of money management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up opacity-0 stagger-3">
              <Button variant="hero" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline">
                Watch Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-8 pt-8 animate-slide-up opacity-0 stagger-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                  <Shield className="w-5 h-5 text-muted" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">Bank-level</p>
                  <p className="text-xs text-foreground/50">Security</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">Instant</p>
                  <p className="text-xs text-foreground/50">Transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-muted" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">Smart</p>
                  <p className="text-xs text-foreground/50">Analytics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative lg:pl-8 animate-scale-in opacity-0 stagger-3">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-card-gradient rounded-3xl p-6 border border-border/50 card-shadow">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-foreground/50">Total Balance</p>
                    <p className="text-3xl font-bold text-secondary">$48,574.00</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20">
                    <TrendingUp className="w-4 h-4 text-muted" />
                    <span className="text-sm font-medium text-muted">+12.5%</span>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-40 mb-6 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md transition-all duration-500 hover:bg-primary"
                      style={{
                        height: `${height}%`,
                        background: i === 11 ? "hsl(var(--primary))" : "hsl(var(--muted) / 0.3)",
                      }}
                    />
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  {["Send", "Receive", "Invest"].map((action) => (
                    <button
                      key={action}
                      className="py-3 rounded-xl bg-background/50 border border-border/50 text-sm font-medium text-secondary hover:bg-background/80 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -top-6 -left-6 bg-card rounded-2xl p-4 border border-border/50 card-shadow animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-lg">💰</span>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50">Savings Goal</p>
                    <p className="text-sm font-semibold text-secondary">$12,000</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl p-4 border border-border/50 card-shadow animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
                    <span className="text-muted text-lg">📈</span>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50">This Month</p>
                    <p className="text-sm font-semibold text-muted">+$2,340</p>
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

export default Hero;
