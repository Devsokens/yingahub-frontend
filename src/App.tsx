import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Base44AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

// Student
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentApplications from "./pages/student/Applications";
import StudentApplicationDetail from "./pages/student/ApplicationDetail";
import StudentApplicationNew from "./pages/student/ApplicationNew";
import UniversityCatalogue from "./pages/student/UniversityCatalogue";
import StudentSettings from "./pages/student/Settings";
import AITest from "./pages/student/AITest";
import AIProfile from "./pages/student/AIProfile";
import StudentMessages from "./pages/student/Messages";
import StudentPayments from "./pages/student/Payments";
import PaymentGateway from "./pages/student/PaymentGateway";

// University
import UniversityLayout from "./components/university/UniversityLayout";
import UniversityDashboard from "./pages/university/Dashboard";
import UniversityApplications from "./pages/university/Applications";
import UniversityApplicationReview from "./pages/university/ApplicationReview";
import UniversityMessages from "./pages/university/Messages";
import UniversitySettings from "./pages/university/Settings";


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
import AdminStudentDetail from "./pages/admin/StudentDetail";
import AdminApplications from "./pages/admin/Applications";
import AdminApplicationDetail from "./pages/admin/ApplicationDetail";
import AdminApplicationReview from "./pages/admin/ApplicationReview";
import AdminMessages from "./pages/admin/Messages";
import AdminUniversities from "./pages/admin/Universities";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Base44AuthProvider>
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
              <Route path="catalogue" element={<UniversityCatalogue />} />
              <Route path="applications" element={<StudentApplications />} />
              <Route path="applications/new" element={<StudentApplicationNew />} />
              <Route path="applications/:id" element={<StudentApplicationDetail />} />
              <Route path="ai-test" element={<AITest />} />
              <Route path="ai-profile" element={<AIProfile />} />
              <Route path="messages" element={<StudentMessages />} />
              <Route path="payments" element={<StudentPayments />} />
              <Route path="payment" element={<PaymentGateway />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>

            {/* University */}
            <Route path="/university" element={<UniversityLayout />}>
              <Route path="dashboard" element={<UniversityDashboard />} />
              <Route path="applications" element={<UniversityApplications />} />
              <Route path="applications/:id" element={<UniversityApplicationReview />} />
              <Route path="messages" element={<UniversityMessages />} />

              <Route path="settings" element={<UniversitySettings />} />
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
              <Route path="students/:id" element={<AdminStudentDetail />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="applications/:id" element={<AdminApplicationDetail />} />
              <Route path="applications/:id/review" element={<AdminApplicationReview />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Base44AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
