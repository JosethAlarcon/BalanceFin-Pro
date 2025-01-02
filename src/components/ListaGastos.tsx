import { useMemo } from "react";
import { usarPresupuesto } from "../hooks/usePresupuesto";
import DetalleGasto from "./DetalleGasto";

//Este codigo hace que se muestren los gastos

export default function ListaGastos() {

    const { estado } = usarPresupuesto();

    const gastosFiltrados = estado.categoriaActual ? 
        estado.gastos.filter(gasto => gasto.categoria === estado.categoriaActual) : estado.gastos;

    const estaVacio = useMemo(() => gastosFiltrados.length === 0, [gastosFiltrados]);

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {estaVacio ? (
                <p className="text-green-600 text-2xl font-bold">
                    No hay gastos
                </p>
            ) : (
                <>
                    <p className="text-green-600 text-2xl font-bold my-5">
                        Listado de gastos
                    </p>
                    {gastosFiltrados.map(gasto => (
                        <DetalleGasto
                            key={gasto.id}
                            gasto={gasto}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
