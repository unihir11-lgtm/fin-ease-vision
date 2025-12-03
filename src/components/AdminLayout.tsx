import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Dashboard Overview</h1>
            <p className="text-sm text-muted flex items-center gap-2">
              <span>📅</span> {today}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input placeholder="Search..." className="pl-10 w-[200px] bg-gray-50" />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-muted" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
