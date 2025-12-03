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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  PieChart,
  Receipt,
  FileSpreadsheet,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const reports = [
  { id: 1, name: "Portfolio Statement", description: "Complete holdings summary with current values", type: "portfolio", frequency: "Monthly", lastGenerated: "2024-01-01", format: "PDF", downloads: 12 },
  { id: 2, name: "Transaction History", description: "All buy, sell, and credit transactions", type: "transaction", frequency: "Monthly", lastGenerated: "2024-01-01", format: "Excel", downloads: 8 },
  { id: 3, name: "Capital Gains Report", description: "Short-term and long-term capital gains for tax filing", type: "tax", frequency: "Yearly", lastGenerated: "2024-04-01", format: "PDF", downloads: 5 },
  { id: 4, name: "Interest & Coupon Report", description: "All interest and coupon income received", type: "income", frequency: "Yearly", lastGenerated: "2024-04-01", format: "PDF", downloads: 7 },
  { id: 5, name: "TDS Certificate", description: "Form 16A for TDS deducted on investments", type: "tax", frequency: "Quarterly", lastGenerated: "2024-01-15", format: "PDF", downloads: 3 },
  { id: 6, name: "Investment Summary", description: "Overview of all investments by category", type: "portfolio", frequency: "Monthly", lastGenerated: "2024-01-20", format: "PDF", downloads: 15 },
];

const recentDownloads = [
  { name: "Portfolio_Statement_Dec2023.pdf", date: "2024-01-01", size: "245 KB", status: "completed" },
  { name: "Transactions_Q4_2023.xlsx", date: "2023-12-31", size: "128 KB", status: "completed" },
  { name: "Capital_Gains_FY2023.pdf", date: "2023-04-01", size: "312 KB", status: "completed" },
  { name: "Interest_Report_2023.pdf", date: "2023-12-28", size: "198 KB", status: "completed" },
];

const stats = [
  { label: "Available Reports", value: reports.length.toString(), icon: FileText, color: "bg-blue-100 text-blue-600" },
  { label: "Downloads This Month", value: "24", change: "+12%", positive: true, icon: Download, color: "bg-green-100 text-green-600" },
  { label: "Last Generated", value: "Jan 20", icon: Calendar, color: "bg-purple-100 text-purple-600" },
  { label: "Pending Reports", value: "0", icon: Clock, color: "bg-amber-100 text-amber-600" },
];

const DashboardReports = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const getIcon = (type: string) => {
    switch (type) {
      case "portfolio": return <PieChart className="w-5 h-5 text-primary" />;
      case "transaction": return <Receipt className="w-5 h-5 text-blue-500" />;
      case "tax": return <FileText className="w-5 h-5 text-green-500" />;
      case "income": return <TrendingUp className="w-5 h-5 text-amber-500" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getFormatBadge = (format: string) => {
    return format === "PDF" 
      ? <Badge className="bg-red-100 text-red-700">PDF</Badge>
      : <Badge className="bg-green-100 text-green-700">Excel</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Reports</h1>
          <p className="text-gray-500">Download statements and tax reports</p>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[160px]">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    {stat.change && (
                      <span className={`text-xs flex items-center ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                        <ArrowUpRight className="w-3 h-3" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Table */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Available Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Report</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead className="text-center">Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gray-100 rounded-xl">
                        {getIcon(report.type)}
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{report.name}</p>
                        <p className="text-xs text-gray-500 max-w-[300px]">{report.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.frequency}</Badge>
                  </TableCell>
                  <TableCell>{getFormatBadge(report.format)}</TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(report.lastGenerated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-center">{report.downloads}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Downloads */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>File Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDownloads.map((file, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-secondary">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(file.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-gray-500">{file.size}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="w-4 h-4" />
                      Re-download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReports;