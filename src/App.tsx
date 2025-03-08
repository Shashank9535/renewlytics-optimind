
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Segments from "./pages/Segments";
import Predictions from "./pages/Predictions";
import Import from "./pages/Import";
import NotFound from "./pages/NotFound";
import Automations from "./pages/Automations";
import Integrations from "./pages/Integrations";
import Landing from "./pages/Landing";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing page as the default route */}
              <Route path="/" element={<Landing />} />
              
              {/* Dashboard routes - no longer protected */}
              <Route path="/dashboard" element={<Index />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/segments" element={<Segments />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/import" element={<Import />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/integrations" element={<Integrations />} />
              
              {/* Redirect /auth route to dashboard */}
              <Route path="/auth" element={<Navigate to="/dashboard" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
