import { Lock, Mail, User } from 'lucide-react'
import { BrandLogo } from '../brand-logo'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import api from '../../services/api'

const Register = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const submit = async (event: any) => {
      event.preventDefault()
      setLoading(true)

      if(!fullName || !email || !password || !confirmPassword || !role) {
        setError('Por favor, completa todos los campos.')
        setLoading(false)
        return
      }

      try {
        if(password !== confirmPassword) {
          setLoading(false)
          setError('Las contraseñas no coinciden.')
          return
        }
        
        const response = await api.post('/auth/register', { username: fullName, email, password, role })

        if (response.status === 200) {
          navigate('/dashboard')
          await localStorage.setItem('user', JSON.stringify(response.data))
        } else{
          setError(response.data.message.detail || 'Error al crear cuenta')
        }

      } catch (error: any) {
        console.error('Error en la solicitud de registro:', error)
        setError('Error al crear cuenta')
      }

      setLoading(false)
    }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#00839A]">
      <div className="hidden md:flex flex-col justify-between p-12 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="bg-white/15 backdrop-blur rounded-2xl p-3 w-fit">
          <BrandLogo subtitle="Seguros Sociales" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-4xl leading-tight">
            Únete al sistema clínico del IVSS.
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-sm">
            Accede a tus pacientes, gestiona exámenes y genera reportes en segundos.
          </p>
        </div>
        <div className="text-xs text-primary-foreground/70">© IVSS · Centro Hospital Cardón</div>
      </div>

      <div className="flex items-center justify-center p-8 bg-white">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display font-bold text-3xl">Crear cuenta</h1>
            <p className="text-sm text-muted-foreground mt-1">Regístrate para acceder al sistema clínico del IVSS.</p>
          </div>

            <div className="space-y-2">
            <label 
                htmlFor="fullName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
                Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                    type="text" 
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lcdo. Ana Pérez" 
                    className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label 
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
                Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="bionalista@ivss.gob.ve" 
                    className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label 
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
                Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
          </div>
          <div className="space-y-2">
            <label 
                htmlFor="confirmPassword"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
                Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
          </div>

          {/* Rol escribir */}
          <div className="space-y-2">
            <label
                htmlFor="role"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950"
            >
                Rol
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder='Bionalista'
                    className="flex h-10 w-full pl-9 rounded-md border border-zinc-200 bg-white/50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
          </div>

          {error && (
            <div className="text-sm text-center text-red-500">{error}</div>
          )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-md bg-[#009192] px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
            {loading ? "Verificando..." : "Crear cuenta"}
        </button>
          <p className="text-sm text-center text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/auth/login" className="text-primary font-medium hover:underline">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
