import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";

// Admin pages (Personne 4 — untouched)
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ResearchersPage from "@/pages/admin/ResearchersPage";
import PublicationsPage from "@/pages/admin/PublicationsPage";
import DomainsPage from "@/pages/admin/DomainsPage";
import UsersPage from "@/pages/admin/UsersPage";

// Moderateur pages (Personne 4 — untouched)
import ModDashboard from "@/pages/moderateur/ModDashboard";
import HomepageContentPage from "@/pages/moderateur/HomepageContentPage";
import NewsPage from "@/pages/moderateur/NewsPage";
import FeaturedProjectsPage from "@/pages/moderateur/FeaturedProjectsPage";

// Public pages (Personne 5) — all inside DashboardLayout
import PublicHomePage from "@/pages/public/PublicHomePage";
import SearchPublicationsPage from "@/pages/public/SearchPublicationsPage";
import PublicationDetailPage from "@/pages/public/PublicationDetailPage";
import LoginPage from "@/pages/public/LoginPage";
import RegisterPage from "@/pages/public/RegisterPage";
import UserAccountPage from "@/pages/public/UserAccountPage";

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
            {/* ALL routes share DashboardLayout — same dark sidebar */}
            <Route element={<DashboardLayout />}>
              {/* ── Public routes (Personne 5) ── */}
              <Route path="/" element={<PublicHomePage />} />
              <Route path="/recherche" element={<SearchPublicationsPage />} />
              <Route path="/publications/:id" element={<PublicationDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/inscription" element={<RegisterPage />} />
              <Route path="/mon-compte" element={<UserAccountPage />} />

              {/* ── Admin routes (Personne 4) ── */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/chercheurs" element={<ResearchersPage />} />
              <Route path="/admin/publications" element={<PublicationsPage />} />
              <Route path="/admin/domaines" element={<DomainsPage />} />
              <Route path="/admin/utilisateurs" element={<UsersPage />} />

              {/* ── Moderateur routes (Personne 4) ── */}
              <Route path="/moderateur" element={<ModDashboard />} />
              <Route path="/moderateur/accueil" element={<HomepageContentPage />} />
              <Route path="/moderateur/actualites" element={<NewsPage />} />
              <Route path="/moderateur/projets" element={<FeaturedProjectsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
