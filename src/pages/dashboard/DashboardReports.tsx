import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  PieChart,
  Receipt,
  FileSpreadsheet,
  Eye,
} from "lucide-react";
import { useState } from "react";

const reports = [
  {
    id: 1,
    name: "Portfolio Statement",
    description: "Complete holdings summary with current values",
    type: "portfolio",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    format: "PDF",
  },
  {
    id: 2,
    name: "Transaction History",
    description: "All buy, sell, and credit transactions",
    type: "transaction",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    format: "Excel",
  },
  {
    id: 3,
    name: "Capital Gains Report",
    description: "Short-term and long-term capital gains for tax filing",
    type: "tax",
    frequency: "Yearly",
    lastGenerated: "2024-04-01",
    format: "PDF",
  },
  {
    id: 4,
    name: "Interest & Coupon Report",
    description: "All interest and coupon income received",
    type: "income",
    frequency: "Yearly",
    lastGenerated: "2024-04-01",
    format: "PDF",
  },
  {
    id: 5,
    name: "TDS Certificate",
    description: "Form 16A for TDS deducted on investments",
    type: "tax",
    frequency: "Quarterly",
    lastGenerated: "2024-01-15",
    format: "PDF",
  },
];

const recentDownloads = [
  { name: "Portfolio_Statement_Dec2023.pdf", date: "2024-01-01", size: "245 KB" },
  { name: "Transactions_Q4_2023.xlsx", date: "2023-12-31", size: "128 KB" },
  { name: "Capital_Gains_FY2023.pdf", date: "2023-04-01", size: "312 KB" },
];

const DashboardReports = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const getIcon = (type: string) => {
    switch (type) {
      case "portfolio":
        return <PieChart className="w-5 h-5 text-primary" />;
      case "transaction":
        return <Receipt className="w-5 h-5 text-blue-500" />;
      case "tax":
        return <FileText className="w-5 h-5 text-green-500" />;
      case "income":
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Reports</h1>
          <p className="text-muted">Download statements and tax reports</p>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">FY 2024-25</SelectItem>
            <SelectItem value="2023">FY 2023-24</SelectItem>
            <SelectItem value="2022">FY 2022-23</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">Available Reports</p>
                <p className="text-xl font-bold text-secondary">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Downloads This Month</p>
                <p className="text-xl font-bold text-secondary">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Last Generated</p>
                <p className="text-xl font-bold text-secondary">Jan 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="finease-card hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">{getIcon(report.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-secondary">{report.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {report.format}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                    <span>{report.frequency}</span>
                    <span>•</span>
                    <span>
                      Last: {new Date(report.lastGenerated).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="finease-btn">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDownloads.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted" />
                  <div>
                    <p className="font-medium text-secondary text-sm">{file.name}</p>
                    <p className="text-xs text-muted">
                      {new Date(file.date).toLocaleDateString("en-IN")} • {file.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReports;
