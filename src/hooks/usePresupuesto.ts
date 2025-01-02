import { useContext } from "react"
import { ContextoPresupuesto } from "../context/PresupuestoContext"

//Permite llamar el context directamente.

export const usarPresupuesto = () => {
    const contexto = useContext(ContextoPresupuesto)
    if (!contexto) {
        throw new Error('usarPresupuesto debe ser usado dentro de un BudgetProvider')
    }
    return contexto
}
