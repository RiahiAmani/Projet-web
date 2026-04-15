import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { domains as initialData, type Domain } from "@/data/mockData";
import { Plus, Trash2, Pencil, FolderTree } from "lucide-react";
import { toast } from "sonner";

export default function DomainsPage() {
  const [data, setData] = useState<Domain[]>(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Domain | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSave = () => {
    if (!form.name) { toast.error("Nom requis"); return; }
    if (editing) {
      setData(data.map((d) => d.id === editing.id ? { ...d, ...form } : d));
      toast.success("Domaine modifié");
    } else {
      setData([...data, { id: Date.now().toString(), ...form, researcherCount: 0, publicationCount: 0 }]);
      toast.success("Domaine ajouté");
    }
    resetForm();
  };

  const resetForm = () => { setOpen(false); setEditing(null); setForm({ name: "", description: "" }); };

  return (
    <>
      <PageHeader
        title="Gestion des domaines"
        description="Créer et organiser les domaines de recherche"
        actions={
          <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
            <DialogTrigger asChild><Button><Plus size={16} className="mr-2" />Ajouter</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} un domaine</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Nom</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <Button onClick={handleSave} className="w-full">{editing ? "Enregistrer" : "Ajouter"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((d) => (
          <div key={d.id} className="bg-card rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderTree size={20} className="text-primary" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(d); setForm({ name: d.name, description: d.description }); setOpen(true); }} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} /></button>
                <button onClick={() => { setData(data.filter((x) => x.id !== d.id)); toast.success("Supprimé"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-semibold text-card-foreground">{d.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{d.description}</p>
            <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
              <span>{d.researcherCount} chercheurs</span>
              <span>{d.publicationCount} publications</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
