import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Product from "./pages/Product";
import EntrepreneurGuide from "./pages/EntrepreneurGuide";
import EstateMarketplace from "./pages/EstateMarketplace";
import PropertyDetails from "./pages/PropertyDetails";
import VendorProfile from "./pages/VendorProfile";
import EquipmentDetails from "./pages/EquipmentDetails";
import { LoginPage } from "@/components/auth/LoginPage";
import { RegistrationPage } from "@/components/auth/RegistrationPage";
import { CookieConsent } from "@/components/layout/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/product" element={<Product />} />
            <Route path="/entrepreneur-guide" element={<EntrepreneurGuide />} />
            <Route path="/marketplace/estate" element={<EstateMarketplace />} />
            <Route path="/marketplace/estate/:id" element={<PropertyDetails />} />
            <Route path="/marketplace/vendor/:id" element={<VendorProfile />} />
            <Route path="/marketplace/equipment/:id" element={<EquipmentDetails />} />

            {/* Authenticated app */}
            <Route path="/app" element={<Index />} />
            <Route path="/dashboard/*" element={<Index />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
