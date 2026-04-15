import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Veuillez remplir tous les champs"); return; }
    if (form.password !== form.confirm) { toast.error("Les mots de passe ne correspondent pas"); return; }
    if (form.password.length < 8) { toast.error("Le mot de passe doit contenir au moins 8 caractères"); return; }
    setLoading(true);
    try {
      await authApi.register({ name: form.name, email: form.email, password: form.password });
      toast.success("Compte créé avec succès !");
      navigate("/login");
    } catch {
      toast.error("Une erreur est survenue. L'email est peut-être déjà utilisé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Inscription" description="Créez votre compte utilisateur" />

      <div className="max-w-md">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="Prénom Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <Input id="email" type="email" placeholder="vous@ia-tech.tn" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 caractères"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input id="confirm" type="password" placeholder="Répétez le mot de passe" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <UserPlus size={15} className="mr-2" />
              {loading ? "Création..." : "Créer mon compte"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </div>
    </>
  );
}
