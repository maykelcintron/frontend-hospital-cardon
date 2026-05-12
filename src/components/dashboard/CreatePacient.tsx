import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../services/api";

interface PatientForm {
  name: string;
  last_name: string;
  age: number;
  birth_date: string;
  cedula: string;
  gender: string;
  phone: string;
}

function CreatePacient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<PatientForm>({
    name: "",
    last_name: "",
    age: 0,
    birth_date: "",
    cedula: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post('/pacients', form);

      if (response.status === 201 || response.status === 200) {
        navigate('/dashboard/patients');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Error al crear paciente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/patients')}
          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
        <div>
          <h1 className="font-display font-bold text-3xl">Nuevo Paciente</h1>
          <p className="text-muted-foreground mt-1">Registra un nuevo paciente en el sistema</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/50 shadow-[var(--shadow-card)] p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa el nombre"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="last_name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Apellido *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa el apellido"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cedula"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Cédula *
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa la cédula"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa el teléfono"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="age"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age || ""}
              onChange={handleChange}
              min="0"
              max="120"
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa la edad"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birth_date"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="gender"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
              Género
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecciona un género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-6 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/dashboard/patients')}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Guardando..." : "Guardar Paciente"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePacient;