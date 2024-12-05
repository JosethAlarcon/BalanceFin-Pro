import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import { AccionesPresupuesto, ReducirPresupuesto, EstadoPresupuesto, estadoInicial } from "../reducers/reductores-presupuesto";

type ContextoPresupuestoProps = {
    estado: EstadoPresupuesto
    despachar: Dispatch<AccionesPresupuesto>
    gastosTotales: number
    presupuestoRestante: number
}

type ProveedorPresupuestoProps = {
    children: ReactNode
}

export const ContextoPresupuesto = createContext<ContextoPresupuestoProps>(null!);

export const ProveedorPresupuesto = ({ children }: ProveedorPresupuestoProps) => {

    const [estado, despachar] = useReducer(ReducirPresupuesto, estadoInicial);

    const gastosTotales = useMemo(() => estado.gastos.reduce((total, gasto) => gasto.monto + total, 0), [estado.gastos]);

    const presupuestoRestante = estado.presupuesto - gastosTotales;

    return (
        <ContextoPresupuesto.Provider
            value={{
                estado,
                despachar,
                gastosTotales,
                presupuestoRestante
            }}
        >
            {children}
        </ContextoPresupuesto.Provider>
    )
}
