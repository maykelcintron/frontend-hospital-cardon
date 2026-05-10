import { useEffect, useState } from "react";
import { Mail, Stethoscope, Building2, Shield } from "lucide-react";

const userData = {
  id: "usr-12345678",
  full_name: "Dra. Natalia Méndez",
  email: "natalia.mendez@ivss.gob.ve",
  role: "Bioanalista",
  hospital: "Centro Hospital Cardón",
};

function ProfilePage() {
  const [user, setUser] = useState(userData);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: userData.full_name,
    role: userData.role,
    hospital: userData.hospital,
  });

  const save = () => {
    setUser({ ...user, ...form });
    setEditing(false);
  };

  if (!user) return <div className="p-8 text-muted-foreground">Cargando...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="font-display font-bold text-3xl mb-6">Mi perfil</h1>

      <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border/50">
        <div className="h-32" style={{ background: "var(--gradient-hero)" }} />
        <div className="bg-card px-8 pb-8 -mt-12">
          <div className="h-24 w-24 rounded-full bg-card border-4 border-card grid place-items-center text-3xl font-bold text-primary"
            style={{ background: "var(--primary-soft)" }}>
            {user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>

          {!editing ? (
            <>
              <div className="flex items-start justify-between mt-4">
                <div>
                  <h2 className="font-display font-bold text-2xl">{user.full_name}</h2>
                  <p className="text-muted-foreground">{user.role}</p>
                </div>
                <button
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white"
                  onClick={() => setEditing(true)}
                >
                  Editar perfil
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <InfoRow icon={Mail} label="Correo" value={user.email} />
                <InfoRow icon={Building2} label="Centro" value={user.hospital} />
                <InfoRow icon={Stethoscope} label="Rol" value={user.role} />
                <InfoRow icon={Shield} label="ID" value={user.id.slice(0, 8).toUpperCase()} />
              </div>
            </>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
                >
                  Rol
                </label>
                <input
                  type="text"
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="hospital"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
                >
                  Centro
                </label>
                <input
                  type="text"
                  id="hospital"
                  value={form.hospital}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md bg-[#009192] px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  onClick={save}
                >
                  Guardar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40">
      <div className="h-9 w-9 rounded-lg bg-card grid place-items-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

export default ProfilePage;