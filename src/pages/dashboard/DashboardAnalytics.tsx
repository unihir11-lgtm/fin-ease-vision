import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown, Star, Filter, BarChart3 } from "lucide-react";

const stockData = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2845.50, change: 2.35, marketCap: "19.2L Cr", pe: 28.5, sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy", price: 3920.75, change: -0.85, marketCap: "14.3L Cr", pe: 32.1, sector: "IT" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.30, change: 1.12, marketCap: "12.8L Cr", pe: 20.4, sector: "Banking" },
  { symbol: "INFY", name: "Infosys", price: 1485.60, change: -1.25, marketCap: "6.2L Cr", pe: 25.8, sector: "IT" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1125.45, change: 0.95, marketCap: "7.9L Cr", pe: 18.2, sector: "Banking" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1580.20, change: 3.15, marketCap: "8.9L Cr", pe: 45.2, sector: "Telecom" },
];

const topGainers = [
  { symbol: "ADANIENT", change: 5.2 },
  { symbol: "BHARTIARTL", change: 3.15 },
  { symbol: "RELIANCE", change: 2.35 },
];

const topLosers = [
  { symbol: "INFY", change: -1.25 },
  { symbol: "TCS", change: -0.85 },
  { symbol: "WIPRO", change: -0.65 },
];

const DashboardAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const filteredStocks = stockData.filter((stock) => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === "all" || stock.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Stock Analytics</h1>
          <p className="text-muted">Screen, analyze, and compare stocks</p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">NIFTY 50</span>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              +0.85%
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">22,450.75</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">SENSEX</span>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              +0.72%
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">73,850.25</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">BANK NIFTY</span>
            <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
              <TrendingDown className="w-3 h-3" />
              -0.32%
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">47,125.50</p>
        </div>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-secondary mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Top Gainers
          </h3>
          <div className="space-y-2">
            {topGainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <span className="font-medium text-secondary">{stock.symbol}</span>
                <span className="text-green-600 font-bold">+{stock.change}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-secondary mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Top Losers
          </h3>
          <div className="space-y-2">
            {topLosers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <span className="font-medium text-secondary">{stock.symbol}</span>
                <span className="text-red-600 font-bold">{stock.change}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Screener */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center">
          <h3 className="font-bold text-secondary flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Stock Screener
          </h3>
          <div className="flex-1 flex gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Search stocks..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Banking">Banking</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Telecom">Telecom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-muted text-sm">Symbol</th>
                <th className="text-left p-4 font-medium text-muted text-sm">Company</th>
                <th className="text-right p-4 font-medium text-muted text-sm">Price</th>
                <th className="text-right p-4 font-medium text-muted text-sm">Change</th>
                <th className="text-right p-4 font-medium text-muted text-sm">Market Cap</th>
                <th className="text-right p-4 font-medium text-muted text-sm">P/E</th>
                <th className="text-center p-4 font-medium text-muted text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-secondary">{stock.symbol}</td>
                  <td className="p-4 text-muted">{stock.name}</td>
                  <td className="p-4 text-right font-medium text-secondary">₹{stock.price.toLocaleString()}</td>
                  <td className={`p-4 text-right font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </td>
                  <td className="p-4 text-right text-muted">{stock.marketCap}</td>
                  <td className="p-4 text-right text-muted">{stock.pe}</td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="icon">
                      <Star className="w-4 h-4 text-muted hover:text-yellow-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
