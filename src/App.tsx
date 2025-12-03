import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import KYC from "./pages/KYC";
import Dashboard from "./pages/Dashboard";
import Bonds from "./pages/Bonds";
import BondDetails from "./pages/BondDetails";
import FDs from "./pages/FDs";
import FDDetails from "./pages/FDDetails";
import IPO from "./pages/IPO";
import IPODetails from "./pages/IPODetails";
import IPOStatus from "./pages/IPOStatus";
import Calculators from "./pages/Calculators";
import NPSRegistration from "./pages/NPSRegistration";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/bonds/:id" element={<BondDetails />} />
          <Route path="/fds" element={<FDs />} />
          <Route path="/fds/:id" element={<FDDetails />} />
          <Route path="/ipo" element={<IPO />} />
          <Route path="/ipo/status" element={<IPOStatus />} />
          <Route path="/ipo/:id" element={<IPODetails />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/nps/register" element={<NPSRegistration />} />
          <Route path="/admin/*" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
