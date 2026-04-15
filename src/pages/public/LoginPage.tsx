import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Veuillez remplir tous les champs"); return; }
    setLoading(true);
    try {
      const res = await authApi.login(form.email, form.password);
      const { access, user } = res.data;
      login(user, access);
      toast.success("Connexion réussie");
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "moderator") navigate("/moderateur");
      else navigate("/mon-compte");
    } catch {
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Connexion" description="Accédez à votre espace personnel" />

      <div className="max-w-md">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@ia-tech.tn"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn size={15} className="mr-2" />
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-primary hover:underline font-medium">S'inscrire</Link>
          </p>
        </div>
      </div>
    </>
  );
}
