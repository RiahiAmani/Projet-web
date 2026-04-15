import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Hash, User, ExternalLink, Tag } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { publications, researchers } from "@/data/mockData";

const STATUS_LABELS: Record<string, string> = { published: "Publié", review: "En revue", draft: "Brouillon" };
const STATUS_STYLES: Record<string, string> = {
  published: "bg-success/10 text-success",
  review: "bg-warning/10 text-warning",
  draft: "bg-muted text-muted-foreground",
};

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const publication = publications.find((p) => p.id === id);

  if (!publication) {
    return (
      <>
        <PageHeader title="Publication introuvable" description="Cette publication n'existe pas." />
        <Link to="/recherche"><Button variant="outline"><ArrowLeft size={14} className="mr-2" />Retour</Button></Link>
      </>
    );
  }

  const authorResearchers = researchers.filter((r) =>
    publication.authors.some((a) =>
      a.toLowerCase().includes(r.lastName.toLowerCase()) || a.toLowerCase().includes(r.firstName.toLowerCase())
    )
  );

  return (
    <>
      <PageHeader
        title={publication.title}
        description={publication.authors.join(", ")}
        actions={
          <Link to="/recherche">
            <Button variant="outline" size="sm"><ArrowLeft size={14} className="mr-2" />Retour aux publications</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">

          {/* Status & domain */}
          <div className="bg-card rounded-lg border p-5 shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[publication.status]}`}>
                {STATUS_LABELS[publication.status]}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{publication.domain}</span>
              {publication.doi && (
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors flex items-center gap-1"
                >
                  DOI: {publication.doi} <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>

          {/* Authors */}
          <div className="bg-card rounded-lg border p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <User size={15} className="text-muted-foreground" />
              <h2 className="font-semibold text-sm">Auteur(s)</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {publication.authors.map((author) => (
                <span key={author} className="text-sm bg-muted/60 px-3 py-1 rounded-md">{author}</span>
              ))}
            </div>
          </div>

          {/* Keywords */}
          {publication.keywords.length > 0 && (
            <div className="bg-card rounded-lg border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-muted-foreground" />
                <h2 className="font-semibold text-sm">Mots-clés</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((kw) => (
                  <Link key={kw} to={`/recherche?q=${encodeURIComponent(kw)}`}>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer">
                      #{kw}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Info */}
          <div className="bg-card rounded-lg border p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-3">Informations</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} />
                <span>Date : <span className="text-foreground font-medium">{publication.date}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen size={14} />
                <span>Domaine : <span className="text-foreground font-medium">{publication.domain}</span></span>
              </div>
              {publication.doi && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash size={14} />
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-mono text-xs hover:underline"
                  >
                    {publication.doi}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Authors detail */}
          {authorResearchers.length > 0 && (
            <div className="bg-card rounded-lg border p-5 shadow-sm">
              <h2 className="font-semibold text-sm mb-3">À propos des auteurs</h2>
              <div className="space-y-3">
                {authorResearchers.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/40">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-semibold">{r.firstName[0]}{r.lastName[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.firstName} {r.lastName}</p>
                      <p className="text-xs text-muted-foreground">{r.domain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
