import { Activity, ArrowRight, FileText, TrendingUp, UserPlus, Users } from "lucide-react"
import { Link } from "react-router"

const user = {
  full_name: "Dra. Natalia Méndez",
  role: "Bioanalista",
  hospital: "Hospital Cardón",
}

const list = [
  {
    id: "1",
    full_name: "Juan Pérez",
    document_id: "12345678",
    diagnosis: "Diabetes tipo 2",
    blood_type: "O+",
    created_at: "2026-05-03T10:00:00Z",
  },
  {
    id: "2",
    full_name: "María Gómez",
    document_id: "87654321",
    diagnosis: "Hipertensión",
    blood_type: "A-",
    created_at: "2026-05-07T12:30:00Z",
  },
]

const examsCount = 27

const Home = () => {
  const stats = [
    { icon: Users, label: "Pacientes totales", value: list.length, color: "text-primary", bg: "bg-primary-soft" },
    { icon: FileText, label: "Reportes generados", value: 18, color: "text-success", bg: "bg-success/10" },
    { icon: Activity, label: "Exámenes registrados", value: examsCount, color: "text-warning", bg: "bg-warning/15" },
    { icon: TrendingUp, label: "Esta semana", value: list.filter((p) => Date.now() - new Date(p.created_at).getTime() < 7 * 86400000).length, color: "text-accent-foreground", bg: "bg-accent" },
  ]

  return (
     <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground">¡Hola de nuevo!</p>
          <h1 className="font-display font-bold text-3xl mt-1">{user.full_name}</h1>
          <p className="text-muted-foreground mt-1">{user.role} · {user.hospital}</p>
        </div>
        <Link
          to="/dashboard/patients/new"
          className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo paciente
        </Link>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50">
            <div className={`h-10 w-10 rounded-xl grid place-items-center ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="mt-4 font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="bg-card rounded-2xl border border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h2 className="font-display font-bold text-lg">Pacientes recientes</h2>
          <Link to="/dashboard/patients" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ul className="divide-y divide-border/50">
          {list.slice(0, 5).map((p) => (
            <li key={p.id}>
              <Link to={`/dashboard/patients/${p.id}`} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/40 transition-colors">
                <div className="h-10 w-10 rounded-full bg-primary-soft text-primary grid place-items-center font-bold">
                  {p.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{p.full_name}</div>
                  <div className="text-xs text-muted-foreground">CC {p.document_id} · {p.diagnosis || "Sin diagnóstico"}</div>
                </div>
                <div className="text-xs text-muted-foreground hidden md:block">{p.blood_type}</div>
              </Link>
            </li>
          ))}
          {list.length === 0 && (
            <li className="px-6 py-10 text-center text-muted-foreground text-sm">
              Aún no hay pacientes. <Link to="/dashboard/patients/new" className="text-primary hover:underline">Registra el primero</Link>.
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Home
