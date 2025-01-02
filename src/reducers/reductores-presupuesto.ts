import { v4 as uuidv4 } from 'uuid'
import { Categoria, GastoBorrador, Gasto } from "../types"

//El reductor maneja todos los "Estados" y las "Funciones"


//Acciones que puede hacer nuestra aplicacion
export type AccionesPresupuesto =
    {type: 'agregar-presupuesto', payload: {presupuesto: number}} |
    {type: 'mostrar-modal'} |
    {type: 'cerrar-modal'} |
    {type: 'agregar-gasto', payload: {gasto: GastoBorrador}} |
    {type: 'eliminar-gasto', payload: {id: Gasto['id']}} |
    {type: 'obtener-gasto-por-id', payload: {id: Gasto['id']}} |
    {type: 'actualizar-gasto', payload: {gasto: Gasto}} |
    {type: 'reiniciar-app'} |
    {type: 'agregar-filtro-categoria', payload: {id: Categoria['id']}}

//Determina como debe estar el estado del presupuesto
export type EstadoPresupuesto = {
    presupuesto: number
    modal: boolean
    gastos: Gasto[]
    idEditando: Gasto['id']
    categoriaActual: Categoria['id']
}

const presupuestoInicial = () : number => {
    const presupuestoLocal = localStorage.getItem('presupuesto')
    return presupuestoLocal ? +presupuestoLocal : 0
}

const gastosLocalStorage = () : Gasto[] => {
    const gastosLocal = localStorage.getItem('gastos')
    return gastosLocal ? JSON.parse(gastosLocal) : []
}

export const estadoInicial = {
    presupuesto: presupuestoInicial(),
    modal: false,
    gastos: gastosLocalStorage(),
    idEditando: '',
    categoriaActual: ''
}

const crearGasto = (gastoBorrador: GastoBorrador) : Gasto => {
    return {
        ...gastoBorrador,
        id: uuidv4()
    }
}

export const ReducirPresupuesto = (
    estado: EstadoPresupuesto = estadoInicial,
    accion: AccionesPresupuesto
) => {
    if(accion.type === 'agregar-presupuesto') {
        return{
            ...estado,
            presupuesto: accion.payload.presupuesto
        }
    }

    if(accion.type === 'mostrar-modal'){
        return {
            ...estado,
            modal: true
        }
    }

    if(accion.type === 'cerrar-modal'){
        return {
            ...estado,
            modal: false,
            idEditando: ''
        }
    }

    if(accion.type === 'agregar-gasto'){

        const gasto = crearGasto(accion.payload.gasto)

        return {
            ...estado,
            gastos: [...estado.gastos, gasto],
            modal: false
        }
    }

    if(accion.type === 'eliminar-gasto'){
        return{
            ...estado,
            gastos: estado.gastos.filter( gasto => gasto.id !== accion.payload.id)
        }
    }

    if(accion.type === 'obtener-gasto-por-id'){
        return{
            ...estado,
            idEditando: accion.payload.id,
            modal: true
        }
    }

    if(accion.type === 'actualizar-gasto'){
        return{
            ...estado,
            gastos: estado.gastos.map(gasto => gasto.id === accion.payload.gasto.id ? accion.payload.gasto : gasto),
            modal: false,
            idEditando: ''
        }
    }

    if(accion.type === 'reiniciar-app'){
        return{
            ...estado,
            presupuesto: 0,
            gastos: []
        }
    }

    if(accion.type === 'agregar-filtro-categoria') {
        return {
            ...estado,
            categoriaActual: accion.payload.id
        }
    }

    return estado
}
