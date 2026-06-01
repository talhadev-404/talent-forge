import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateApplications from "./pages/candidate/Applications";
import CandidateProfile from "./pages/candidate/Profile";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterJobPostings from "./pages/recruiter/JobPostings";
import RecruiterCandidates from "./pages/recruiter/Candidates";
import RecruiterInterviews from "./pages/recruiter/Interviews";
import RecruiterAnalytics from "./pages/recruiter/Analytics";
import InterviewerDashboard from "./pages/interviewer/Dashboard";
import InterviewerInterviews from "./pages/interviewer/Interviews";
import InterviewerEvaluations from "./pages/interviewer/Evaluations";
import InterviewerTemplates from "./pages/interviewer/Templates";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUserManagement from "./pages/admin/UserManagement";
import AdminSystemSettings from "./pages/admin/SystemSettings";
import AdminSecurity from "./pages/admin/Security";
import AdminAnalytics from "./pages/admin/Analytics";
import JobBoard from "./pages/candidate/JobBoard";
import InterviewRoom from "./pages/InterviewRoom";
import CodingAssessment from "./pages/CodingAssessment";
import LiveInterview from "./pages/LiveInterview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Candidate Routes */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/jobs" element={<JobBoard />} />
            <Route path="/candidate/applications" element={<CandidateApplications />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            
            {/* Recruiter Routes */}
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/jobs" element={<RecruiterJobPostings />} />
            <Route path="/recruiter/candidates" element={<RecruiterCandidates />} />
            <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
            <Route path="/recruiter/analytics" element={<RecruiterAnalytics />} />
            
            {/* Interviewer Routes */}
            <Route path="/interviewer/dashboard" element={<InterviewerDashboard />} />
            <Route path="/interviewer/interviews" element={<InterviewerInterviews />} />
            <Route path="/interviewer/evaluations" element={<InterviewerEvaluations />} />
            <Route path="/interviewer/templates" element={<InterviewerTemplates />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/settings" element={<AdminSystemSettings />} />
            <Route path="/admin/security" element={<AdminSecurity />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            
            {/* Shared Interview Features */}
            <Route path="/interview/:id" element={<InterviewRoom />} />
            <Route path="/coding-assessment/:id" element={<CodingAssessment />} />
            <Route path="/live-interview" element={<LiveInterview />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;