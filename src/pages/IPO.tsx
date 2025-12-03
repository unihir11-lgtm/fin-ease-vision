import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ipoData } from "@/data/ipoData";
import { 
  Clock, TrendingUp, AlertCircle, FileText, Users, ChevronRight, 
  IndianRupee, BarChart3, Target, Calendar, Filter, Download,
  ArrowUpRight, Briefcase, Star
} from "lucide-react";
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

  const openIPOs = ipoData.filter(ipo => ipo.status === "Open").length;
  const upcomingIPOs = ipoData.filter(ipo => ipo.status === "Upcoming").length;
  const totalIssueSize = ipoData.reduce((sum, ipo) => {
    const size = parseFloat(ipo.issueSize?.replace(/[^0-9.]/g, '') || '0');
    return sum + size;
  }, 0);
  const avgSubscription = 2.5; // Mock data

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

  const stats = [
    { label: "Open IPOs", value: openIPOs, icon: TrendingUp, color: "bg-green-500", bgColor: "bg-green-50" },
    { label: "Upcoming", value: upcomingIPOs, icon: Calendar, color: "bg-blue-500", bgColor: "bg-blue-50" },
    { label: "Total Issue Size", value: `₹${(totalIssueSize / 100).toFixed(0)}Cr`, icon: IndianRupee, color: "bg-purple-500", bgColor: "bg-purple-50" },
    { label: "Avg. Subscription", value: `${avgSubscription}x`, icon: BarChart3, color: "bg-amber-500", bgColor: "bg-amber-50" },
  ];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-secondary via-secondary/95 to-primary/80 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Initial Public Offerings</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 font-['Raleway']">Invest in IPOs</h1>
              <p className="text-white/80 max-w-lg text-base">Get early access to companies going public. Apply for IPOs seamlessly with FinEase.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/ipo/status">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <FileText className="w-4 h-4" />
                  Check IPO Status
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="Open" className="data-[state=active]:bg-white data-[state=active]:text-primary gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Open ({openIPOs})
              </TabsTrigger>
              <TabsTrigger value="Upcoming" className="data-[state=active]:bg-white data-[state=active]:text-primary gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Upcoming ({upcomingIPOs})
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
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* IPO List */}
        <Card className="border border-border/50 mb-8">
          <CardHeader className="pb-0 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {statusFilter} IPOs
              </CardTitle>
              <span className="text-sm text-muted-foreground">{filteredIPOs.length} results</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filteredIPOs.map((ipo) => {
                const closeDate = formatDate(ipo.bidDates.end);
                return (
                  <Link key={ipo.id} to={`/ipo/${ipo.id}`} className="block">
                    <div className="p-4 hover:bg-muted/30 transition-all">
                      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                        {/* Logo */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center text-2xl flex-shrink-0 border border-border/50">
                          {ipo.logo}
                        </div>
                        
                        {/* Type Badge */}
                        <Badge className={`px-2.5 py-1 text-xs font-bold flex-shrink-0 ${
                          ipo.type === "Main Board" 
                            ? "bg-purple-100 text-purple-700 border border-purple-200" 
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}>
                          {ipo.type === "Main Board" ? "Main" : "SME"}
                        </Badge>

                        {/* Name */}
                        <div className="min-w-[160px] flex-shrink-0">
                          <h3 className="font-semibold text-secondary text-sm truncate max-w-[180px]">{ipo.companyShortName}</h3>
                          <p className="text-xs text-muted-foreground truncate">{ipo.type}</p>
                        </div>

                        {/* Closes Date Box */}
                        <div className="flex-shrink-0 px-3 py-2 rounded-lg border border-secondary/20 bg-secondary/5 text-center min-w-[80px]">
                          <p className="text-[10px] text-muted-foreground leading-tight uppercase tracking-wide">Closes</p>
                          <p className="text-sm font-bold text-secondary leading-tight">{closeDate.day} {closeDate.month}</p>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 text-center min-w-[60px]">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Price</p>
                          <p className="text-sm font-bold text-secondary">₹{ipo.priceRange.max}</p>
                        </div>

                        {/* Min Investment */}
                        <div className="flex-shrink-0 text-center min-w-[80px]">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Min Invest</p>
                          <p className="text-sm font-bold text-primary">₹{(ipo.minInvestment / 1000).toFixed(0)}K</p>
                        </div>

                        {/* Lot Size */}
                        <div className="flex-shrink-0 text-center min-w-[70px]">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Lot Size</p>
                          <p className="text-sm font-bold text-secondary">{ipo.lotSize}</p>
                        </div>

                        {/* GMP */}
                        <div className="flex-shrink-0 text-center min-w-[60px]">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">GMP</p>
                          <p className="text-sm font-bold text-green-600">+₹{Math.floor(Math.random() * 50) + 10}</p>
                        </div>

                        {/* Countdown for Open IPOs */}
                        {ipo.status === "Open" && (
                          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold font-mono">{countdowns[ipo.id] || "Closed"}</span>
                          </div>
                        )}

                        {/* Apply/Details Button */}
                        <Button 
                          variant={ipo.status === "Open" ? "default" : "outline"} 
                          size="sm" 
                          className="flex-shrink-0 ml-auto gap-1"
                        >
                          {ipo.status === "Open" ? "Apply Now" : "View Details"}
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {filteredIPOs.length === 0 && (
          <Card className="border border-border/50">
            <CardContent className="py-16 text-center">
              <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary mb-2">No IPOs Found</h3>
              <p className="text-muted-foreground">No IPOs found for the selected filters. Try changing the filter criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Tips */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Apply Early</h4>
                  <p className="text-sm text-muted-foreground">Submit your application before the last day to avoid any technical issues.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Research Well</h4>
                  <p className="text-sm text-muted-foreground">Read the RHP and understand company fundamentals before investing.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Diversify</h4>
                  <p className="text-sm text-muted-foreground">Don't put all your money in one IPO. Spread across multiple offerings.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Disclaimer */}
        <Card className="bg-amber-50 border border-amber-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-secondary mb-2">Important SEBI Disclaimer</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• IPO investments are subject to market risks. Read all scheme related documents carefully.</li>
                  <li>• Grey Market Premium (GMP) is for informational purposes only and is not endorsed by SEBI.</li>
                  <li>• Do not subscribe based on premium price alone. Consider company fundamentals.</li>
                  <li>• Past performance is not indicative of future results.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductLayout>
  );
};

export default IPO;
