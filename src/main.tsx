import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './index.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/auth/Login.tsx'
import Register from './components/auth/Register.tsx'
import NotFound from './components/NotFound.tsx'
import Dashboard from './components/dashboard/Index.tsx'
import Home from './components/dashboard/Home.tsx'
import Patients from './components/dashboard/Patients.tsx'
import ProfilePage from './components/dashboard/Profile.tsx'
import CreatePacient from './components/dashboard/CreatePacient.tsx'
import CreateExam from './components/dashboard/CreateExam.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/new" element={<CreatePacient />} />
          <Route path="exams" element={<CreateExam />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
