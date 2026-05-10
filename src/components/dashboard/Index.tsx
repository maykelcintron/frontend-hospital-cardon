import { Outlet } from 'react-router'
import Sidebard from './Sidebard'

const Index = () => {
  return (
     <div className="min-h-screen flex bg-background">
      <Sidebard />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Index
