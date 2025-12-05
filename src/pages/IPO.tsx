import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ipoData } from "@/data/ipoData";
import { 
  Clock, TrendingUp, AlertCircle, FileText, Users, ChevronRight, 
  IndianRupee, BarChart3, Target, Calendar, Download, Flame,
  ArrowUpRight, Briefcase, Star, Eye, Percent, Sparkles, CheckCircle
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
  const avgSubscription = 2.5;

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

  // Additional stats for Chittorgarh-style summary
  const totalIPOs = ipoData.length;
  const iposInGain = Math.floor(totalIPOs * 0.48); // Simulated
  const iposInLoss = totalIPOs - iposInGain - openIPOs - upcomingIPOs;

  const stats = [
    { label: "Total IPOs", value: totalIPOs, icon: Target, color: "bg-[#175d80]", bgColor: "bg-blue-50", textColor: "text-[#175d80]" },
    { label: "Open IPOs", value: openIPOs, icon: TrendingUp, color: "bg-green-500", bgColor: "bg-green-50", textColor: "text-green-600" },
    { label: "Listed in Gain", value: iposInGain, icon: TrendingUp, color: "bg-emerald-500", bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { label: "Upcoming", value: upcomingIPOs, icon: Calendar, color: "bg-blue-500", bgColor: "bg-blue-50", textColor: "text-blue-600" },
  ];

  // Featured IPO (first open IPO)
  const featuredIPO = ipoData.find(ipo => ipo.status === "Open");

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#0a344a] via-[#175d80] to-[#1dab91] rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Initial Public Offerings</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display leading-tight">
                Invest in <span className="text-[#1dab91]">IPOs</span>
              </h1>
              <p className="text-white/80 text-lg mb-6">Get early access to companies going public. Apply for IPOs seamlessly with FinEase and build your portfolio.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/ipo/status">
                  <Button size="lg" className="bg-white text-[#175d80] hover:bg-white/90 gap-2 font-semibold">
                    <FileText className="w-5 h-5" />
                    Check IPO Status
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <Download className="w-5 h-5" />
                  Download Report
                </Button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured IPO */}
        {featuredIPO && (
          <Card className="mb-8 border-2 border-[#1dab91]/30 bg-gradient-to-r from-[#1dab91]/5 to-transparent overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-[#1dab91] text-white border-0 gap-1">
                      <Flame className="w-3 h-3" />
                      Featured IPO
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 border-0 gap-1">
                      <Sparkles className="w-3 h-3" />
                      Hot
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#175d80]/20 to-[#1dab91]/20 flex items-center justify-center text-4xl border border-border/50">
                      {featuredIPO.logo}
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#0a344a] mb-1">{featuredIPO.companyShortName}</h2>
                      <p className="text-muted-foreground">{featuredIPO.type} • {featuredIPO.issueSize}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Price Band</p>
                      <p className="text-xl font-bold text-[#175d80]">₹{featuredIPO.priceRange.min} - ₹{featuredIPO.priceRange.max}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Lot Size</p>
                      <p className="text-xl font-bold text-[#175d80]">{featuredIPO.lotSize} shares</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Min Investment</p>
                      <p className="text-xl font-bold text-[#1dab91]">₹{featuredIPO.minInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">GMP</p>
                      <p className="text-xl font-bold text-green-600">+₹{Math.floor(Math.random() * 50) + 20}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/ipo/${featuredIPO.id}`}>
                      <Button size="lg" className="bg-[#1dab91] hover:bg-[#18937c] text-white gap-2">
                        Apply Now <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/ipo/${featuredIPO.id}`}>
                      <Button size="lg" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/3 bg-gradient-to-br from-[#0a344a] to-[#175d80] p-6 lg:p-8 text-white flex flex-col justify-center">
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-2">Bidding Closes In</p>
                    <div className="text-4xl font-bold font-mono mb-4">{countdowns[featuredIPO.id] || "00:00:00"}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Opens</span>
                        <span className="font-semibold">{new Date(featuredIPO.bidDates.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Closes</span>
                        <span className="font-semibold">{new Date(featuredIPO.bidDates.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Listing</span>
                        <span className="font-semibold">{new Date(featuredIPO.bidDates.end).getDate() + 7} {new Date(featuredIPO.bidDates.end).toLocaleDateString('en-IN', { month: 'short' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="Open" className="data-[state=active]:bg-white data-[state=active]:text-[#1dab91] data-[state=active]:shadow-sm gap-2 px-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Open ({openIPOs})
              </TabsTrigger>
              <TabsTrigger value="Upcoming" className="data-[state=active]:bg-white data-[state=active]:text-[#175d80] data-[state=active]:shadow-sm gap-2 px-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Upcoming ({upcomingIPOs})
              </TabsTrigger>
              <TabsTrigger value="Closed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                Closed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            {["Main Board", "SME"].map((type) => (
              <button
                key={type}
                onClick={() => setBoardFilter(type)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  boardFilter === type
                    ? "bg-[#175d80] text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* IPO Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredIPOs.map((ipo) => {
            const closeDate = formatDate(ipo.bidDates.end);
            const gmp = Math.floor(Math.random() * 50) + 10;
            const expectedReturn = ((gmp / ipo.priceRange.max) * 100).toFixed(1);
            
            return (
              <Link key={ipo.id} to={`/ipo/${ipo.id}`} className="block group">
                <Card className="h-full border-border/50 hover:border-[#1dab91]/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-5 border-b border-border/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl border border-border/50 group-hover:scale-105 transition-transform">
                            {ipo.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`text-xs font-bold ${
                                ipo.type === "Main Board" 
                                  ? "bg-purple-100 text-purple-700" 
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {ipo.type}
                              </Badge>
                              {ipo.status === "Open" && (
                                <Badge className="bg-green-100 text-green-700 text-xs">Live</Badge>
                              )}
                            </div>
                            <h3 className="font-bold text-lg text-[#0a344a] group-hover:text-[#1dab91] transition-colors">{ipo.companyShortName}</h3>
                            <p className="text-sm text-muted-foreground">{ipo.issueSize}</p>
                          </div>
                        </div>
                        {ipo.status === "Open" && (
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Closes</p>
                            <p className="text-lg font-bold text-[#175d80]">{closeDate.day} {closeDate.month}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="text-lg font-bold text-[#0a344a]">₹{ipo.priceRange.max}</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Lot Size</p>
                          <p className="text-lg font-bold text-[#0a344a]">{ipo.lotSize}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">GMP</p>
                          <p className="text-lg font-bold text-green-600">+₹{gmp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-xl font-bold text-[#1dab91]">₹{ipo.minInvestment.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Expected Return</p>
                          <div className="flex items-center gap-1 text-green-600">
                            <Percent className="w-4 h-4" />
                            <span className="text-xl font-bold">{expectedReturn}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Countdown for Open IPOs */}
                      {ipo.status === "Open" && (
                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 mb-4">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Ends in</span>
                          <span className="font-bold font-mono">{countdowns[ipo.id] || "Closed"}</span>
                        </div>
                      )}

                      <Button 
                        className={`w-full gap-2 ${
                          ipo.status === "Open" 
                            ? "bg-[#1dab91] hover:bg-[#18937c] text-white" 
                            : ""
                        }`}
                        variant={ipo.status === "Open" ? "default" : "outline"}
                      >
                        {ipo.status === "Open" ? "Apply Now" : "View Details"}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredIPOs.length === 0 && (
          <Card className="border border-border/50">
            <CardContent className="py-16 text-center">
              <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0a344a] mb-2">No IPOs Found</h3>
              <p className="text-muted-foreground">No IPOs found for the selected filters. Try changing the filter criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Subscription Status Table - Chittorgarh Style */}
        {ipoData.filter(ipo => ipo.status === "Open").length > 0 && (
          <Card className="mb-8 border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#1dab91]" />
                  Live Subscription Status (BSE + NSE)
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">IPO Name</TableHead>
                      <TableHead className="text-center font-semibold">Close Date</TableHead>
                      <TableHead className="text-center font-semibold">Size (Cr)</TableHead>
                      <TableHead className="text-center font-semibold text-blue-600">QIB</TableHead>
                      <TableHead className="text-center font-semibold text-purple-600">NII</TableHead>
                      <TableHead className="text-center font-semibold text-orange-600">Retail</TableHead>
                      <TableHead className="text-center font-semibold text-[#1dab91]">Total</TableHead>
                      <TableHead className="text-center font-semibold">Apply</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipoData.filter(ipo => ipo.status === "Open").map((ipo) => (
                      <TableRow key={ipo.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{ipo.logo}</span>
                            <div>
                              <p className="font-medium text-secondary">{ipo.companyShortName}</p>
                              <p className="text-xs text-muted-foreground">{ipo.type}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(ipo.bidDates.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </TableCell>
                        <TableCell className="text-center font-medium">{ipo.issueSize}</TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${ipo.subscriptionRate.qib >= 1 ? 'text-green-600' : 'text-gray-600'}`}>
                            {ipo.subscriptionRate.qib.toFixed(2)}x
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${ipo.subscriptionRate.nii >= 1 ? 'text-green-600' : 'text-gray-600'}`}>
                            {ipo.subscriptionRate.nii.toFixed(2)}x
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${ipo.subscriptionRate.retail >= 1 ? 'text-green-600' : 'text-gray-600'}`}>
                            {ipo.subscriptionRate.retail.toFixed(2)}x
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${ipo.subscriptionRate.total >= 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {ipo.subscriptionRate.total.toFixed(2)}x
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Link to={`/ipo/${ipo.id}`}>
                            <Button size="sm" className="bg-[#1dab91] hover:bg-[#18937c] h-7 px-3 text-xs">
                              Apply
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* IPO Timetable */}
        <Card className="mb-8 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#175d80]" />
              IPO Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">IPO Name</TableHead>
                    <TableHead className="text-center font-semibold">Open</TableHead>
                    <TableHead className="text-center font-semibold">Close</TableHead>
                    <TableHead className="text-center font-semibold">Allotment</TableHead>
                    <TableHead className="text-center font-semibold">Refund</TableHead>
                    <TableHead className="text-center font-semibold">Listing</TableHead>
                    <TableHead className="text-center font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipoData.slice(0, 6).map((ipo) => (
                    <TableRow key={ipo.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Link to={`/ipo/${ipo.id}`} className="flex items-center gap-2 hover:text-primary">
                          <span className="text-xl">{ipo.logo}</span>
                          <span className="font-medium text-secondary hover:text-[#1dab91]">{ipo.companyShortName}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {new Date(ipo.bidDates.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {new Date(ipo.bidDates.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {new Date(ipo.allotmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {new Date(ipo.refundDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {new Date(ipo.listingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`text-xs ${
                          ipo.status === "Open" ? "bg-green-100 text-green-700" :
                          ipo.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {ipo.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Target, title: "Apply Early", desc: "Submit your application before the last day to avoid technical issues.", color: "bg-[#1dab91]/10", iconColor: "text-[#1dab91]" },
            { icon: Star, title: "Research Well", desc: "Read the RHP and understand company fundamentals before investing.", color: "bg-green-50", iconColor: "text-green-600" },
            { icon: ArrowUpRight, title: "Diversify", desc: "Don't put all your money in one IPO. Spread across multiple offerings.", color: "bg-amber-50", iconColor: "text-amber-600" },
          ].map((tip, i) => (
            <Card key={i} className="border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${tip.color} rounded-xl`}>
                    <tip.icon className={`w-6 h-6 ${tip.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a344a] mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Disclaimer */}
        <Card className="bg-amber-50 border border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#0a344a] mb-2">Important SEBI Disclaimer</h3>
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
