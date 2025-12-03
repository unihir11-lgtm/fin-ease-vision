import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUserMaster from "./admin/AdminUserMaster";
import AdminNPSUsers from "./admin/AdminNPSUsers";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserMaster />} />
        <Route path="nps/users" element={<AdminNPSUsers />} />
        <Route path="nps/payments" element={<AdminDashboard />} />
        <Route path="nps/settlements" element={<AdminDashboard />} />
        <Route path="cms/ipo" element={<AdminDashboard />} />
        <Route path="cms/bonds" element={<AdminDashboard />} />
        <Route path="cms/fds" element={<AdminDashboard />} />
        <Route path="logs" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
