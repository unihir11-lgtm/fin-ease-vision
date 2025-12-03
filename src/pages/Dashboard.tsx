import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardBonds from "./dashboard/DashboardBonds";
import DashboardFDs from "./dashboard/DashboardFDs";
import DashboardIPO from "./dashboard/DashboardIPO";
import DashboardNPS from "./dashboard/DashboardNPS";
import DashboardAnalytics from "./dashboard/DashboardAnalytics";
import DashboardPortfolio from "./dashboard/DashboardPortfolio";
import DashboardKYC from "./dashboard/DashboardKYC";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="portfolio" element={<DashboardPortfolio />} />
        <Route path="transactions" element={<DashboardOverview />} />
        <Route path="ipo" element={<DashboardIPO />} />
        <Route path="bonds" element={<DashboardBonds />} />
        <Route path="fds" element={<DashboardFDs />} />
        <Route path="nps" element={<DashboardNPS />} />
        <Route path="analytics" element={<DashboardAnalytics />} />
        <Route path="kyc" element={<DashboardKYC />} />
        <Route path="profile" element={<DashboardOverview />} />
        <Route path="notifications" element={<DashboardOverview />} />
        <Route path="reports" element={<DashboardOverview />} />
        <Route path="settings" element={<DashboardOverview />} />
        <Route path="help" element={<DashboardOverview />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
