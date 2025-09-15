import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import Index from "./pages/Index";
import TrackingPage from "./pages/TrackingPage";
import NotFound from "./pages/NotFound";
import UnifiedDashboard from "./components/UnifiedDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          {/* Landing page without mobile layout */}
          <Route path="/" element={<Index />} />
          
          {/* All dashboard routes with mobile layout */}
          <Route path="/shipper" element={
            <MobileLayout>
              <div className="container mx-auto px-4 py-8">
                <UnifiedDashboard userType="shipper" />
              </div>
            </MobileLayout>
          } />
          <Route path="/driver" element={
            <MobileLayout>
              <div className="container mx-auto px-4 py-8">
                <UnifiedDashboard userType="driver" />
              </div>
            </MobileLayout>
          } />
          <Route path="/admin" element={
            <MobileLayout>
              <div className="container mx-auto px-4 py-8">
                <UnifiedDashboard userType="admin" />
              </div>
            </MobileLayout>
          } />
          <Route path="/track" element={
            <MobileLayout>
              <TrackingPage />
            </MobileLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
