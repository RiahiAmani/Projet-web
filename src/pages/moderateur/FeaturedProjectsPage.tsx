import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { featuredProjects as initialData, domains, type FeaturedProject } from "@/data/mockData";
import { Plus, Trash2, Pencil, Star } from "lucide-react";
import { toast } from "sonner";

export default function FeaturedProjectsPage() {
  const [data, setData] = useState<FeaturedProject[]>(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FeaturedProject | null>(null);
  const [form, setForm] = useState({ title: "", description: "", domain: "" });

  const handleSave = () => {
    if (!form.title || !form.domain) { toast.error("Titre et domaine requis"); return; }
    if (editing) {
      setData(data.map((p) => p.id === editing.id ? { ...p, ...form } : p));
      toast.success("Projet modifié");
    } else {
      setData([...data, { id: Date.now().toString(), ...form, featured: false }]);
      toast.success("Projet ajouté");
    }
    resetForm();
  };

  const resetForm = () => { setOpen(false); setEditing(null); setForm({ title: "", description: "", domain: "" }); };

  const toggleFeatured = (id: string) => {
    setData(data.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
    toast.success("Statut mis à jour");
  };

  return (
    <>
      <PageHeader
        title="Projets mis en avant"
        description="Sélectionner les projets à afficher sur la page d'accueil"
        actions={
          <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
            <DialogTrigger asChild><Button><Plus size={16} className="mr-2" />Ajouter</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} un projet</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
                <div>
                  <Label>Domaine</Label>
                  <Select value={form.domain} onValueChange={(v) => setForm({ ...form, domain: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>{domains.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full">{editing ? "Enregistrer" : "Ajouter"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((p) => (
          <div key={p.id} className={`bg-card rounded-lg border p-5 shadow-sm transition-shadow group ${p.featured ? "ring-2 ring-primary/20" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.domain}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(p); setForm({ title: p.title, description: p.description, domain: p.domain }); setOpen(true); }} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} /></button>
                <button onClick={() => { setData(data.filter((x) => x.id !== p.id)); toast.success("Supprimé"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Star size={14} className={p.featured ? "text-warning fill-warning" : "text-muted-foreground"} />
                <span className="text-xs text-muted-foreground">{p.featured ? "En avant" : "Non affiché"}</span>
              </div>
              <Switch checked={p.featured} onCheckedChange={() => toggleFeatured(p.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
