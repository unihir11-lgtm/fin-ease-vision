import { Link, useLocation } from "react-router-dom";
import { Search, User, Calculator, TrendingUp, Banknote, PiggyBank, Landmark, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

interface ProductLayoutProps {
  children: React.ReactNode;
}

const productNavLinks = [
  { name: "IPO", href: "/ipo", icon: TrendingUp },
  { name: "Bond", href: "/bonds", icon: Landmark },
  { name: "FD", href: "/fds", icon: Banknote },
  { name: "NPS", href: "/dashboard/nps", icon: PiggyBank },
  { name: "Calculators", href: "/calculators", icon: Calculator },
];

const ProductLayout = ({ children }: ProductLayoutProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isActive = (href: string) => {
    if (href === "/calculators") return location.pathname === "/calculators";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Primary Header */}
      <header className="bg-white/98 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-16 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FinEase" className="h-10 md:h-12" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search IPO, Bonds, FDs..."
                className="pl-10 h-11 bg-muted/50 border-border/60 focus:border-primary/40 focus:bg-white rounded-xl transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/" className="text-muted-foreground hover:text-primary font-semibold text-sm transition-colors">
              Home
            </Link>
            <Link to="/auth" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 transition-all duration-200">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Secondary Navigation - Product Tabs */}
        <nav className="hidden md:block bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-16">
            <div className="flex items-center justify-center gap-1">
              {productNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all duration-200
                      ${active 
                        ? "text-white bg-white/15" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-5 pt-2 bg-white border-t border-border/30 animate-fade-in">
            {/* Mobile Search */}
            <div className="relative my-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search IPO, Bonds, FDs..."
                className="pl-10 h-11 bg-muted/50 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1">
              {productNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
                      ${active 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted/50"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-border/50 flex gap-3">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 py-3 text-center rounded-xl border border-border text-foreground font-semibold hover:bg-muted/50 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/auth" 
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 py-3 text-center rounded-xl bg-primary text-white font-semibold shadow-sm"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ProductLayout;