import { Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/finease-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "IPO", href: "#ipo" },
    { name: "Bond", href: "/bonds" },
    { name: "FD", href: "/fds" },
    { name: "NPS", href: "#nps" },
    { name: "Screener", href: "#screener" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Row */}
      <div className="px-6 lg:px-20 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="FinEase Logo" 
            className="h-10 md:h-12 object-contain"
          />
        </Link>

        {/* Search and Login - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div className="w-[400px] lg:w-[467px] h-[48px] px-4 py-1.5 bg-[#F5F5F5] rounded-md border border-[rgba(47,54,63,0.15)] flex items-center gap-2.5">
            <Search className="w-5 h-5 text-muted" />
            <input 
              type="text"
              placeholder="Search Stock, MF, IPO..."
              className="flex-1 bg-transparent text-muted placeholder:text-muted text-base font-medium outline-none"
            />
          </div>

          {/* Login Button */}
          <Link to="/auth" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-12 w-12 p-3 bg-[#E4FFFB] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-muted text-lg font-bold whitespace-nowrap">
              Login / Sign up
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-muted p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom Row - Navigation */}
      <nav className="hidden md:flex px-6 lg:px-20 py-2.5 justify-end items-center gap-8 border-t border-border/30">
        {navLinks.map((link) => (
          link.href.startsWith('#') ? (
            <a
              key={link.name}
              href={link.href}
              className="text-muted text-lg font-medium hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.href}
              className="text-muted text-lg font-medium hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          )
        ))}
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 border-b border-border bg-white animate-fade-in">
          {/* Mobile Search */}
          <div className="w-full px-4 py-3 bg-[#F5F5F5] rounded-md border border-[rgba(47,54,63,0.15)] flex items-center gap-2.5 mb-4">
            <Search className="w-5 h-5 text-muted" />
            <input 
              type="text"
              placeholder="Search Stock, MF, IPO..."
              className="flex-1 bg-transparent text-sm text-muted placeholder:text-muted font-medium outline-none"
            />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-3 mb-4">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Login */}
          <Link to="/auth" className="flex items-center gap-2 pt-3 border-t border-border/50" onClick={() => setIsMenuOpen(false)}>
            <div className="h-10 w-10 p-2 bg-[#E4FFFB] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-muted text-base font-bold">
              Login / Sign up
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
