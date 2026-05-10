import axios from 'axios'

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api