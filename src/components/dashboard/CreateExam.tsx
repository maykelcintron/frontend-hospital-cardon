import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, FileDown, Save } from "lucide-react";
import api from "../../services/api";

interface Patient {
  id: number | string;
  name?: string;
  last_name?: string;
  cedula?: string;
}

interface ExamData {
  patient_id: string;
  exam_type: string;
  date: string;
  results: Record<string, any>;
}

const examTypes = [
  "Seriologia",
  "Quimica Sanguinea",
  "Estudios de Coagulacion",
  "Analisis de Heces",
  "Analisis de Orina",
  "Hematologia"
];

const examFields = {
  "Seriologia": [
    { name: "VRDL", label: "VRDL", type: "text" },
    { name: "PCR", label: "PCR", type: "text" },
    { name: "RA_Test", label: "RA Test", type: "text" },
    { name: "Toxoplasmosis", label: "Toxoplasmosis", type: "text" },
    { name: "Monotest", label: "Monotest", type: "text" },
    { name: "Asto", label: "Asto", type: "text" },
    { name: "Prueba_Embarazo", label: "Prueba de embarazo de orina", type: "text" },
    { name: "HIV", label: "HIV", type: "text" },
    { name: "Pilorest", label: "Pilorest", type: "text" },
    { name: "LCDO", label: "LCDO", type: "text" }
  ],
  "Quimica Sanguinea": [
    { name: "Glucosa_Oxidasa", label: "Glucosa Oxidasa mg/dl (70-105)", type: "number", min: 0, max: 500 },
    { name: "BUN", label: "BUN mg/dl (7-18)", type: "number", min: 0, max: 100 },
    { name: "Acido_Urico", label: "Acido Urico mg/dl (2.5-7.7)", type: "number", min: 0, max: 20 },
    { name: "Colesterol_Total", label: "Colesterol total mg/dl (Hasta 200)", type: "number", min: 0, max: 500 },
    { name: "Colesterol_HDL", label: "Colesterol HDL mg/dl (30-85)", type: "number", min: 0, max: 200 },
    { name: "Colesterol_LDL", label: "Colesterol LDL mg/dl (hasta 150)", type: "number", min: 0, max: 300 },
    { name: "Trigliceridos", label: "Trigliceridos mg/dl (44-148)", type: "number", min: 0, max: 500 },
    { name: "Proteinas_Totales", label: "Proteinas totales g/dl (6.0-8.2)", type: "number", min: 0, max: 15 },
    { name: "Albumina", label: "Albumina g/dl (3.5-5.3)", type: "number", min: 0, max: 10 },
    { name: "Globulina", label: "Globulina g/dl (2.5-3.5)", type: "number", min: 0, max: 10 },
    { name: "Relacion_AG", label: "Relacion A/G (1.0-1.8)", type: "number", min: 0, max: 5 },
    { name: "Calcio_Arsenato", label: "Calcio Arsenato mg/dl (8.5-10.4)", type: "number", min: 0, max: 20 },
    { name: "Fosforo", label: "Fosforo mg/dl (2.5-4.8)", type: "number", min: 0, max: 10 },
    { name: "Magnesio", label: "Magnesio mg/dl (1.6-3.0)", type: "number", min: 0, max: 10 },
    { name: "GPT_ALT", label: "GPT/ALT UI/L (4-36)", type: "number", min: 0, max: 200 },
    { name: "GOT_AST", label: "GOT/AST UI/L (5-34)", type: "number", min: 0, max: 200 },
    { name: "Bilirrubina_Total", label: "Bilirrubina total mg/dl (0.2-1.2)", type: "number", min: 0, max: 10 },
    { name: "Bilirrubina_Directa", label: "Bilirrubina Directa mg/dl (0.0-0.2)", type: "number", min: 0, max: 5 },
    { name: "Bilirrubina_Indirecta", label: "Bilirrubina Indirecta mg/dl (0.0-1.0)", type: "number", min: 0, max: 5 },
    { name: "Fosfatasa_Alcalina", label: "Fosfatasa Alcalina UI/l (25-180)", type: "number", min: 0, max: 500 },
    { name: "Lactico_Deshidrogenasa", label: "Lactico Deshidrogenasa UI/l (80-285)", type: "number", min: 0, max: 1000 },
    { name: "Gamma_GT", label: "Gamma GT UI/l (6-37)", type: "number", min: 0, max: 200 },
    { name: "Amilasa", label: "Amilasa UI/l (25-125)", type: "number", min: 0, max: 500 },
    { name: "Creatinkinasa", label: "Creatinkinasa UI/l (0-160)", type: "number", min: 0, max: 1000 },
    { name: "Hierro_Total", label: "Hierro total Ug/dl (60-150)", type: "number", min: 0, max: 300 },
    { name: "CK_MB", label: "CK-MB UI/l (0-24)", type: "number", min: 0, max: 100 },
    { name: "PCR", label: "PCR (0.3 mg/l)", type: "number", min: 0, max: 10 },
    { name: "Creatinina", label: "Creatinina mg/dl (0.4-1.4)", type: "number", min: 0, max: 10 }
  ],
  "Estudios de Coagulacion": [
    { name: "Tiempo_Protombinica_Paciente", label: "Tiempo de protombinica - Paciente", type: "number", min: 0, max: 100 },
    { name: "Tiempo_Protombinica_Control", label: "Tiempo de protombinica - Control", type: "number", min: 0, max: 100 },
    { name: "Tiempo_Tromboplastina_Paciente", label: "Tiempo parcial de tromboplastina - Paciente", type: "number", min: 0, max: 100 },
    { name: "Tiempo_Tromboplastina_Control", label: "Tiempo parcial de tromboplastina - Control", type: "number", min: 0, max: 100 },
    { name: "Actividad_Protombinica", label: "Actividad protombinica", type: "number", min: 0, max: 200 },
    { name: "Diferencia_PC", label: "Diferencia (p-c) V.N +/-6", type: "number", min: -20, max: 20 },
    { name: "Razon_VN", label: "Razon V.N 0.8 a 1.2", type: "number", min: 0, max: 5 },
    { name: "INR", label: "INR", type: "number", min: 0, max: 10 },
    { name: "Fibronogeno", label: "Fibronogeno mg/% V.N 200-400 mg/%", type: "number", min: 0, max: 1000 }
  ],
  "Analisis de Heces": [
    { name: "Color", label: "Color", type: "text" },
    { name: "Consistencia", label: "Consistencia", type: "text" },
    { name: "Sangre_Oculta", label: "Sangre Oculta", type: "text" },
    { name: "Parasitos", label: "Parasitos", type: "text" },
    { name: "Leucocitos", label: "Leucocitos", type: "text" }
  ],
  "Analisis de Orina": [
    { name: "Color", label: "Color", type: "text" },
    { name: "Aspecto", label: "Aspecto", type: "text" },
    { name: "Densidad", label: "Densidad", type: "number", min: 1.000, max: 1.050, step: 0.001 },
    { name: "pH", label: "pH", type: "number", min: 0, max: 14, step: 0.1 },
    { name: "Proteinas", label: "Proteinas", type: "text" },
    { name: "Glucosa", label: "Glucosa", type: "text" },
    { name: "Cetonas", label: "Cetonas", type: "text" },
    { name: "Sangre", label: "Sangre", type: "text" },
    { name: "Leucocitos", label: "Leucocitos", type: "text" },
    { name: "Nitritos", label: "Nitritos", type: "text" }
  ],
  "Hematologia": [
    { name: "Hemoglobina", label: "Hemoglobina g/dl", type: "number", min: 0, max: 25 },
    { name: "Hematocrito", label: "Hematocrito %", type: "number", min: 0, max: 100 },
    { name: "Plaquetas", label: "Plaquetas /mm³", type: "number", min: 0, max: 1000000 },
    { name: "Leucocitos", label: "Leucocitos /mm³", type: "number", min: 0, max: 50000 },
    { name: "Neutrofilos", label: "Neutrofilos %", type: "number", min: 0, max: 100 },
    { name: "Linfocitos", label: "Linfocitos %", type: "number", min: 0, max: 100 },
    { name: "Eosinofilos", label: "Eosinofilos %", type: "number", min: 0, max: 100 },
    { name: "Monocitos", label: "Monocitos %", type: "number", min: 0, max: 100 }
  ]
};

