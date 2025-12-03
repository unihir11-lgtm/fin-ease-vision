import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Clock, IndianRupee, ExternalLink } from "lucide-react";

const upcomingIPOs = [
  {
    id: "1",
    company: "Tech Solutions Ltd",
    priceRange: "₹450 - ₹475",
    lotSize: 30,
    minInvestment: 14250,
    issueSize: "₹1,200 Cr",
    openDate: "2024-02-15",
    closeDate: "2024-02-18",
    listingDate: "2024-02-25",
    status: "Upcoming",
    subscriptionStatus: null,
  },
  {
    id: "2",
    company: "Green Energy Corp",
    priceRange: "₹280 - ₹295",
    lotSize: 50,
    minInvestment: 14750,
    issueSize: "₹800 Cr",
    openDate: "2024-02-10",
    closeDate: "2024-02-13",
    listingDate: "2024-02-20",
    status: "Open",
    subscriptionStatus: "2.5x subscribed",
  },
  {
    id: "3",
    company: "FinServ Holdings",
    priceRange: "₹520 - ₹548",
    lotSize: 25,
    minInvestment: 13700,
    issueSize: "₹2,500 Cr",
    openDate: "2024-02-20",
    closeDate: "2024-02-23",
    listingDate: "2024-03-01",
    status: "Upcoming",
    subscriptionStatus: null,
  },
];

const appliedIPOs = [
  {
    id: "1",
    company: "Digital Payments Inc",
    appliedLots: 2,
    amount: 29000,
    status: "Allotted",
    shares: 60,
    listingGain: "+18%",
  },
  {
    id: "2",
    company: "Pharma Solutions",
    appliedLots: 1,
    amount: 15000,
    status: "Not Allotted",
    shares: 0,
    listingGain: null,
  },
];

const DashboardIPO = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">IPO</h1>
          <p className="text-muted">Apply for Initial Public Offerings</p>
        </div>
      </div>

      {/* Open & Upcoming IPOs */}
      <div>
        <h2 className="font-bold text-secondary mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Open & Upcoming IPOs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingIPOs.map((ipo) => (
            <div key={ipo.id} className="bg-white rounded-xl p-5 border border-border hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-secondary text-lg">{ipo.company}</h3>
                  <p className="text-sm text-muted">Issue Size: {ipo.issueSize}</p>
                </div>
                <Badge variant={ipo.status === "Open" ? "default" : "secondary"} className={ipo.status === "Open" ? "bg-green-500" : ""}>
                  {ipo.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted">Price Range</p>
                  <p className="font-medium text-secondary">{ipo.priceRange}</p>
                </div>
                <div>
                  <p className="text-muted">Lot Size</p>
                  <p className="font-medium text-secondary">{ipo.lotSize} shares</p>
                </div>
                <div>
                  <p className="text-muted">Min. Investment</p>
                  <p className="font-medium text-secondary">₹{ipo.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted">Open Date</p>
                  <p className="font-medium text-secondary">{ipo.openDate}</p>
                </div>
              </div>

              {ipo.subscriptionStatus && (
                <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-4">
                  {ipo.subscriptionStatus}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  Listing: {ipo.listingDate}
                </div>
                <Button size="sm" className="bg-primary" disabled={ipo.status !== "Open"}>
                  {ipo.status === "Open" ? "Apply Now" : "Notify Me"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applied IPOs */}
      <div>
        <h2 className="font-bold text-secondary mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Your IPO Applications
        </h2>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {appliedIPOs.map((ipo) => (
              <div key={ipo.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-secondary">{ipo.company}</h3>
                    <p className="text-sm text-muted">{ipo.appliedLots} lot(s) • ₹{ipo.amount.toLocaleString()}</p>
                  </div>
                  <Badge variant={ipo.status === "Allotted" ? "default" : "secondary"} className={ipo.status === "Allotted" ? "bg-green-500" : "bg-gray-500"}>
                    {ipo.status}
                  </Badge>
                </div>
                {ipo.status === "Allotted" && (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted">Shares: <span className="font-medium text-secondary">{ipo.shares}</span></span>
                    <span className="text-muted">Listing Gain: <span className="font-medium text-green-600">{ipo.listingGain}</span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIPO;
