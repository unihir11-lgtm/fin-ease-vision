import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, HelpCircle, FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="text-center relative z-10 px-6">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-primary/60 font-['Raleway'] leading-none animate-fade-in">
              4
            </span>
            <div className="relative">
              <FileQuestion className="w-24 h-24 md:w-32 md:h-32 text-primary/80 animate-scale-in" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            </div>
            <span className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary/60 via-secondary to-primary font-['Raleway'] leading-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
              4
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4 font-['Raleway'] animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Page Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Link to="/">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground mb-4">Or explore these popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/ipo" className="text-sm text-primary hover:underline font-medium">IPO</Link>
            <span className="text-border">•</span>
            <Link to="/bonds" className="text-sm text-primary hover:underline font-medium">Bonds</Link>
            <span className="text-border">•</span>
            <Link to="/fds" className="text-sm text-primary hover:underline font-medium">Fixed Deposits</Link>
            <span className="text-border">•</span>
            <Link to="/nps" className="text-sm text-primary hover:underline font-medium">NPS</Link>
            <span className="text-border">•</span>
            <Link to="/dashboard" className="text-sm text-primary hover:underline font-medium">Dashboard</Link>
          </div>
        </div>
        
        {/* Support */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Link to="/dashboard/help" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <HelpCircle className="w-4 h-4" />
            Need help? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
