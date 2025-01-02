import { useState } from "react";
import Registro from "./components/Registro";
import Login from "./components/Login";
import FormularioPresupuesto from "./components/FormularioPresupuesto";
import SeguimientoPresupuesto from "./components/RastreadorPresupuesto";
import ModalGasto from "./components/ModalGasto";
import ListaGastos from "./components/ListaGastos";
import FiltrarPorCategoria from "./components/FiltrarPorCategoria";
import { usarPresupuesto } from "./hooks/usePresupuesto";

//Aqui comienza la aplicacion, desde aqui se llama a los componentes

function App() {
  const [currentView, setCurrentView] = useState<"registro" | "login" | "dashboard">("registro");
  const { estado } = usarPresupuesto();
  const presupuestoValido = estado.presupuesto > 0;

  const handleRegistroExitoso = () => setCurrentView("login");
  const handleLoginExitoso = () => setCurrentView("dashboard");

  return (
    <>
        <>
          <header className="bg-green-600 py-8 max-h-72">
            <h1 className="uppercase text-center font-black text-4xl text-white">
              Planificador de Gastos
            </h1>
          </header>

          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
            {presupuestoValido ? <SeguimientoPresupuesto /> : <FormularioPresupuesto />}
          </div>

          {presupuestoValido && (
            <main className="max-w-3xl mx-auto py-10">
              <FiltrarPorCategoria />
              <ModalGasto />
              <ListaGastos />
            </main>
          )}
        </>
      
    </>
  );
}

export default App;
