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

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserMaster />} />
        <Route path="nps/users" element={<AdminNPSUsers />} />
        <Route path="nps/payments" element={<AdminNPSPayments />} />
        <Route path="nps/settlements" element={<AdminNPSSettlements />} />
        <Route path="cms/ipo" element={<AdminIPOManagement />} />
        <Route path="cms/bonds" element={<AdminBondManagement />} />
        <Route path="cms/fds" element={<AdminFDManagement />} />
        <Route path="logs" element={<AdminLogs />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
