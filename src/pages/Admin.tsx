import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUserMaster from "./admin/AdminUserMaster";
import AdminNPSUsers from "./admin/AdminNPSUsers";
import AdminNPSPayments from "./admin/AdminNPSPayments";
import AdminNPSSettlements from "./admin/AdminNPSSettlements";
import AdminIPOManagement from "./admin/AdminIPOManagement";
import AdminBondManagement from "./admin/AdminBondManagement";
import AdminFDManagement from "./admin/AdminFDManagement";
import AdminLogs from "./admin/AdminLogs";
import AdminIPOApplications from "./admin/AdminIPOApplications";
import AdminIPOAnalytics from "./admin/AdminIPOAnalytics";
import AdminBondOrders from "./admin/AdminBondOrders";
import AdminBondAnalytics from "./admin/AdminBondAnalytics";
import AdminFDBookings from "./admin/AdminFDBookings";
import AdminFDAnalytics from "./admin/AdminFDAnalytics";
import AdminRoleManagement from "./admin/AdminRoleManagement";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserMaster />} />
        {/* NPS Routes */}
        <Route path="nps/users" element={<AdminNPSUsers />} />
        <Route path="nps/payments" element={<AdminNPSPayments />} />
        <Route path="nps/settlements" element={<AdminNPSSettlements />} />
        {/* IPO Routes */}
        <Route path="ipo/management" element={<AdminIPOManagement />} />
        <Route path="ipo/applications" element={<AdminIPOApplications />} />
        <Route path="ipo/analytics" element={<AdminIPOAnalytics />} />
        {/* Bond Routes */}
        <Route path="bonds/management" element={<AdminBondManagement />} />
        <Route path="bonds/orders" element={<AdminBondOrders />} />
        <Route path="bonds/analytics" element={<AdminBondAnalytics />} />
        {/* FD Routes */}
        <Route path="fds/management" element={<AdminFDManagement />} />
        <Route path="fds/bookings" element={<AdminFDBookings />} />
        <Route path="fds/analytics" element={<AdminFDAnalytics />} />
        {/* System Routes */}
        <Route path="logs" element={<AdminLogs />} />
        <Route path="roles" element={<AdminRoleManagement />} />
        {/* Legacy route redirects */}
        <Route path="cms/ipo" element={<Navigate to="/admin/ipo/management" replace />} />
        <Route path="cms/bonds" element={<Navigate to="/admin/bonds/management" replace />} />
        <Route path="cms/fds" element={<Navigate to="/admin/fds/management" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;