import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import StudentLayout from "./components/student/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import Documents from "./pages/student/Documents";
import Applications from "./pages/student/Applications";
import AITest from "./pages/student/AITest";
import AIProfile from "./pages/student/AIProfile";
import Messages from "./pages/student/Messages";
import Payments from "./pages/student/Payments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="applications" element={<Applications />} />
            <Route path="ai-test" element={<AITest />} />
            <Route path="ai-profile" element={<AIProfile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="payments" element={<Payments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
