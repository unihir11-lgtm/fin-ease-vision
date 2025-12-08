import { Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/finease-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "IPO", href: "/ipo" },
    { name: "Bond", href: "/bonds" },
    { name: "FD", href: "/fds" },
    { name: "NPS", href: "/nps" },
    { name: "Calculators", href: "/calculators" },
    { name: "Screener", href: "https://www.thefinease.com/", external: true },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={logo} alt="FinEase" className="h-10 md:h-11 object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.external ? (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 text-muted-foreground text-sm font-semibold hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Search & Login */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-[240px] lg:w-[280px] h-10 px-4 bg-muted/40 rounded-lg border border-border/60 flex items-center gap-2.5 focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search IPO, Bonds, FDs..." 
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none" 
            />
          </div>

          <Link to="/auth" className="flex items-center gap-2 cursor-pointer group">
            <div className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/40 transition-all duration-200">
              <User className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors hidden xl:inline">Login</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 sm:px-6 pb-5 pt-2 border-b border-border bg-white animate-fade-in">
          <div className="w-full px-4 py-3 bg-muted/40 rounded-lg border border-border/60 flex items-center gap-3 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search IPO, Bonds, FDs..." 
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" 
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
                  className="flex items-center px-4 py-3 text-muted-foreground text-base font-semibold hover:bg-primary/5 rounded-xl transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
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