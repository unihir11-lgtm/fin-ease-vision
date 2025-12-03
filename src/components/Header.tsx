import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "IPO", href: "#ipo" },
    { name: "Bond", href: "#bond" },
    { name: "FD", href: "#fd" },
    { name: "NPS", href: "#nps" },
    { name: "Screener", href: "#screener" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/30">
      {/* Top Row */}
      <div className="px-6 lg:px-20 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img 
            src="https://placehold.co/148x54" 
            alt="FinEase Logo" 
            className="w-[148px] h-[54px] object-contain"
          />
        </a>

        {/* Search and Login - Desktop */}
        <div className="hidden md:flex items-center gap-[30px]">
          {/* Search Bar */}
          <div className="w-[467px] h-[52px] px-4 py-1.5 bg-[#F5F5F5] rounded-md border border-[rgba(47,54,63,0.15)] flex items-center gap-2.5">
            <Search className="w-6 h-6 text-[#707070]" />
            <span className="text-[#707070] text-base font-medium opacity-80">
              Search Stock, MF, IPO...
            </span>
          </div>

          {/* Login Button */}
          <div className="flex items-center gap-2">
            <div className="h-[52px] p-[13px] bg-[#E4FFFB] rounded-full flex items-center justify-center">
              <User className="w-[26px] h-[26px] text-[#266985]" />
            </div>
            <span className="text-[#707070] text-lg font-bold">
              Login / Sign up
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#707070]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom Row - Navigation */}
      <nav className="hidden md:flex px-6 lg:px-20 py-2.5 justify-end items-center gap-[30px] border-b border-border/30">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[#707070] text-xl font-medium hover:text-primary transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 border-b border-border animate-fade-in">
          {/* Mobile Search */}
          <div className="w-full px-4 py-3 bg-[#F5F5F5] rounded-md border border-[rgba(47,54,63,0.15)] flex items-center gap-2.5 mb-4">
            <Search className="w-5 h-5 text-[#707070]" />
            <span className="text-[#707070] text-sm font-medium opacity-80">
              Search Stock, MF, IPO...
            </span>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-3 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#707070] text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Login */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            <div className="h-10 w-10 p-2 bg-[#E4FFFB] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#266985]" />
            </div>
            <span className="text-[#707070] text-base font-bold">
              Login / Sign up
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
