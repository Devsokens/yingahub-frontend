import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

// Student
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentDocuments from "./pages/student/Documents";
import StudentApplications from "./pages/student/Applications";
import AITest from "./pages/student/AITest";
import AIProfile from "./pages/student/AIProfile";
import StudentMessages from "./pages/student/Messages";
import StudentPayments from "./pages/student/Payments";

// Parent
import ParentLayout from "./components/parent/ParentLayout";
import ParentDashboard from "./pages/parent/Dashboard";
import FinancialProfile from "./pages/parent/FinancialProfile";
import ChildTracking from "./pages/parent/ChildTracking";
import ParentDocuments from "./pages/parent/Documents";
import Budget from "./pages/parent/Budget";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminDocuments from "./pages/admin/Documents";
import AdminApplications from "./pages/admin/Applications";
import AdminMessages from "./pages/admin/Messages";
import AdminUniversities from "./pages/admin/Universities";
import AdminStats from "./pages/admin/Stats";

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

          {/* Student */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="documents" element={<StudentDocuments />} />
            <Route path="applications" element={<StudentApplications />} />
            <Route path="ai-test" element={<AITest />} />
            <Route path="ai-profile" element={<AIProfile />} />
            <Route path="messages" element={<StudentMessages />} />
            <Route path="payments" element={<StudentPayments />} />
          </Route>

          {/* Parent */}
          <Route path="/parent" element={<ParentLayout />}>
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="financial" element={<FinancialProfile />} />
            <Route path="child-tracking" element={<ChildTracking />} />
            <Route path="documents" element={<ParentDocuments />} />
            <Route path="budget" element={<Budget />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
