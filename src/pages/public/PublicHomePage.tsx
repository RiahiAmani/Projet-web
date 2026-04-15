import { Link } from "react-router-dom";
import { Users, BookOpen, FolderTree, Star, Search, ArrowRight } from "lucide-react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publications, researchers, domains, newsItems, featuredProjects } from "@/data/mockData";

export default function PublicHomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const publishedPubs = publications.filter((p) => p.status === "published").slice(0, 3);
  const publishedNews = newsItems.filter((n) => n.published).slice(0, 2);
  const featuredProjs = featuredProjects.filter((p) => p.featured).slice(0, 2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recherche${search.trim() ? `?q=${encodeURIComponent(search)}` : ""}`);
  };

  return (
    <>
      <PageHeader
        title="Page d'accueil"
        description="Bienvenue sur la plateforme IA-Technology — Recherche & Innovation"
        actions={
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une publication..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button type="submit" size="sm">Rechercher</Button>
          </form>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Chercheurs" value={researchers.length} icon={Users} />
        <StatCard label="Publications" value={publications.filter((p) => p.status === "published").length} icon={BookOpen} />
        <StatCard label="Domaines" value={domains.length} icon={FolderTree} />
        <StatCard label="Projets en avant" value={featuredProjects.filter((p) => p.featured).length} icon={Star} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent publications */}
        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Publications récentes</h2>
            <Link to="/recherche">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Voir tout <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {publishedPubs.map((pub) => (
              <Link key={pub.id} to={`/publications/${pub.id}`}>
                <div className="flex items-start justify-between gap-3 p-3 rounded-md bg-muted/40 hover:bg-muted/70 transition-colors cursor-pointer">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{pub.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pub.authors.join(", ")}</p>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium bg-success/10 text-success">
                    Publié
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Domaines */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actualités */}
        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Actualités</h2>
          <div className="space-y-3">
            {publishedNews.map((news) => (
              <div key={news.id} className="p-3 rounded-md bg-muted/40">
                <p className="text-sm font-medium">{news.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{news.date}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{news.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projets en avant */}
        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Projets en avant</h2>
          <div className="space-y-3">
            {featuredProjs.map((project) => (
              <div key={project.id} className="flex items-start justify-between gap-3 p-3 rounded-md bg-muted/40">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{project.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.description}</p>
                </div>
                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                  {project.domain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
