import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { bondsData } from "@/data/bondData";
import { Search, ChevronRight, User } from "lucide-react";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBonds = bondsData.filter((bond) =>
    bond.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });

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
            <Link to="/bonds" className="text-primary font-medium">Bond</Link>
            <Link to="/fds" className="text-muted hover:text-primary font-medium">FD</Link>
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
        <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">Investment opportunities through Finease</h1>

        {/* Bonds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBonds.map((bond) => (
            <Link key={bond.id} to={`/bonds/${bond.id}`}>
              <div className="finease-card bg-white rounded-2xl p-6 hover:shadow-lg transition-all">
                <Badge className="bg-primary/10 text-primary mb-4">Maturity Date - {formatDate(bond.maturityDate)}</Badge>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl mb-3">{bond.logo}</div>
                <h3 className="text-lg font-bold text-secondary mb-4">{bond.issuer}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div><p className="text-muted">Rating</p><p className="font-bold">{bond.rating}</p></div>
                  <div><p className="text-muted">Coupon Rate</p><p className="font-bold">{bond.couponRate}%</p></div>
                  <div><p className="text-muted">Current Yield</p><p className="font-bold">{bond.currentYield}%</p></div>
                  <div><p className="text-muted">Min Investment Amount</p><p className="font-bold">₹{bond.minInvestment.toLocaleString()}</p></div>
                  <div><p className="text-muted">YTM</p><p className="font-bold">{bond.ytm}%</p></div>
                </div>
                <div className="flex justify-end">
                  <Button variant="link" className="text-primary gap-2">View More <ChevronRight className="w-4 h-4" /></Button>
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

export default Bonds;
