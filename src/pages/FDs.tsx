import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fdProviders } from "@/data/fdData";
import { Search, ChevronRight, User } from "lucide-react";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

const FDs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFDs = fdProviders.filter((fd) =>
    fd.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/"><img src={logo} alt="FinEase" className="h-10" /></Link>
          <div className="hidden md:flex relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input placeholder="Search Stock, MF, IPO..." className="pl-10 bg-gray-50" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/ipo" className="text-muted hover:text-primary font-medium">IPO</Link>
            <Link to="/bonds" className="text-muted hover:text-primary font-medium">Bond</Link>
            <Link to="/fds" className="text-primary font-medium">FD</Link>
            <Link to="/dashboard/nps" className="text-muted hover:text-primary font-medium">NPS</Link>
            <a href="https://www.thefinease.com/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary font-medium">Screener</a>
          </nav>
          <Link to="/auth" className="flex items-center gap-2">
            <div className="h-10 w-10 p-2 bg-[#E4FFFB] rounded-full flex items-center justify-center"><User className="w-5 h-5 text-secondary" /></div>
            <span className="hidden md:block text-muted font-bold">Login / Sign up</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-muted mb-2">High returns, maximum security!</p>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Earn upto 9.10% annually</h1>
          <p className="text-muted">Invest with confidence in FDs insured by DICGC insured upto ₹5 lakh</p>
        </div>

        {/* FD Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`}>
              <div className="finease-card bg-white rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4">{fd.logo}</div>
                <h3 className="text-lg font-bold text-secondary mb-1">{fd.bankName}</h3>
                <p className="text-sm text-muted mb-4">Insured Upto ₹5L</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted">Upto</p>
                    <p className="text-2xl font-bold text-primary">{fd.interestRate}% <span className="text-sm font-normal">p.a</span></p>
                    <p className="text-sm text-muted">Tenure {fd.maxTenure}</p>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full"><ChevronRight className="w-5 h-5" /></Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FDs;
