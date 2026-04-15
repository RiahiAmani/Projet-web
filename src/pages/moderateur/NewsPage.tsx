import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { newsItems as initialData, type NewsItem } from "@/data/mockData";
import { Plus, Trash2, Pencil, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function NewsPage() {
  const [data, setData] = useState<NewsItem[]>(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSave = () => {
    if (!form.title) { toast.error("Titre requis"); return; }
    if (editing) {
      setData(data.map((n) => n.id === editing.id ? { ...n, ...form } : n));
      toast.success("Actualité modifiée");
    } else {
      setData([...data, { id: Date.now().toString(), ...form, date: new Date().toISOString().split("T")[0], published: false }]);
      toast.success("Actualité ajoutée");
    }
    resetForm();
  };

  const resetForm = () => { setOpen(false); setEditing(null); setForm({ title: "", content: "" }); };

  const togglePublish = (id: string) => {
    setData(data.map((n) => n.id === id ? { ...n, published: !n.published } : n));
    toast.success("Statut mis à jour");
  };

  return (
    <>
      <PageHeader
        title="Gestion des actualités"
        description="Publier des annonces et nouvelles"
        actions={
          <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
            <DialogTrigger asChild><Button><Plus size={16} className="mr-2" />Ajouter</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} une actualité</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Contenu</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} /></div>
                <Button onClick={handleSave} className="w-full">{editing ? "Enregistrer" : "Ajouter"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-3">
        {data.map((n) => (
          <div key={n.id} className="bg-card rounded-lg border p-5 shadow-sm flex items-start justify-between gap-4 group">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{n.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  {n.published ? "Publié" : "Brouillon"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
              <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
            </div>
            <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => togglePublish(n.id)} className="p-1.5 rounded hover:bg-muted transition-colors">
                {n.published ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => { setEditing(n); setForm({ title: n.title, content: n.content }); setOpen(true); }} className="p-1.5 rounded hover:bg-muted transition-colors"><Pencil size={14} /></button>
              <button onClick={() => { setData(data.filter((x) => x.id !== n.id)); toast.success("Supprimé"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
