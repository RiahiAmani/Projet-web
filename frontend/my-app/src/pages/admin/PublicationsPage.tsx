import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { publications as initialData, domains, type Publication } from "@/data/mockData";
import { Plus, Search, Trash2, Pencil, FileText } from "lucide-react";
import { toast } from "sonner";

export default function PublicationsPage() {
  const [data, setData] = useState<Publication[]>(initialData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Publication | null>(null);
  const [form, setForm] = useState({ title: "", authors: "", domain: "", doi: "", keywords: "", status: "draft" as Publication["status"] });

  const filtered = data.filter((p) =>
    `${p.title} ${p.authors.join(" ")} ${p.keywords.join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.title || !form.domain) { toast.error("Titre et domaine requis"); return; }
    const pub: Publication = {
      id: editing?.id || Date.now().toString(),
      title: form.title,
      authors: form.authors.split(",").map((a) => a.trim()).filter(Boolean),
      domain: form.domain,
      doi: form.doi || undefined,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      status: form.status,
      date: editing?.date || new Date().toISOString().split("T")[0],
    };
    if (editing) {
      setData(data.map((p) => (p.id === editing.id ? pub : p)));
      toast.success("Publication modifiée");
    } else {
      setData([...data, pub]);
      toast.success("Publication ajoutée");
    }
    resetForm();
  };

  const resetForm = () => {
    setOpen(false);
    setEditing(null);
    setForm({ title: "", authors: "", domain: "", doi: "", keywords: "", status: "draft" });
  };

  const openEdit = (p: Publication) => {
    setEditing(p);
    setForm({ title: p.title, authors: p.authors.join(", "), domain: p.domain, doi: p.doi || "", keywords: p.keywords.join(", "), status: p.status });
    setOpen(true);
  };

  const statusBadge = (s: Publication["status"]) => {
    const styles = { published: "bg-success/10 text-success", review: "bg-warning/10 text-warning", draft: "bg-muted text-muted-foreground" };
    const labels = { published: "Publié", review: "En revue", draft: "Brouillon" };
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[s]}`}>{labels[s]}</span>;
  };

  const columns = [
    { key: "title", label: "Titre", render: (p: Publication) => (
      <div className="max-w-xs">
        <p className="text-sm font-medium truncate">{p.title}</p>
        <p className="text-xs text-muted-foreground">{p.authors.join(", ")}</p>
      </div>
    )},
    { key: "domain", label: "Domaine", render: (p: Publication) => <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.domain}</span> },
    { key: "date", label: "Date" },
    { key: "status", label: "Statut", render: (p: Publication) => statusBadge(p.status) },
    { key: "doi", label: "DOI", render: (p: Publication) => p.doi ? <span className="text-xs text-muted-foreground">{p.doi}</span> : "—" },
    { key: "actions", label: "Actions", render: (p: Publication) => (
      <div className="flex gap-1">
        <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted transition-colors"><Pencil size={14} /></button>
        <button onClick={() => { setData(data.filter((x) => x.id !== p.id)); toast.success("Supprimé"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
      </div>
    )},
  ];

  return (
    <>
      <PageHeader
        title="Gestion des publications"
        description="Gérer les publications scientifiques"
        actions={
          <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
            <DialogTrigger asChild><Button><Plus size={16} className="mr-2" />Ajouter</Button></DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} une publication</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Auteurs (séparés par virgule)</Label><Input value={form.authors} onChange={(e) => setForm({ ...form, authors: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Domaine</Label>
                    <Select value={form.domain} onValueChange={(v) => setForm({ ...form, domain: v })}>
                      <SelectTrigger><SelectValue placeholder="Domaine" /></SelectTrigger>
                      <SelectContent>{domains.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Publication["status"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="review">En revue</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>DOI</Label><Input value={form.doi} onChange={(e) => setForm({ ...form, doi: e.target.value })} placeholder="10.1234/..." /></div>
                <div><Label>Mots-clés (séparés par virgule)</Label><Input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} /></div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1"><FileText size={16} className="mr-2" />Upload PDF</Button>
                </div>
                <Button onClick={handleSave} className="w-full">{editing ? "Enregistrer" : "Ajouter"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher par titre, auteur, mot-clé..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <DataTable columns={columns} data={filtered} />
    </>
  );
}
