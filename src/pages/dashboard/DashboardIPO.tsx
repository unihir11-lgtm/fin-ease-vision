import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ipoData, userIPOApplications } from "@/data/ipoData";
import { 
  Calendar, TrendingUp, Clock, IndianRupee, ExternalLink, FileText, 
  Eye, ArrowUpRight, CheckCircle, XCircle, AlertCircle, RefreshCw,
  BarChart3, History, Bell, Download, Filter
} from "lucide-react";

const DashboardIPO = () => {
  const [activeTab, setActiveTab] = useState("status");

  // IPO Statistics
  const openIPOs = ipoData.filter(ipo => ipo.status === "Open").length;
  const upcomingIPOs = ipoData.filter(ipo => ipo.status === "Upcoming").length;
  const closedIPOs = ipoData.filter(ipo => ipo.status === "Closed").length;
  
  // Application Statistics
  const currentApplications = userIPOApplications.filter(app => app.status === "pending");
  const historyApplications = userIPOApplications.filter(app => app.status !== "pending");
  const allottedApplications = userIPOApplications.filter(app => app.status === "allotted");
  const totalInvested = userIPOApplications.reduce((sum, app) => sum + app.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 gap-1"><Clock className="w-3 h-3" />Pending</Badge>;
      case "allotted":
        return <Badge className="bg-green-100 text-green-700 gap-1"><CheckCircle className="w-3 h-3" />Allotted</Badge>;
      case "unallocated":
        return <Badge className="bg-red-100 text-red-700 gap-1"><XCircle className="w-3 h-3" />Not Allotted</Badge>;
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-700 gap-1"><RefreshCw className="w-3 h-3" />Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = [
    { label: "Total Applications", value: userIPOApplications.length, icon: FileText, color: "text-[#175d80]", bgColor: "bg-blue-50" },
    { label: "Pending", value: currentApplications.length, icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { label: "Allotted", value: allottedApplications.length, icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Total Invested", value: `₹${(totalInvested / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-[#1dab91]", bgColor: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-display">IPO Dashboard</h1>
          <p className="text-muted-foreground">Track your IPO applications and discover new opportunities</p>
        </div>
        <div className="flex gap-2">
          <Link to="/ipo">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Browse IPOs
            </Button>
          </Link>
          <Button variant="finease" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
          <TabsTrigger value="status" className="data-[state=active]:bg-white gap-2">
            <Clock className="w-4 h-4" />
            Current Status ({currentApplications.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white gap-2">
            <History className="w-4 h-4" />
            History ({historyApplications.length})
          </TabsTrigger>
          <TabsTrigger value="open" className="data-[state=active]:bg-white gap-2">
            <TrendingUp className="w-4 h-4" />
            Open IPOs ({openIPOs})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming ({upcomingIPOs})
          </TabsTrigger>
        </TabsList>

        {/* Current Status Tab - Like IPOStatus Page */}
        <TabsContent value="status" className="mt-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Current IPO Application Status
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="w-3 h-3" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Bell className="w-3 h-3" />
                    Set Alert
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {currentApplications.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary mb-2">No Pending Applications</h3>
                  <p className="text-muted-foreground mb-4">You don't have any pending IPO applications</p>
                  <Link to="/ipo">
                    <Button variant="finease">Browse Open IPOs</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 hover:bg-primary/5">
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="font-semibold">Application No</TableHead>
                        <TableHead className="font-semibold">Exchange Ref</TableHead>
                        <TableHead className="font-semibold">Application Id</TableHead>
                        <TableHead className="font-semibold">DP ID</TableHead>
                        <TableHead className="font-semibold">Qty</TableHead>
                        <TableHead className="font-semibold">UPI</TableHead>
                        <TableHead className="font-semibold">Exchange Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentApplications.map((app) => (
                        <TableRow key={app.id} className="hover:bg-muted/30">
                          <TableCell>
                            <Badge variant="outline" className="font-medium">{app.type}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-secondary">{app.ipoName}</TableCell>
                          <TableCell className="text-sm font-mono">{app.applicationNo}</TableCell>
                          <TableCell className="text-sm">{app.exchangeRef}</TableCell>
                          <TableCell className="text-sm">{app.applicationId}</TableCell>
                          <TableCell className="text-sm">{app.dpId}</TableCell>
                          <TableCell className="font-medium">{app.qty}</TableCell>
                          <TableCell className="text-sm font-mono">{app.upi}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab - Like IPOStatus Page */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  IPO Application History
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="w-3 h-3" />
                  Export History
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {historyApplications.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary mb-2">No IPO History</h3>
                  <p className="text-muted-foreground">Your completed IPO applications will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 hover:bg-primary/5">
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">IPO Name</TableHead>
                        <TableHead className="font-semibold">Application Id</TableHead>
                        <TableHead className="font-semibold">DP ID</TableHead>
                        <TableHead className="font-semibold">Qty</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Exchange Code</TableHead>
                        <TableHead className="font-semibold">UPI</TableHead>
                        <TableHead className="font-semibold">Allotment Status</TableHead>
                        <TableHead className="font-semibold">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historyApplications.map((app) => (
                        <TableRow key={app.id} className="hover:bg-muted/30">
                          <TableCell>
                            <Badge variant="outline" className="font-medium">{app.type}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-secondary">{app.ipoName}</TableCell>
                          <TableCell className="text-sm">{app.applicationId}</TableCell>
                          <TableCell className="text-sm">{app.dpId}</TableCell>
                          <TableCell className="font-medium">{app.qty}</TableCell>
                          <TableCell className="font-medium text-[#1dab91]">₹{app.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-sm">{app.exchangeCode}</TableCell>
                          <TableCell className="text-sm font-mono">{app.upi}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Open IPOs Tab */}
        <TabsContent value="open" className="mt-4">
          <Card className="mb-4">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Live Subscription Status
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5 hover:bg-primary/5">
                      <TableHead className="font-semibold">IPO Name</TableHead>
                      <TableHead className="text-center font-semibold">Close Date</TableHead>
                      <TableHead className="text-center font-semibold">Size</TableHead>
                      <TableHead className="text-center font-semibold text-blue-600">QIB</TableHead>
                      <TableHead className="text-center font-semibold text-purple-600">NII</TableHead>
                      <TableHead className="text-center font-semibold text-orange-600">Retail</TableHead>
                      <TableHead className="text-center font-semibold text-[#1dab91]">Total</TableHead>
                      <TableHead className="text-center font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipoData.filter(ipo => ipo.status === "Open").map((ipo) => (
                      <TableRow key={ipo.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{ipo.logo}</span>
                            <div>
                              <p className="font-semibold text-secondary">{ipo.companyShortName}</p>
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
                            <Button size="sm" className="bg-[#1dab91] hover:bg-[#18937c] h-8 px-3">
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

          {/* Open IPO Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {ipoData.filter(ipo => ipo.status === "Open").map((ipo) => (
              <Card key={ipo.id} className="hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#175d80]/10 to-[#1dab91]/10 flex items-center justify-center text-2xl border">
                        {ipo.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary">{ipo.companyShortName}</h3>
                        <p className="text-sm text-muted-foreground">{ipo.type} • {ipo.issueSize}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Live
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Price Band</p>
                      <p className="font-bold text-secondary">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Min Investment</p>
                      <p className="font-bold text-[#1dab91]">₹{ipo.minInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Lot Size</p>
                      <p className="font-bold text-secondary">{ipo.lotSize} shares</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Close Date</p>
                      <p className="font-bold text-secondary">{new Date(ipo.bidDates.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/ipo/${ipo.id}`} className="flex-1">
                      <Button variant="finease" className="w-full gap-2">
                        Apply Now <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/ipo/${ipo.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            {ipoData.filter(ipo => ipo.status === "Open").length === 0 && (
              <div className="col-span-2 text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-secondary mb-2">No Open IPOs</h3>
                <p className="text-muted-foreground">Check upcoming IPOs for new opportunities</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Upcoming IPOs Tab */}
        <TabsContent value="upcoming" className="mt-4">
          <Card className="mb-4">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                IPO Timetable
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5 hover:bg-primary/5">
                      <TableHead className="font-semibold">IPO Name</TableHead>
                      <TableHead className="text-center font-semibold">Open</TableHead>
                      <TableHead className="text-center font-semibold">Close</TableHead>
                      <TableHead className="text-center font-semibold">Allotment</TableHead>
                      <TableHead className="text-center font-semibold">Refund</TableHead>
                      <TableHead className="text-center font-semibold">Listing</TableHead>
                      <TableHead className="text-center font-semibold">Status</TableHead>
                      <TableHead className="text-center font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipoData.filter(ipo => ipo.status === "Upcoming").map((ipo) => (
                      <TableRow key={ipo.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{ipo.logo}</span>
                            <div>
                              <p className="font-semibold text-secondary">{ipo.companyShortName}</p>
                              <p className="text-xs text-muted-foreground">{ipo.type}</p>
                            </div>
                          </div>
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
                          <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm" className="h-8 px-3 gap-1">
                            <Bell className="w-3 h-3" />
                            Remind
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming IPO Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {ipoData.filter(ipo => ipo.status === "Upcoming").map((ipo) => (
              <Card key={ipo.id} className="hover:shadow-lg transition-shadow border-blue-100">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#175d80]/10 to-[#1dab91]/10 flex items-center justify-center text-2xl border">
                        {ipo.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary">{ipo.companyShortName}</h3>
                        <p className="text-sm text-muted-foreground">{ipo.type} • {ipo.issueSize}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Price Band</p>
                      <p className="font-bold text-secondary">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Min Investment</p>
                      <p className="font-bold text-[#1dab91]">₹{ipo.minInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Open Date</p>
                      <p className="font-bold text-secondary">{new Date(ipo.bidDates.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">Listing Date</p>
                      <p className="font-bold text-secondary">{new Date(ipo.listingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Bell className="w-4 h-4" />
                      Set Reminder
                    </Button>
                    <Link to={`/ipo/${ipo.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* IPO Market Summary */}
      <Card className="border-[#1dab91]/20 bg-gradient-to-r from-[#1dab91]/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1dab91]" />
            IPO Market Summary 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-[#175d80]">{ipoData.length}</p>
              <p className="text-sm text-muted-foreground">Total IPOs</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-green-600">{openIPOs}</p>
              <p className="text-sm text-muted-foreground">Open Now</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-blue-600">{upcomingIPOs}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-gray-600">{closedIPOs}</p>
              <p className="text-sm text-muted-foreground">Closed</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-[#1dab91]">85%</p>
              <p className="text-sm text-muted-foreground">Listed in Gain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardIPO;
