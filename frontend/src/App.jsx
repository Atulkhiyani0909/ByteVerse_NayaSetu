import React from "react"
import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Complaint from "./pages/Complaint";
import LegalAid from "./pages/LegalAid";
import About from "./pages/About";
import LawyerProfile from './pages/lawyerProfile'
import { AuthProvider } from "../hooks/auth-context"
import Dashboard from "./pages/dashboard"

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/legal-aid" element={<LegalAid />} />
                <Route path="/about" element={<About />} />
                <Route path="/lawyerProfile/:id" element={<LawyerProfile/>}/>
                <Route path="/adminDashboard" element={<Dashboard/>}/>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
