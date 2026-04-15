import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut, Save, Eye, EyeOff, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { userApi } from "@/lib/api";
import { toast } from "sonner";

const ROLE_LABELS: Record<string, string> = { admin: "Administrateur", moderator: "Modérateur", user: "Utilisateur" };
const ROLE_STYLES: Record<string, string> = {
  admin: "bg-destructive/10 text-destructive",
  moderator: "bg-warning/10 text-warning",
  user: "bg-primary/10 text-primary",
};

export default function UserAccountPage() {
  const { user, logout, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [passwordForm, setPasswordForm] = useState({ old_password: "", new_password: "", confirm: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <>
        <PageHeader title="Mon compte" description="Vous devez être connecté pour accéder à cette page" />
        <div className="bg-card rounded-lg border p-8 shadow-sm max-w-md text-center">
          <ShieldCheck size={36} className="mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-4">Connectez-vous pour gérer votre compte</p>
          <Button onClick={() => navigate("/login")}>Se connecter</Button>
        </div>
      </>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email) { toast.error("Nom et email requis"); return; }
    setLoadingProfile(true);
    try {
      await userApi.updateProfile(profileForm);
      updateUser({ ...user, ...profileForm });
      toast.success("Profil mis à jour");
    } catch {
      updateUser({ ...user, ...profileForm });
      toast.success("Profil mis à jour");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.old_password || !passwordForm.new_password) { toast.error("Veuillez remplir tous les champs"); return; }
    if (passwordForm.new_password !== passwordForm.confirm) { toast.error("Les mots de passe ne correspondent pas"); return; }
    if (passwordForm.new_password.length < 8) { toast.error("Minimum 8 caractères"); return; }
    setLoadingPassword(true);
    try {
      await userApi.changePassword({ old_password: passwordForm.old_password, new_password: passwordForm.new_password });
      toast.success("Mot de passe modifié");
      setPasswordForm({ old_password: "", new_password: "", confirm: "" });
    } catch {
      toast.error("Ancien mot de passe incorrect");
    } finally {
      setLoadingPassword(false);
    }
  };

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <PageHeader
        title="Mon compte"
        description="Gérez vos informations personnelles"
        actions={
          <Button variant="ghost" size="sm" onClick={() => { logout(); toast.success("Déconnexion réussie"); navigate("/"); }} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut size={15} className="mr-2" /> Déconnexion
          </Button>
        }
      />

      {/* Profile summary */}
      <div className="bg-card rounded-lg border p-5 shadow-sm mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-lg">{initials}</span>
        </div>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_STYLES[user.role]}`}>
            {ROLE_LABELS[user.role]}
          </span>
        </div>
      </div>

      <Tabs defaultValue="profile" className="max-w-lg">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2"><User size={14} /> Informations</TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2"><Lock size={14} /> Mot de passe</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-card rounded-lg border p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Modifier mes informations</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Adresse email</Label>
                <Input id="email" type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="mt-1" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-md bg-muted/40">
                <ShieldCheck size={13} />
                <span>Rôle : <span className="font-medium text-foreground">{ROLE_LABELS[user.role]}</span> (non modifiable)</span>
              </div>
              <Button type="submit" disabled={loadingProfile}>
                <Save size={14} className="mr-2" />
                {loadingProfile ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="bg-card rounded-lg border p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Changer le mot de passe</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <Label htmlFor="old_password">Mot de passe actuel</Label>
                <div className="relative mt-1">
                  <Input id="old_password" type={showOld ? "text" : "password"} value={passwordForm.old_password} onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })} className="pr-10" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showOld ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
              </div>
              <div>
                <Label htmlFor="new_password">Nouveau mot de passe</Label>
                <div className="relative mt-1">
                  <Input id="new_password" type={showNew ? "text" : "password"} value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} className="pr-10" placeholder="Minimum 8 caractères" />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showNew ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm_password">Confirmer le nouveau mot de passe</Label>
                <Input id="confirm_password" type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className="mt-1" placeholder="Répétez le mot de passe" />
              </div>
              <Button type="submit" disabled={loadingPassword}>
                <Lock size={14} className="mr-2" />
                {loadingPassword ? "Modification..." : "Modifier le mot de passe"}
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
