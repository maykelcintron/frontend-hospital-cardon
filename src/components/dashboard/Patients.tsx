import { useEffect, useState } from "react";
import { Search, UserPlus, FileDown, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router";
import api from "../../services/api";

interface Patient {
  id: number | string;
  name?: string;
  last_name?: string;
  age?: number;
  birth_date?: string;
  cedula?: string;
  gender?: string;
  phone?: string;
}

function Patients() {
  const navigate = useNavigate();
  const [list, setList] = useState<Patient[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacients();
  }, []);

  const fetchPacients = async () => {
    setLoading(true);

    try {
      const response = await api.get('/pacients');
      const data = response.data;
      const patients = Array.isArray(data)
        ? data
        : data.pacients || data.patients || data.results || data.data || []; 

      setList(patients);
      console.log('Pacientes cargados:', patients);
    } catch (error: any) {
      console.error('Error en la solicitud de pacientes:', error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = list.filter((p) =>
    p.name?.toLowerCase().includes(q.toLowerCase()) ||
    p.cedula?.includes(q)
  );

  const remove = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este paciente?");
    if (!confirmed) return;

    const response = await api.delete(`/pacients/${id}`)

    if (response.status === 204) {
      alert("Paciente eliminado exitosamente.");
    } else {
      alert("Error al eliminar paciente.");
      return;
    }

    setList(list.filter((p) => p.id !== id));
  };

  const report = (patient: any) => {
    // Simular descarga de PDF
    alert(`Generando reporte para ${patient.name} ${patient.last_name}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-3xl">Pacientes</h1>
          <p className="text-muted-foreground mt-1">{list.length} registrados en total</p>
        </div>
        <Link
          to="/dashboard/patients/new"
          className="bg-[#3b82f6] inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo
        </Link>
      </header>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nombre o cédula..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {loading ? (
        <div className="text-muted-foreground text-sm">Cargando pacientes...</div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card rounded-2xl p-5 border border-border/50 shadow-[var(--shadow-card)] flex items-center gap-4">
              <button
                onClick={() => navigate(`/dashboard/patients/${p.id}`)}
                className="h-12 w-12 rounded-full bg-primary-soft text-primary grid place-items-center font-bold shrink-0"
              >
                {p.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </button>
              <button
                onClick={() => navigate(`/dashboard/patients/${p.id}`)}
                className="flex-1 min-w-0 text-left"
              >
                <div className="font-semibold">{p.name} {p.last_name}</div>
                <div className="text-xs text-muted-foreground truncate">
                    C.I: {p.cedula} · Genero: {p.gender} · Telefono: {p.phone} 
                </div>
              </button>
              <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                <span>{(p.birth_date)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => report(p)}
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white"
                >
                  <FileDown className="h-4 w-4 mr-1" /> PDF
                </button>
                <button
                  onClick={() => remove(p.id as string)}
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-card rounded-2xl p-10 border border-border/50 text-center text-muted-foreground">
              No se encontraron pacientes.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Patients;