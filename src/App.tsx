
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
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Automations from "./pages/Automations";
import Integrations from "./pages/Integrations";
import Landing from "./pages/Landing";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Initialize Supabase client with project ID
const supabaseUrl = 'https://guqqljsjqxhxdklufgyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cXFsanNqcXhoeGRrbHVmZ3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNTA1OTAsImV4cCI6MjAyMjgyNjU5MH0.OdYDnFbZ6D9ZMm-oMPtK1eA1LqvXYIg7LCKhk7m-lDc';

// Create a single Supabase client instance to avoid duplicate instances
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/auth" />;
    return <>{children}</>;
  };

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
              
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Navigate to="/auth" />} />
              
              {/* Protected dashboard routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/segments" 
                element={
                  <ProtectedRoute>
                    <Segments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/predictions" 
                element={
                  <ProtectedRoute>
                    <Predictions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/import" 
                element={
                  <ProtectedRoute>
                    <Import />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/automations" 
                element={
                  <ProtectedRoute>
                    <Automations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/integrations" 
                element={
                  <ProtectedRoute>
                    <Integrations />
                  </ProtectedRoute>
                } 
              />
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
