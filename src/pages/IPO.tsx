import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ipoData } from "@/data/ipoData";
import { Clock, TrendingUp, AlertCircle, FileText, Users, ChevronRight } from "lucide-react";
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
    const day = date.getDate();
    const month = date.toLocaleDateString("en-IN", { month: "short" });
    return { day, month };
  };

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8 text-white">
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
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <FileText className="w-4 h-4 mr-2" />
                Check IPO Status
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-muted/50">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  boardFilter === type
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* IPO List - Full Width Rows */}
        <div className="space-y-3">
          {filteredIPOs.map((ipo) => {
            const closeDate = formatDate(ipo.bidDates.end);
            return (
              <Link key={ipo.id} to={`/ipo/${ipo.id}`} className="block">
                <div className="bg-white rounded-xl border border-border/50 p-4 hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                      {ipo.logo}
                    </div>
                    
                    {/* Type Badge */}
                    <Badge className={`px-2.5 py-1 text-xs font-bold flex-shrink-0 ${
                      ipo.type === "Main Board" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {ipo.type === "Main Board" ? "Main" : "SME"}
                    </Badge>

                    {/* Name */}
                    <div className="min-w-[140px] flex-shrink-0">
                      <h3 className="font-semibold text-secondary text-sm truncate max-w-[160px]">{ipo.companyShortName}</h3>
                    </div>

                    {/* Closes Date Box */}
                    <div className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-secondary/20 bg-secondary/5 text-center min-w-[70px]">
                      <p className="text-[10px] text-muted-foreground leading-tight">Closes:</p>
                      <p className="text-xs font-bold text-secondary leading-tight">{closeDate.day} {closeDate.month}</p>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-center min-w-[50px]">
                      <p className="text-[10px] text-muted-foreground">Price</p>
                      <p className="text-sm font-bold text-secondary">₹{ipo.priceRange.max}</p>
                    </div>

                    {/* Min Investment */}
                    <div className="flex-shrink-0 text-center min-w-[70px]">
                      <p className="text-[10px] text-muted-foreground">Min Invest</p>
                      <p className="text-sm font-bold text-accent">₹{(ipo.minInvestment / 1000).toFixed(0)}K</p>
                    </div>

                    {/* Lot Size */}
                    <div className="flex-shrink-0 text-center min-w-[60px]">
                      <p className="text-[10px] text-muted-foreground">Lot Size</p>
                      <p className="text-sm font-bold text-secondary">{ipo.lotSize}</p>
                    </div>

                    {/* Countdown for Open IPOs */}
                    {ipo.status === "Open" && (
                      <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{countdowns[ipo.id] || "Closed"}</span>
                      </div>
                    )}

                    {/* Apply/Details Button */}
                    <button className="flex-shrink-0 ml-auto flex items-center gap-1 text-primary hover:text-primary/80 font-semibold text-sm transition-colors">
                      {ipo.status === "Open" ? "Apply" : "Details"} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredIPOs.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No IPOs found for the selected filters.</p>
          </div>
        )}

        {/* Compliance Disclaimer */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">Important SEBI Disclaimer</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
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