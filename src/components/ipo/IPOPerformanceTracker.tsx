import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Award, Target, BarChart3 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ipoData } from "@/data/ipoData";

const IPOPerformanceTracker = () => {
  // Get recently listed IPOs with performance data
  const listedIPOs = ipoData
    .filter(ipo => ipo.status === "Listed" || ipo.status === "Closed")
    .filter(ipo => ipo.listingGain !== undefined)
    .slice(0, 8);

  // Calculate aggregate stats
  const totalListings = listedIPOs.length;
  const gainers = listedIPOs.filter(ipo => (ipo.listingGain || 0) > 0).length;
  const losers = listedIPOs.filter(ipo => (ipo.listingGain || 0) < 0).length;
  const avgGain = totalListings > 0 
    ? (listedIPOs.reduce((acc, ipo) => acc + (ipo.listingGain || 0), 0) / totalListings).toFixed(1)
    : "0";
  const topGainer = listedIPOs.reduce((max, ipo) => (ipo.listingGain || 0) > (max.listingGain || 0) ? ipo : max, listedIPOs[0]);

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recent IPO Performance
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Last {totalListings} Listings
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Listings</p>
            <p className="text-2xl font-bold text-primary">{totalListings}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <p className="text-xs text-muted-foreground">Gainers</p>
            </div>
            <p className="text-2xl font-bold text-green-600">{gainers}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingDown className="w-3 h-3 text-red-600" />
              <p className="text-xs text-muted-foreground">Losers</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{losers}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl text-center">
            <p className="text-xs text-muted-foreground mb-1">Avg Gain</p>
            <p className={`text-2xl font-bold ${Number(avgGain) >= 0 ? "text-blue-600" : "text-red-600"}`}>
              {Number(avgGain) >= 0 ? "+" : ""}{avgGain}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-xl text-center">
            <p className="text-xs text-muted-foreground mb-1">Top Gainer</p>
            <p className="text-lg font-bold text-amber-600 truncate">{topGainer?.companyShortName}</p>
            <Badge className="bg-green-100 text-green-700 border-0 text-xs mt-1">
              +{topGainer?.listingGain}%
            </Badge>
          </div>
        </div>

        {/* Performance Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-secondary">IPO Name</TableHead>
                <TableHead className="text-center font-semibold text-secondary">Type</TableHead>
                <TableHead className="text-center font-semibold text-secondary">Issue Price</TableHead>
                <TableHead className="text-center font-semibold text-secondary">Listing Price</TableHead>
                <TableHead className="text-center font-semibold text-secondary">Listing Date</TableHead>
                <TableHead className="text-right font-semibold text-secondary">Gain/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listedIPOs.map((ipo, index) => {
                const listingPrice = ipo.priceRange.max * (1 + (ipo.listingGain || 0) / 100);
                const isGainer = (ipo.listingGain || 0) >= 0;
                
                return (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isGainer ? "bg-green-100" : "bg-red-100"}`}>
                          {isGainer ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{ipo.companyShortName}</p>
                          <p className="text-xs text-muted-foreground">{ipo.industry}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {ipo.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      ₹{ipo.priceRange.max}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      ₹{listingPrice.toFixed(0)}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground text-sm">
                      {new Date(ipo.listingDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit"
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        className={`${
                          isGainer 
                            ? "bg-green-100 text-green-700 border-0" 
                            : "bg-red-100 text-red-700 border-0"
                        } font-semibold`}
                      >
                        {isGainer ? "+" : ""}{ipo.listingGain}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Success Rate Bar */}
        <div className="mt-6 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary">IPO Success Rate</span>
            <span className="text-sm font-bold text-primary">
              {totalListings > 0 ? ((gainers / totalListings) * 100).toFixed(0) : 0}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
              style={{ width: `${totalListings > 0 ? (gainers / totalListings) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {gainers} out of {totalListings} IPOs listed with positive returns
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOPerformanceTracker;
