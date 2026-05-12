import { Link, useNavigate, useLocation } from 'react-router';
import { BrandLogo } from '../brand-logo';
import { FileText, LayoutDashboard, LogOut, UserCircle, Users } from 'lucide-react';
import cn from 'clsx'
import { useEffect } from 'react';

const items = [
  { to: "/dashboard", label: "Resumen", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/patients", label: "Pacientes", icon: Users },
  { to: "/dashboard/exams", label: "Exámenes", icon: FileText },
  { to: "/dashboard/profile", label: "Perfil", icon: UserCircle },
];

const Sidebard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    useEffect(() => {
      if (!localStorage.getItem('user')) {
        navigate('/auth/login')
      }
    }, [navigate])

    const logout = () => {
      localStorage.removeItem('user')
      navigate('/auth/login')
      return
    }

  return (
      <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <BrandLogo subtitle="Centro Hospital Cardón" />
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const active = item.exact ? path === item.to : path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#00839A] text-sidebar-primary-foreground shadow-[var(--shadow-card)]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="bgh-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 w-full">
        <button onClick={logout} className="w-full cursor-pointer text-red-500 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="h-4 w-4 text-red-500" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default Sidebard
    