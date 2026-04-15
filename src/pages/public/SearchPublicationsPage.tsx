import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { publications, domains } from "@/data/mockData";

export default function SearchPublicationsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [domainFilter, setDomainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const matchSearch =
        !search.trim() ||
        `${p.title} ${p.authors.join(" ")} ${p.keywords.join(" ")} ${p.domain}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchDomain = domainFilter === "all" || p.domain === domainFilter;
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchDomain && matchStatus;
    });
  }, [search, domainFilter, statusFilter]);

  const hasFilters = !!search || domainFilter !== "all" || statusFilter !== "all";

  const statusLabel: Record<string, string> = { published: "Publié", review: "En revue", draft: "Brouillon" };
  const statusStyle: Record<string, string> = {
    published: "bg-success/10 text-success",
    review: "bg-warning/10 text-warning",
    draft: "bg-muted text-muted-foreground",
  };

  return (
    <>
      <PageHeader
        title="Recherche de publications"
        description={`${filtered.length} publication${filtered.length !== 1 ? "s" : ""} trouvée${filtered.length !== 1 ? "s" : ""}`}
        actions={
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Titre, auteur, mot-clé..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-56"
              />
            </div>
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-[170px]">
                <Filter size={13} className="mr-1 shrink-0" />
                <SelectValue placeholder="Domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les domaines</SelectItem>
                {domains.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="review">En revue</SelectItem>
                <SelectItem value="draft">Brouillon</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setDomainFilter("all"); setStatusFilter("all"); }}>
                <X size={14} className="mr-1" /> Effacer
              </Button>
            )}
          </div>
        }
      />

      <div className="bg-card rounded-lg border shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search size={36} className="mb-3 opacity-30" />
            <p className="font-medium">Aucune publication trouvée</p>
            <p className="text-sm mt-1">Essayez d'autres mots-clés ou ajustez vos filtres</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((pub) => (
              <Link key={pub.id} to={`/publications/${pub.id}`}>
                <div className="flex items-start justify-between gap-4 p-4 hover:bg-muted/40 transition-colors cursor-pointer">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{pub.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pub.authors.join(", ")}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{pub.domain}</span>
                      {pub.keywords.slice(0, 3).map((k) => (
                        <span key={k} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[pub.status]}`}>
                      {statusLabel[pub.status]}
                    </span>
                    <span className="text-xs text-muted-foreground">{pub.date}</span>
                    {pub.doi && <span className="text-xs text-muted-foreground font-mono">DOI: {pub.doi}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
