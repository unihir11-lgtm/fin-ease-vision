import { Menu, X, Search, User, TrendingUp, Landmark, Banknote, PiggyBank, Calculator } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/finease-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "IPO", href: "/ipo", icon: TrendingUp },
    { name: "Bond", href: "/bonds", icon: Landmark },
    { name: "FD", href: "/fds", icon: Banknote },
    { name: "NPS", href: "/dashboard/nps", icon: PiggyBank },
    { name: "Calculators", href: "/calculators", icon: Calculator },
    { name: "Screener", href: "https://www.thefinease.com/", external: true },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border/50">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-20 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FinEase" className="h-10 md:h-12 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <div className="w-[320px] lg:w-[380px] h-11 px-4 bg-muted/50 rounded-xl border border-border/60 flex items-center gap-3 focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search IPO, Bonds, FDs..." 
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-medium outline-none" 
            />
          </div>

          <Link to="/auth" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-200">
              <User className="w-5 h-5 text-primary" />
            </div>
            <span className="text-foreground text-sm font-semibold group-hover:text-primary transition-colors">Login</span>
          </Link>
        </div>

        <button 
          className="md:hidden text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex px-4 sm:px-6 lg:px-16 xl:px-20 py-2.5 justify-end items-center gap-1 border-t border-border/30 bg-muted/20">
        {navLinks.map((link) =>
          link.external ? (
            <a 
              key={link.name} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 text-muted-foreground text-sm font-semibold hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              {link.name}
            </a>
          ) : (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive(link.href) 
                  ? "text-primary bg-primary/8" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        )}
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 sm:px-6 pb-5 pt-2 border-b border-border bg-white animate-fade-in">
          <div className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border/60 flex items-center gap-3 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search IPO, Bonds, FDs..." 
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground font-medium outline-none" 
            />
          </div>
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) =>
              link.external ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-4 py-3 text-muted-foreground text-base font-semibold hover:bg-primary/5 rounded-xl transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.name}
                </Link>
              )
            )}
          </nav>
          <Link 
            to="/auth" 
            className="flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-bold text-base shadow-sm" 
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            Login / Sign up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;