import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users, BookOpen, FolderTree, UserCog, LayoutDashboard,
  Newspaper, Star, Home, ChevronLeft, ChevronRight, Shield, Edit3
} from "lucide-react";

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/admin/chercheurs", icon: Users, label: "Chercheurs" },
  { to: "/admin/publications", icon: BookOpen, label: "Publications" },
  { to: "/admin/domaines", icon: FolderTree, label: "Domaines" },
  { to: "/admin/utilisateurs", icon: UserCog, label: "Utilisateurs" },
];

const modLinks = [
  { to: "/moderateur", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/moderateur/accueil", icon: Home, label: "Page d'accueil" },
  { to: "/moderateur/actualites", icon: Newspaper, label: "Actualités" },
  { to: "/moderateur/projets", icon: Star, label: "Projets en avant" },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isModerateur = location.pathname.startsWith("/moderateur");

  const links = isModerateur ? modLinks : adminLinks;
  const roleLabel = isModerateur ? "Modérateur" : "Administrateur";
  const RoleIcon = isModerateur ? Edit3 : Shield;

  return (
    <aside
      className={`flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <span className="text-sidebar-primary-foreground font-bold text-sm">IA</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-sidebar-accent-foreground truncate">IA-Technology</p>
            <p className="text-xs text-sidebar-muted truncate">Recherche & Innovation</p>
          </div>
        )}
      </div>

      {/* Role switcher */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <div className="flex gap-1">
          <NavLink
            to="/admin"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !isModerateur ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-muted hover:text-sidebar-foreground"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <Shield size={14} />
            {!collapsed && "Admin"}
          </NavLink>
          <NavLink
            to="/moderateur"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              isModerateur ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-muted hover:text-sidebar-foreground"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <Edit3 size={14} />
            {!collapsed && "Modérateur"}
          </NavLink>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-sidebar-muted font-semibold">
            {roleLabel}
          </p>
        )}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin" || link.to === "/moderateur"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            <link.icon size={18} className="shrink-0" />
            {!collapsed && link.label}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
