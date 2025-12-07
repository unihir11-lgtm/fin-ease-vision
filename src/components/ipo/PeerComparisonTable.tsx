import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PeerData {
  company: string;
  epsBasic: number;
  epsDiluted: number;
  nav: number;
  pe: number;
  ronw: number;
}

interface PeerComparisonTableProps {
  companyName: string;
  priceMax: number;
  peers: PeerData[];
}

const PeerComparisonTable = ({ companyName, priceMax, peers }: PeerComparisonTableProps) => {
  // Add current IPO to comparison
  const currentCompanyData: PeerData = {
    company: companyName + " (IPO)",
    epsBasic: priceMax / 25, // Assumed P/E of 25
    epsDiluted: priceMax / 26,
    nav: priceMax * 0.4,
    pe: 25,
    ronw: 22.5,
  };

  const allPeers = [currentCompanyData, ...peers];

  const getComparisonBadge = (value: number, average: number, higherIsBetter: boolean = true) => {
    const diff = ((value - average) / average) * 100;
    if (higherIsBetter) {
      if (diff > 10) return <Badge className="bg-green-100 text-green-700 border-0 text-xs">Above Avg</Badge>;
      if (diff < -10) return <Badge className="bg-red-100 text-red-700 border-0 text-xs">Below Avg</Badge>;
    } else {
      if (diff < -10) return <Badge className="bg-green-100 text-green-700 border-0 text-xs">Below Avg</Badge>;
      if (diff > 10) return <Badge className="bg-red-100 text-red-700 border-0 text-xs">Above Avg</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">At Par</Badge>;
  };

  const avgPE = allPeers.reduce((acc, p) => acc + p.pe, 0) / allPeers.length;
  const avgRONW = allPeers.reduce((acc, p) => acc + p.ronw, 0) / allPeers.length;

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Peer Comparison
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Better than peers
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Below peers
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-secondary">Company</TableHead>
                <TableHead className="text-center font-semibold text-secondary">EPS (Basic)</TableHead>
                <TableHead className="text-center font-semibold text-secondary">EPS (Diluted)</TableHead>
                <TableHead className="text-center font-semibold text-secondary">NAV (₹)</TableHead>
                <TableHead className="text-center font-semibold text-secondary">P/E Ratio</TableHead>
                <TableHead className="text-center font-semibold text-secondary">RoNW (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPeers.map((peer, index) => (
                <TableRow 
                  key={index} 
                  className={index === 0 ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <Badge className="bg-primary/20 text-primary border-0 text-xs">IPO</Badge>
                      )}
                      <span className={index === 0 ? "text-primary font-semibold" : "text-secondary"}>
                        {peer.company}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">₹{peer.epsBasic.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">₹{peer.epsDiluted.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">₹{peer.nav.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">{peer.pe.toFixed(1)}x</span>
                      {index === 0 && getComparisonBadge(peer.pe, avgPE, false)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">{peer.ronw.toFixed(1)}%</span>
                      {index === 0 && getComparisonBadge(peer.ronw, avgRONW, true)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 border-t">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Industry Avg P/E</p>
            <p className="font-bold text-secondary">{avgPE.toFixed(1)}x</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Industry Avg RoNW</p>
            <p className="font-bold text-secondary">{avgRONW.toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">IPO P/E vs Avg</p>
            <p className={`font-bold ${currentCompanyData.pe < avgPE ? "text-green-600" : "text-red-600"}`}>
              {currentCompanyData.pe < avgPE ? "-" : "+"}{Math.abs(currentCompanyData.pe - avgPE).toFixed(1)}x
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Valuation</p>
            <Badge className={currentCompanyData.pe < avgPE ? "bg-green-100 text-green-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>
              {currentCompanyData.pe < avgPE ? "Fairly Priced" : "Premium Valuation"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparisonTable;
