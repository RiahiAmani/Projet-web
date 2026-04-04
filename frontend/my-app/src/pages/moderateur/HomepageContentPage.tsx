import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function HomepageContentPage() {
  const [heroTitle, setHeroTitle] = useState("IA-Technology — Recherche & Innovation");
  const [heroSubtitle, setHeroSubtitle] = useState("Plateforme de gestion et diffusion des travaux scientifiques en intelligence artificielle.");
  const [showStats, setShowStats] = useState(true);
  const [showProjects, setShowProjects] = useState(true);

  return (
    <>
      <PageHeader title="Contenu de la page d'accueil" description="Personnaliser ce que les visiteurs voient en premier" />

      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-lg border p-6 shadow-sm space-y-4">
          <h2 className="font-semibold">Section Héros</h2>
          <div><Label>Titre principal</Label><Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} /></div>
          <div><Label>Sous-titre</Label><Textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={3} /></div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm space-y-4">
          <h2 className="font-semibold">Sections visibles</h2>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Statistiques</p><p className="text-xs text-muted-foreground">Afficher les chiffres clés</p></div>
            <Switch checked={showStats} onCheckedChange={setShowStats} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Projets en avant</p><p className="text-xs text-muted-foreground">Afficher les projets récents</p></div>
            <Switch checked={showProjects} onCheckedChange={setShowProjects} />
          </div>
        </div>

        <Button onClick={() => toast.success("Modifications enregistrées")} className="w-full">Enregistrer les modifications</Button>
      </div>
    </>
  );
}
