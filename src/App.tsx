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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
