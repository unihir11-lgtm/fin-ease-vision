import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userIPOApplications } from "@/data/ipoData";
import { ArrowLeft, ChevronDown } from "lucide-react";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

const IPOStatus = () => {
  const currentApplications = userIPOApplications.filter((app) => app.status === "pending");
  const historyApplications = userIPOApplications.filter((app) => app.status !== "pending");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">pending</Badge>;
      case "allotted":
        return <Badge className="bg-green-100 text-green-700">allotted</Badge>;
      case "unallocated":
        return <Badge className="bg-red-100 text-red-700">unallocated</Badge>;
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-700">refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/ipo" className="text-muted hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted hover:text-primary font-medium">Home</Link>
            <Link to="/ipo/status" className="text-primary font-medium">IPO Status</Link>
          </nav>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              RS
            </div>
            <span className="hidden md:block font-medium text-secondary">Rajesh Shah</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Current Status */}
        <Card className="finease-card mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Type <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Company <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Application No <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Exchange Ref <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Application Id <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        DP ID <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Qty <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        UPI <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">Exchange St</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplications.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-muted">
                        No pending IPO applications
                      </td>
                    </tr>
                  ) : (
                    currentApplications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{app.type}</td>
                        <td className="p-3 font-medium">{app.ipoName}</td>
                        <td className="p-3 text-sm">{app.applicationNo}</td>
                        <td className="p-3">{app.exchangeRef}</td>
                        <td className="p-3">{app.applicationId}</td>
                        <td className="p-3">{app.dpId}</td>
                        <td className="p-3">{app.qty}</td>
                        <td className="p-3">{app.upi}</td>
                        <td className="p-3">{getStatusBadge(app.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* IPO History */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary">IPO History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Type <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        IPO Name <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Application Id <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        DP ID <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Qty <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Exchange Code <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        UPI <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">
                      <div className="flex items-center gap-1">
                        Allotment Status <ChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">Exchange</th>
                  </tr>
                </thead>
                <tbody>
                  {historyApplications.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-muted">
                        No IPO history found
                      </td>
                    </tr>
                  ) : (
                    historyApplications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{app.type}</td>
                        <td className="p-3 font-medium">{app.ipoName}</td>
                        <td className="p-3">{app.applicationId}</td>
                        <td className="p-3">{app.dpId}</td>
                        <td className="p-3">{app.qty}</td>
                        <td className="p-3">{app.exchangeCode}</td>
                        <td className="p-3">{app.upi}</td>
                        <td className="p-3">{getStatusBadge(app.status)}</td>
                        <td className="p-3">Payment</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default IPOStatus;
