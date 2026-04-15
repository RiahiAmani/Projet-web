import { Users, BookOpen, FolderTree, UserCog } from "lucide-react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { researchers, publications, domains, userAccounts } from "@/data/mockData";

export default function AdminDashboard() {
  const recentPubs = publications.slice(0, 3);

  return (
    <>
      <PageHeader title="Tableau de bord Admin" description="Vue d'ensemble de la plateforme IA-Technology" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Chercheurs" value={researchers.length} icon={Users} trend="+2 ce mois" />
        <StatCard label="Publications" value={publications.length} icon={BookOpen} trend="+3 ce mois" />
        <StatCard label="Domaines" value={domains.length} icon={FolderTree} />
        <StatCard label="Utilisateurs" value={userAccounts.length} icon={UserCog} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Publications récentes</h2>
          <div className="space-y-3">
            {recentPubs.map((pub) => (
              <div key={pub.id} className="flex items-start justify-between gap-3 p-3 rounded-md bg-muted/40">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{pub.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pub.authors.join(", ")}</p>
                </div>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                  pub.status === "published" ? "bg-success/10 text-success" :
                  pub.status === "review" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>{pub.status === "published" ? "Publié" : pub.status === "review" ? "En revue" : "Brouillon"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Domaines de recherche</h2>
          <div className="space-y-3">
            {domains.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-md bg-muted/40">
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.description}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{d.researcherCount} chercheurs</p>
                  <p>{d.publicationCount} publications</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
