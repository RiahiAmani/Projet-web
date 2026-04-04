import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ResearchersPage from "@/pages/admin/ResearchersPage";
import PublicationsPage from "@/pages/admin/PublicationsPage";
import DomainsPage from "@/pages/admin/DomainsPage";
import UsersPage from "@/pages/admin/UsersPage";
import ModDashboard from "@/pages/moderateur/ModDashboard";
import HomepageContentPage from "@/pages/moderateur/HomepageContentPage";
import NewsPage from "@/pages/moderateur/NewsPage";
import FeaturedProjectsPage from "@/pages/moderateur/FeaturedProjectsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/chercheurs" element={<ResearchersPage />} />
            <Route path="/admin/publications" element={<PublicationsPage />} />
            <Route path="/admin/domaines" element={<DomainsPage />} />
            <Route path="/admin/utilisateurs" element={<UsersPage />} />
            <Route path="/moderateur" element={<ModDashboard />} />
            <Route path="/moderateur/accueil" element={<HomepageContentPage />} />
            <Route path="/moderateur/actualites" element={<NewsPage />} />
            <Route path="/moderateur/projets" element={<FeaturedProjectsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
