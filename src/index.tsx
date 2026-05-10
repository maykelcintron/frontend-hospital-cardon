import { Link } from "react-router"
import { Activity, FileText, ShieldCheck, Stethoscope } from "lucide-react"
import { BrandLogo } from "./components/brand-logo"

function App() {
  return (
    <>
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border/60 backdrop-blur">
        <BrandLogo subtitle="Instituto Venezolano de los Seguros Sociales" />
        <div className="flex items-center gap-2">
          <Link to={'/auth/login'} className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Iniciar Sesion
          </Link>
          <Link to={'/auth/register'} className="inline-flex items-center justify-center rounded-md bg-[#009192] px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Crear Cuenta
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D1F8F7] text-primary px-3 py-1 text-xs font-medium mb-6">
              <ShieldCheck className="h-3.5 w-3.5" /> Sistema clínico hospitalario
            </div>
            <h1 className="font-display font-extrabold text-5xl leading-tight tracking-tight text-[#041D2A]">
              Pacientes y exámenes, <span className="text-[#009192]">en un solo lugar.</span>
            </h1>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Registra pacientes, captura sus exámenes clínicos —serología, química sanguínea, coagulación, heces, orina y hematología—
              y genera reportes en PDF para tu equipo médico.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to={'/auth/register'} className="inline-flex items-center justify-center rounded-md bg-[#009192] px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Comenzar Ahora
              </Link>
             <Link to={'/auth/login'} className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          <div className="rounded-3xl p-8 bg-[#DFFCFC] shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Stethoscope, label: "Tipos de examen", value: "6" },
                { icon: FileText, label: "Reportes PDF", value: "Auto" },
                { icon: Activity, label: "Trazabilidad", value: "Total" },
                { icon: ShieldCheck, label: "Datos protegidos", value: "RLS" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)]">
                  <s.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-display font-bold text-2xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default App