function CreateExam() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState<ExamData>({
    patient_id: "",
    exam_type: "",
    date: new Date().toISOString().split('T')[0],
    results: {}
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pacients');
      const data = response.data;
      const patientList = Array.isArray(data)
        ? data
        : data.pacients || data.patients || data.results || data.data || [];
      setPatients(patientList);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [field]: value
      }
    }));
  };

  const calculateResults = (examType: string, results: Record<string, any>) => {
    const calculated = { ...results };

    if (examType === "Quimica Sanguinea") {
      // Calcular Bilirrubina Indirecta si no está presente
      if (calculated.Bilirrubina_Total && calculated.Bilirrubina_Directa) {
        calculated.Bilirrubina_Indirecta = calculated.Bilirrubina_Total - calculated.Bilirrubina_Directa;
      }

      // Calcular Relación A/G
      if (calculated.Albumina && calculated.Globulina) {
        calculated.Relacion_AG = calculated.Albumina / calculated.Globulina;
      }
    }

    if (examType === "Estudios de Coagulacion") {
      // Calcular INR
      if (calculated.Razon_VN) {
        calculated.INR = Math.pow(calculated.Razon_VN, 1.0); // Simplificado
      }
    }

    return calculated;
  };

  const saveExam = async () => {
    if (!formData.patient_id || !formData.exam_type) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    setSaving(true);
    try {
      const calculatedResults = calculateResults(formData.exam_type, formData.results);

      const examData = {
        ...formData,
        results: calculatedResults
      };

      await api.post('/exams', examData);
      alert('Examen guardado exitosamente');
      navigate('/dashboard/exams');
    } catch (error: any) {
      console.error('Error saving exam:', error);
      alert('Error al guardar el examen');
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = async () => {
    if (!formData.patient_id || !formData.exam_type) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const calculatedResults = calculateResults(formData.exam_type, formData.results);
    const patient = patients.find(p => p.id.toString() === formData.patient_id);

    // Aquí iría la lógica para generar PDF
    // Por ahora solo mostramos un mensaje
    alert(`Generando PDF para ${patient?.name} ${patient?.last_name} - ${formData.exam_type}`);
  };

  const selectedPatient = patients.find(p => p.id.toString() === formData.patient_id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/exams')}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white rounded-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <h1 className="font-display font-bold text-3xl">Crear Examen Médico</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-[var(--shadow-card)] p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Paciente</label>
            <select
              value={formData.patient_id}
              onChange={(e) => setFormData(prev => ({ ...prev, patient_id: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Seleccionar paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} {patient.last_name} - {patient.cedula}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Examen</label>
            <select
              value={formData.exam_type}
              onChange={(e) => setFormData(prev => ({ ...prev, exam_type: e.target.value, results: {} }))}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Seleccionar tipo</option>
              {examTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {selectedPatient && (
          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">Información del Paciente</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Nombre:</strong> {selectedPatient.name} {selectedPatient.last_name}</div>
              <div><strong>Cédula:</strong> {selectedPatient.cedula}</div>
            </div>
          </div>
        )}

        {formData.exam_type && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Parámetros del Examen</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examFields[formData.exam_type as keyof typeof examFields]?.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    // min={field.min}
                    // max={field.max}
                    // step={field.step}
                    value={formData.results[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={saveExam}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar Examen'}
          </button>
          <button
            onClick={generatePDF}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-200 bg-white rounded-md hover:bg-zinc-50"
          >
            <FileDown className="h-4 w-4" />
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;