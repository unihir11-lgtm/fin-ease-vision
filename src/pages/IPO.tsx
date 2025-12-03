import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ipoData } from "@/data/ipoData";
import { Clock, Calendar, TrendingUp, AlertCircle, FileText, Users } from "lucide-react";
import ProductLayout from "@/components/ProductLayout";

const IPO = () => {
  const [statusFilter, setStatusFilter] = useState("Open");
  const [boardFilter, setBoardFilter] = useState("SME");
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  const filteredIPOs = ipoData.filter((ipo) => {
    const matchesStatus = ipo.status === statusFilter;
    const matchesBoard = boardFilter === "all" || ipo.type === boardFilter;
    return matchesStatus && matchesBoard;
  });

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
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-white/80 text-sm font-medium">Initial Public Offerings</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Invest in IPOs</h1>
              <p className="text-white/80 max-w-lg">Get early access to companies going public. Apply for IPOs seamlessly with FinEase.</p>
            </div>
            <Link to="/ipo/status">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <FileText className="w-4 h-4 mr-2" />
                Check IPO Status
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-secondary/5">
              <TabsTrigger value="Open" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                Open
              </TabsTrigger>
              <TabsTrigger value="Upcoming" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="Closed" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                Closed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            {["Main Board", "SME"].map((type) => (
              <button
                key={type}
                onClick={() => setBoardFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  boardFilter === type
                    ? "bg-primary text-white"
                    : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* IPO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIPOs.map((ipo) => (
            <div key={ipo.id} className="finease-card bg-white rounded-2xl p-5 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors">
                    {ipo.logo}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs border-primary/30 text-primary">{ipo.type}</Badge>
                    <h3 className="font-bold text-secondary text-sm leading-tight">{ipo.companyShortName}</h3>
                  </div>
                </div>
                {ipo.status === "Open" && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{countdowns[ipo.id] || "00:00:00"}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(ipo.bidDates.start)} - {formatDate(ipo.bidDates.end)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                  <p className="font-bold text-secondary">₹{ipo.priceRange.min}-{ipo.priceRange.max}</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                  <p className="font-bold text-secondary">₹{ipo.minInvestment.toLocaleString()}</p>
                </div>
              </div>

              <Link to={`/ipo/${ipo.id}`} className="block">
                <Button className="w-full" variant="finease">
                  {ipo.status === "Open" ? "Apply Now" : ipo.status === "Upcoming" ? "Notify Me" : "View Details"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {filteredIPOs.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No IPOs found for the selected filters.</p>
          </div>
        )}

        {/* Compliance Disclaimer */}
        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">Important SEBI Disclaimer</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• IPO investments are subject to market risks. Read all scheme related documents carefully.</li>
                <li>• Grey Market Premium (GMP) is for informational purposes only.</li>
                <li>• Do not subscribe based on premium price alone. Consider company fundamentals.</li>
                <li>• Past performance is not indicative of future results.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
};

export default IPO;
