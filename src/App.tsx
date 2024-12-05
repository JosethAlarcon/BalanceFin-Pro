import { useEffect, useMemo } from "react"
import FormularioPresupuesto from "./components/FormularioPresupuesto"
import { usarPresupuesto } from "./hooks/usePresupuesto"
import SeguimientoPresupuesto from "./components/RastreadorPresupuesto"
import ModalGasto from "./components/ModalGasto"
import ListaGastos from "./components/ListaGastos"
import FiltrarPorCategoria from "./components/FiltrarPorCategoria"

function App() {

  const { estado } = usarPresupuesto()

  const presupuestoValido = useMemo(() => estado.presupuesto > 0 , [estado.presupuesto])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', estado.presupuesto.toString())
    localStorage.setItem('gastos', JSON.stringify(estado.gastos))
  }, [estado])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {presupuestoValido ? <SeguimientoPresupuesto/> : <FormularioPresupuesto />}
      </div>

      {presupuestoValido && (
        <main className="max-w-3xl mx-auto py-10">
            <FiltrarPorCategoria />
            <ModalGasto />
            <ListaGastos />
        </main>
      )}
    </>
  )
}

export default App

