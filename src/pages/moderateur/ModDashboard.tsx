import { Newspaper, Star, Home } from "lucide-react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { newsItems, featuredProjects } from "@/data/mockData";

export default function ModDashboard() {
  return (
    <>
      <PageHeader title="Tableau de bord Modérateur" description="Gérer le contenu public de la plateforme" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Actualités" value={newsItems.length} icon={Newspaper} />
        <StatCard label="Projets en avant" value={featuredProjects.filter((p) => p.featured).length} icon={Star} />
        <StatCard label="Contenu page d'accueil" value="Actif" icon={Home} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Dernières actualités</h2>
          <div className="space-y-3">
            {newsItems.map((n) => (
              <div key={n.id} className="flex items-start justify-between p-3 rounded-md bg-muted/40">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.date}</p>
                </div>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${n.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  {n.published ? "Publié" : "Brouillon"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Projets mis en avant</h2>
          <div className="space-y-3">
            {featuredProjects.filter((p) => p.featured).map((p) => (
              <div key={p.id} className="p-3 rounded-md bg-muted/40">
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-2 inline-block">{p.domain}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
