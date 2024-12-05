import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProveedorPresupuesto } from './context/PresupuestoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProveedorPresupuesto>
      <App />
    </ProveedorPresupuesto>
  </StrictMode>,
)

