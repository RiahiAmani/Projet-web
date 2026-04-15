import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { researchers as initialData, domains, type Researcher } from "@/data/mockData";
import { Plus, Search, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export default function ResearchersPage() {
  const [data, setData] = useState<Researcher[]>(initialData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Researcher | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", domain: "" });

  const filtered = data.filter((r) =>
    `${r.firstName} ${r.lastName} ${r.domain}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.domain) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (editing) {
      setData(data.map((r) => r.id === editing.id ? { ...r, ...form } : r));
      toast.success("Chercheur modifié");
    } else {
      setData([...data, { id: Date.now().toString(), ...form, publications: 0, joinedAt: new Date().toISOString().split("T")[0] }]);
      toast.success("Chercheur ajouté");
    }
    setOpen(false);
    setEditing(null);
    setForm({ firstName: "", lastName: "", email: "", domain: "" });
  };

  const handleDelete = (id: string) => {
    setData(data.filter((r) => r.id !== id));
    toast.success("Chercheur supprimé");
  };

  const openEdit = (r: Researcher) => {
    setEditing(r);
    setForm({ firstName: r.firstName, lastName: r.lastName, email: r.email, domain: r.domain });
    setOpen(true);
  };

  const columns = [
    { key: "name", label: "Nom", render: (r: Researcher) => `${r.firstName} ${r.lastName}` },
    { key: "email", label: "Email", render: (r: Researcher) => <span className="text-muted-foreground">{r.email}</span> },
    { key: "domain", label: "Domaine", render: (r: Researcher) => (
      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r.domain}</span>
    )},
    { key: "publications", label: "Publications" },
    { key: "actions", label: "Actions", render: (r: Researcher) => (
      <div className="flex gap-1">
        <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-muted transition-colors"><Pencil size={14} /></button>
        <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
      </div>
    )},
  ];

  return (
    <>
      <PageHeader
        title="Gestion des chercheurs"
        description="Ajouter, modifier et supprimer des chercheurs"
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm({ firstName: "", lastName: "", email: "", domain: "" }); } }}>
            <DialogTrigger asChild>
              <Button><Plus size={16} className="mr-2" />Ajouter</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} un chercheur</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Prénom</Label><Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
                  <div><Label>Nom</Label><Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div>
                  <Label>Domaine</Label>
                  <Select value={form.domain} onValueChange={(v) => setForm({ ...form, domain: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir un domaine" /></SelectTrigger>
                    <SelectContent>{domains.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full">{editing ? "Enregistrer" : "Ajouter"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher par nom ou domaine..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <DataTable columns={columns} data={filtered} />
    </>
  );
}
