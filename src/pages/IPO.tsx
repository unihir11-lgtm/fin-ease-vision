import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ipoData } from "@/data/ipoData";
import { Search, Clock, Calendar, ChevronRight, User } from "lucide-react";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

const IPO = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Open");
  const [boardFilter, setBoardFilter] = useState("SME");
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  const filteredIPOs = ipoData.filter((ipo) => {
    const matchesSearch = ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = ipo.status === statusFilter;
    const matchesBoard = boardFilter === "all" || ipo.type === boardFilter;
    return matchesSearch && matchesStatus && matchesBoard;
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns: { [key: string]: string } = {};
      ipoData.forEach((ipo) => {
        if (ipo.status === "Open") {
          const endDate = new Date(ipo.bidDates.end + "T23:59:59");
          const now = new Date();
          const diff = endDate.getTime() - now.getTime();
          
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            newCountdowns[ipo.id] = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          } else {
            newCountdowns[ipo.id] = "Closed";
          }
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="FinEase" className="h-10" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Search IPO..."
                className="pl-10 bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted hover:text-primary font-medium">Home</Link>
            <Link to="/ipo/status" className="text-primary font-medium">IPO Status</Link>
          </nav>

          <Link to="/auth" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              RS
            </div>
            <span className="hidden md:block font-medium text-secondary">Rajesh Shah</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          IPO - Initial Public Offerings
        </h1>

        {/* Status Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="Open" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Open IPOs
            </TabsTrigger>
            <TabsTrigger value="Upcoming" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Upcoming IPOs
            </TabsTrigger>
            <TabsTrigger value="Closed" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Closed IPOs
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Board Filter */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setBoardFilter("Main Board")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              boardFilter === "Main Board"
                ? "text-primary border-b-2 border-primary"
                : "text-muted hover:text-primary"
            }`}
          >
            Main Board
          </button>
          <button
            onClick={() => setBoardFilter("SME")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              boardFilter === "SME"
                ? "text-primary border-b-2 border-primary"
                : "text-muted hover:text-primary"
            }`}
          >
            SME
          </button>
        </div>

        {/* IPO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIPOs.map((ipo) => (
            <div
              key={ipo.id}
              className="finease-card bg-white rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                    {ipo.logo}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">{ipo.type}</Badge>
                    <h3 className="font-bold text-secondary text-sm">{ipo.companyShortName}</h3>
                  </div>
                </div>
                {ipo.status === "Open" && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{countdowns[ipo.id] || "00:00:00"}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(ipo.bidDates.start)} - {formatDate(ipo.bidDates.end)}</span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted">Min Investment Amount</p>
                <p className="font-semibold text-secondary">₹{ipo.minInvestment.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-secondary">
                    ₹ {ipo.priceRange.min}-{ipo.priceRange.max}
                  </span>
                </div>
                <Link to={`/ipo/${ipo.id}`}>
                  <Button className="finease-btn">
                    {ipo.status === "Open" ? "Apply" : ipo.status === "Upcoming" ? "Notify Me" : "View Details"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredIPOs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No IPOs found for the selected filters.</p>
          </div>
        )}

        {/* Compliance Disclaimer */}
        <div className="mt-12 p-6 bg-gray-100 rounded-xl">
          <h3 className="font-bold text-secondary mb-3">Important Disclaimer</h3>
          <ul className="text-sm text-muted space-y-2">
            <li>• IPO investments are subject to market risks. Please read all scheme related documents carefully before investing.</li>
            <li>• Grey Market Premium (GMP) mentioned is for informational purposes only. We are not buying or selling IPO forms on Grey Market.</li>
            <li>• Kostak Rate is the premium one gets by selling his/her IPO application (in an off-market transaction) to someone else even before allotment or listing.</li>
            <li>• Do not subscribe for IPO by just seeing the premium Price as it may change anytime before listing. Consider only the fundamentals of the companies.</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IPO;
