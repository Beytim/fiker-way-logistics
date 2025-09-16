import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import Index from "./pages/Index";
import TrackingPage from "./pages/TrackingPage";
import NotFound from "./pages/NotFound";
import EnhancedDashboard from "./components/EnhancedDashboard";

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
            <EnhancedDashboard userType="shipper" userName="Demo Shipper" userRating={4.7} />
          } />
          <Route path="/driver" element={
            <EnhancedDashboard userType="driver" userName="Alemayehu Tadesse" userRating={4.9} />
          } />
          <Route path="/admin" element={
            <EnhancedDashboard userType="admin" userName="Admin User" userRating={4.8} />
          } />
          <Route path="/track" element={
            <TrackingPage />
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
