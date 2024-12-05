import { useContext } from "react"
import { ContextoPresupuesto } from "../context/PresupuestoContext"

export const usarPresupuesto = () => {
    const contexto = useContext(ContextoPresupuesto)
    if (!contexto) {
        throw new Error('usarPresupuesto debe ser usado dentro de un BudgetProvider')
    }
    return contexto
}