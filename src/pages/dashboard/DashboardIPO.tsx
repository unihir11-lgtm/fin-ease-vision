import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ipoData, userIPOApplications } from "@/data/ipoData";
import { 
  Calendar, TrendingUp, Clock, IndianRupee, ExternalLink, FileText, 
  Eye, ArrowUpRight, CheckCircle, XCircle, AlertCircle, RefreshCw,
  BarChart3, Users, Target, Percent, ChevronDown
} from "lucide-react";

const DashboardIPO = () => {
  const [activeTab, setActiveTab] = useState("applications");

  // IPO Statistics
  const openIPOs = ipoData.filter(ipo => ipo.status === "Open").length;
  const upcomingIPOs = ipoData.filter(ipo => ipo.status === "Upcoming").length;
  const closedIPOs = ipoData.filter(ipo => ipo.status === "Closed").length;
  
  // Application Statistics
  const pendingApplications = userIPOApplications.filter(app => app.status === "pending");
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
    { label: "Pending", value: pendingApplications.length, icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { label: "Allotted", value: allottedApplications.length, icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Total Invested", value: `₹${(totalInvested / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-[#1dab91]", bgColor: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          <Link to="/ipo/status">
            <Button variant="finease" className="gap-2">
              <FileText className="w-4 h-4" />
              Check Status
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
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
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="applications" className="data-[state=active]:bg-white gap-2">
            <FileText className="w-4 h-4" />
            My Applications ({userIPOApplications.length})
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

        {/* My Applications Tab */}
        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">IPO Application Status</CardTitle>
                <Link to="/ipo/status">
                  <Button variant="ghost" size="sm" className="text-primary gap-1">
                    View All <ExternalLink className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {userIPOApplications.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary mb-2">No IPO Applications</h3>
                  <p className="text-muted-foreground mb-4">You haven't applied for any IPOs yet</p>
                  <Link to="/ipo">
                    <Button variant="finease">Browse IPOs</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">IPO Name</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Qty</th>
                        <th className="text-left p-3 font-medium">Amount</th>
                        <th className="text-left p-3 font-medium">Applied Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userIPOApplications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium text-secondary">{app.ipoName}</td>
                          <td className="p-3">
                            <Badge variant="outline">{app.type}</Badge>
                          </td>
                          <td className="p-3">{app.qty}</td>
                          <td className="p-3 font-medium">₹{app.amount.toLocaleString()}</td>
                          <td className="p-3 text-muted-foreground">{new Date(app.appliedDate).toLocaleDateString('en-IN')}</td>
                          <td className="p-3">{getStatusBadge(app.status)}</td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Open IPOs Tab */}
        <TabsContent value="open" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {ipoData.filter(ipo => ipo.status === "Open").map((ipo) => (
              <Card key={ipo.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#175d80]/10 to-[#1dab91]/10 flex items-center justify-center text-2xl">
                        {ipo.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary">{ipo.companyShortName}</h3>
                        <p className="text-sm text-muted-foreground">{ipo.type} • {ipo.issueSize}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Live</Badge>
                  </div>

                  {/* Subscription Status */}
                  <div className="bg-muted/30 rounded-xl p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Subscription Status</p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-sm font-bold text-[#175d80]">{ipo.subscriptionRate.qib.toFixed(1)}x</p>
                        <p className="text-xs text-muted-foreground">QIB</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#175d80]">{ipo.subscriptionRate.nii.toFixed(1)}x</p>
                        <p className="text-xs text-muted-foreground">NII</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#175d80]">{ipo.subscriptionRate.retail.toFixed(1)}x</p>
                        <p className="text-xs text-muted-foreground">Retail</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1dab91]">{ipo.subscriptionRate.total.toFixed(1)}x</p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Price Band</p>
                      <p className="font-medium text-secondary">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min Investment</p>
                      <p className="font-medium text-[#1dab91]">₹{ipo.minInvestment.toLocaleString()}</p>
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
          <div className="grid md:grid-cols-2 gap-4">
            {ipoData.filter(ipo => ipo.status === "Upcoming").map((ipo) => (
              <Card key={ipo.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#175d80]/10 to-[#1dab91]/10 flex items-center justify-center text-2xl">
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
                    <div>
                      <p className="text-muted-foreground">Price Band</p>
                      <p className="font-medium text-secondary">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min Investment</p>
                      <p className="font-medium text-[#1dab91]">₹{ipo.minInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Open Date</p>
                      <p className="font-medium text-secondary">{new Date(ipo.bidDates.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Listing Date</p>
                      <p className="font-medium text-secondary">{new Date(ipo.listingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/ipo/${ipo.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Set Reminder
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
            <div className="text-center p-4 bg-white rounded-xl border">
              <p className="text-3xl font-bold text-[#175d80]">{ipoData.length}</p>
              <p className="text-sm text-muted-foreground">Total IPOs</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border">
              <p className="text-3xl font-bold text-green-600">{openIPOs}</p>
              <p className="text-sm text-muted-foreground">Open Now</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border">
              <p className="text-3xl font-bold text-blue-600">{upcomingIPOs}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border">
              <p className="text-3xl font-bold text-gray-600">{closedIPOs}</p>
              <p className="text-sm text-muted-foreground">Closed</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border">
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
