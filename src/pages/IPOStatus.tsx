import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userIPOApplications } from "@/data/ipoData";
import { 
  ChevronDown, TrendingUp, Clock, CheckCircle, XCircle, 
  RefreshCw, Download, IndianRupee, Calendar, FileText,
  AlertCircle, ArrowUpRight, Building2, Eye
} from "lucide-react";
import ProductLayout from "@/components/ProductLayout";

const IPOStatus = () => {
  const currentApplications = userIPOApplications.filter((app) => app.status === "pending");
  const historyApplications = userIPOApplications.filter((app) => app.status !== "pending");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border border-amber-200 gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case "allotted":
        return (
          <Badge className="bg-green-100 text-green-700 border border-green-200 gap-1">
            <CheckCircle className="w-3 h-3" /> Allotted
          </Badge>
        );
      case "unallocated":
        return (
          <Badge className="bg-red-100 text-red-700 border border-red-200 gap-1">
            <XCircle className="w-3 h-3" /> Unallocated
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-blue-100 text-blue-700 border border-blue-200 gap-1">
            <RefreshCw className="w-3 h-3" /> Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    total: userIPOApplications.length,
    pending: currentApplications.length,
    allotted: userIPOApplications.filter(a => a.status === "allotted").length,
    totalAmount: userIPOApplications.reduce((sum, a) => sum + a.amount, 0),
  };

  return (
    <ProductLayout>
      <div className="bg-gradient-to-b from-secondary/5 via-secondary/3 to-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary font-['Raleway'] flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                IPO Application Status
              </h1>
              <p className="text-muted-foreground mt-2">Track all your IPO applications and allotments</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Refresh
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-100">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.allotted}</p>
                    <p className="text-sm text-muted-foreground">Allotted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">₹{(stats.totalAmount / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Total Applied</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="bg-white border border-border p-1">
              <TabsTrigger value="current" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Clock className="w-4 h-4" />
                Current Status ({currentApplications.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Calendar className="w-4 h-4" />
                History ({historyApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <Card className="finease-card overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="text-lg text-secondary flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Pending Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {currentApplications.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-secondary mb-2">No Pending Applications</p>
                      <p className="text-muted-foreground mb-4">All your IPO applications have been processed</p>
                      <Button variant="outline" asChild>
                        <a href="/ipo">Browse Open IPOs</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30 border-b">
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Type</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Company</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Application No</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Exchange Ref</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">DP ID</th>
                            <th className="text-center p-4 font-semibold text-secondary text-sm">Qty</th>
                            <th className="text-right p-4 font-semibold text-secondary text-sm">Amount</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Status</th>
                            <th className="text-center p-4 font-semibold text-secondary text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentApplications.map((app) => (
                            <tr key={app.id} className="border-b hover:bg-muted/20 transition-colors">
                              <td className="p-4">
                                <Badge variant="outline" className="font-medium">{app.type}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-primary" />
                                  </div>
                                  <span className="font-semibold text-secondary">{app.ipoName}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{app.applicationNo}</span>
                              </td>
                              <td className="p-4 text-muted-foreground">{app.exchangeRef}</td>
                              <td className="p-4 text-muted-foreground">{app.dpId}</td>
                              <td className="p-4 text-center font-medium text-secondary">{app.qty}</td>
                              <td className="p-4 text-right font-bold text-secondary">₹{app.amount.toLocaleString()}</td>
                              <td className="p-4">{getStatusBadge(app.status)}</td>
                              <td className="p-4 text-center">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
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

            <TabsContent value="history">
              <Card className="finease-card overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-transparent border-b">
                  <CardTitle className="text-lg text-secondary flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Application History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {historyApplications.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-secondary mb-2">No History Found</p>
                      <p className="text-muted-foreground">Your completed IPO applications will appear here</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30 border-b">
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Type</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">IPO Name</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Application ID</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">DP ID</th>
                            <th className="text-center p-4 font-semibold text-secondary text-sm">Qty</th>
                            <th className="text-right p-4 font-semibold text-secondary text-sm">Amount</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Applied On</th>
                            <th className="text-left p-4 font-semibold text-secondary text-sm">Allotment</th>
                            <th className="text-center p-4 font-semibold text-secondary text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyApplications.map((app) => (
                            <tr key={app.id} className="border-b hover:bg-muted/20 transition-colors">
                              <td className="p-4">
                                <Badge variant="outline" className="font-medium">{app.type}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-primary" />
                                  </div>
                                  <span className="font-semibold text-secondary">{app.ipoName}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{app.applicationId}</span>
                              </td>
                              <td className="p-4 text-muted-foreground">{app.dpId}</td>
                              <td className="p-4 text-center font-medium text-secondary">{app.qty}</td>
                              <td className="p-4 text-right font-bold text-secondary">₹{app.amount.toLocaleString()}</td>
                              <td className="p-4 text-muted-foreground">
                                {new Date(app.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="p-4">{getStatusBadge(app.status)}</td>
                              <td className="p-4 text-center">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
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
          </Tabs>

          {/* Info Alert */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-700">Allotment Information</p>
              <p className="text-blue-600">IPO allotments are subject to subscription levels and basis of allotment. Check your registered email for allotment notifications.</p>
            </div>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
};

export default IPOStatus;
