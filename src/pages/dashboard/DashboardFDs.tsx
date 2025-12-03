import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userPortfolio, fixedDeposits } from "@/data/mockData";
import { Plus, ExternalLink, TrendingUp, IndianRupee, AlertCircle, Clock, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FDCalculator from "@/components/dashboard/FDCalculator";
import { Progress } from "@/components/ui/progress";

const DashboardFDs = () => {
  const totalPrincipal = userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);
  const totalMaturityValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);

  const calculateProgress = (startDate: string, maturityDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(maturityDate).getTime();
    const now = Date.now();
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  };

  const calculateDaysRemaining = (maturityDate: string) => {
    return Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">My Fixed Deposits</h1>
          <p className="text-muted">Manage your FD investments</p>
        </div>
        <Link to="/fds">
          <Button className="bg-primary gap-2">
            <Plus className="w-4 h-4" />
            Book New FD
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Total Principal</p>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalPrincipal.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Maturity Value</p>
          <p className="text-2xl font-bold text-primary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalMaturityValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Expected Interest</p>
          <p className="text-2xl font-bold text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            ₹{(totalMaturityValue - totalPrincipal).toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Active FDs</p>
          <p className="text-2xl font-bold text-green-700">{userPortfolio.fds.length}</p>
        </div>
      </div>

      <Tabs defaultValue="holdings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="holdings">My FDs</TabsTrigger>
          <TabsTrigger value="calculator">FD Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-secondary">Your Fixed Deposits</h2>
            </div>
            <div className="divide-y divide-border">
              {userPortfolio.fds.map((fd) => {
                const progress = calculateProgress(fd.startDate, fd.maturityDate);
                const daysRemaining = calculateDaysRemaining(fd.maturityDate);
                const isNearMaturity = daysRemaining <= 30;

                return (
                  <div key={fd.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                        <p className="text-sm text-muted">{fd.interestRate}% p.a. • {fd.payoutType}</p>
                      </div>
                      <div className="flex gap-2">
                        {isNearMaturity ? (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />{daysRemaining} days
                          </span>
                        ) : (
                          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Active</span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">Progress</span>
                        <span className="font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Principal</p>
                        <p className="font-medium text-secondary">₹{fd.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted">Maturity Value</p>
                        <p className="font-medium text-green-600">₹{fd.maturityValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted">Start Date</p>
                        <p className="font-medium text-secondary">{fd.startDate}</p>
                      </div>
                      <div>
                        <p className="text-muted">Maturity Date</p>
                        <p className="font-medium text-secondary">{fd.maturityDate}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex gap-2">
                      <Button variant="outline" size="sm">View Statement</Button>
                      <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Premature Withdrawal
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <FDCalculator />
        </TabsContent>
      </Tabs>

      {/* Explore More */}
      <div>
        <h2 className="font-bold text-secondary mb-4">Explore FD Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fixedDeposits.slice(0, 3).map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`}>
              <div className="bg-white rounded-xl p-4 border border-border hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{fd.logo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      fd.creditRating === "AAA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>{fd.creditRating}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted" />
                </div>
                <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted">{fd.tenure}</span>
                  <span className="text-lg font-bold text-primary">{fd.interestRate}% p.a.</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardFDs;
