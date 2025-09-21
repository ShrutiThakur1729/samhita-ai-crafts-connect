import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import UserSelection from "./pages/UserSelection";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import SellerOnboarding from "./pages/SellerOnboarding";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import EventsNear from "./pages/EventsNear";
import GeoLocation from "./pages/GeoLocation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/splash" element={<Splash />} />
          <Route path="/" element={<UserSelection />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/seller-onboarding" element={<SellerOnboarding />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/events" element={<EventsNear />} />
          <Route path="/geo-location" element={<GeoLocation />} />
          <Route path="/checkout" element={<div className="min-h-screen flex items-center justify-center bg-samhita-navy text-white"><p>Checkout Coming Soon</p></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
