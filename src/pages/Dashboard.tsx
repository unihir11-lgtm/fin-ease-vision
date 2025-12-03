import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardBonds from "./dashboard/DashboardBonds";
import DashboardFDs from "./dashboard/DashboardFDs";
import DashboardIPO from "./dashboard/DashboardIPO";
import DashboardNPS from "./dashboard/DashboardNPS";
import DashboardPortfolio from "./dashboard/DashboardPortfolio";
import DashboardKYC from "./dashboard/DashboardKYC";
import DashboardTransactions from "./dashboard/DashboardTransactions";
import DashboardProfile from "./dashboard/DashboardProfile";
import DashboardNotifications from "./dashboard/DashboardNotifications";
import DashboardReports from "./dashboard/DashboardReports";
import DashboardSettings from "./dashboard/DashboardSettings";
import DashboardHelp from "./dashboard/DashboardHelp";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="portfolio" element={<DashboardPortfolio />} />
        <Route path="transactions" element={<DashboardTransactions />} />
        <Route path="ipo" element={<DashboardIPO />} />
        <Route path="bonds" element={<DashboardBonds />} />
        <Route path="fds" element={<DashboardFDs />} />
        <Route path="nps" element={<DashboardNPS />} />
        <Route path="kyc" element={<DashboardKYC />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="notifications" element={<DashboardNotifications />} />
        <Route path="reports" element={<DashboardReports />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="help" element={<DashboardHelp />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
