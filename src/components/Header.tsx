import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/finease-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border/50">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FinEase" className="h-10 md:h-12 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/nps" 
            className="text-primary text-base font-semibold hover:text-primary/80 transition-colors"
          >
            NPS
          </Link>
          
          <Link to="/auth" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/40 transition-all duration-200">
              <User className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">9773290902</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 sm:px-6 pb-5 pt-2 border-b border-border bg-white animate-fade-in">
          <nav className="flex flex-col gap-1 mb-4">
            <Link 
              to="/nps" 
              className="flex items-center gap-3 px-4 py-3 text-primary text-base font-semibold hover:bg-primary/5 rounded-xl transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              NPS
            </Link>
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