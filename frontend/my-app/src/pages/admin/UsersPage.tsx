import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userAccounts as initialData, type UserAccount } from "@/data/mockData";
import { Plus, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
  const [data, setData] = useState<UserAccount[]>(initialData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "user" as UserAccount["role"] });

  const filtered = data.filter((u) => `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error("Nom et email requis"); return; }
    setData([...data, { id: Date.now().toString(), ...form, status: "active", createdAt: new Date().toISOString().split("T")[0] }]);
    toast.success("Utilisateur créé");
    setOpen(false);
    setForm({ name: "", email: "", role: "user" });
  };

  const roleBadge = (role: UserAccount["role"]) => {
    const styles = { admin: "bg-primary/10 text-primary", moderator: "bg-warning/10 text-warning", user: "bg-muted text-muted-foreground" };
    const labels = { admin: "Admin", moderator: "Modérateur", user: "Utilisateur" };
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[role]}`}>{labels[role]}</span>;
  };

  const statusBadge = (s: UserAccount["status"]) => (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
      {s === "active" ? "Actif" : "Inactif"}
    </span>
  );

  const columns = [
    { key: "name", label: "Nom" },
    { key: "email", label: "Email", render: (u: UserAccount) => <span className="text-muted-foreground">{u.email}</span> },
    { key: "role", label: "Rôle", render: (u: UserAccount) => roleBadge(u.role) },
    { key: "status", label: "Statut", render: (u: UserAccount) => statusBadge(u.status) },
    { key: "actions", label: "Actions", render: (u: UserAccount) => (
      <button onClick={() => { setData(data.filter((x) => x.id !== u.id)); toast.success("Supprimé"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
    )},
  ];

  return (
    <>
      <PageHeader
        title="Gestion des utilisateurs"
        description="Créer et gérer les comptes utilisateurs"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus size={16} className="mr-2" />Créer un compte</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Créer un utilisateur</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Nom</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div>
                  <Label>Rôle</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserAccount["role"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full">Créer</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <DataTable columns={columns} data={filtered} />
    </>
  );
}
