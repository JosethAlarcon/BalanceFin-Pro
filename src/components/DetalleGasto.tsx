import { useMemo } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import { Gasto } from "../types";
import MostrarMonto from "./MostrarMonto";
import { formatearFecha } from "./helpers";
import { categorias } from "../data/categorias";
import { usarPresupuesto } from "../hooks/usePresupuesto";
import "react-swipeable-list/dist/styles.css";

type DetalleGastoProps = {
    gasto: Gasto
};

export default function DetalleGasto({ gasto }: DetalleGastoProps) {

    const { despachar } = usarPresupuesto();

    const informacionCategoria = useMemo(
        () => categorias.filter(cat => cat.id === gasto.categoria)[0],
        [gasto]
    );

    const accionesIniciales = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => despachar({ type: 'obtener-gasto-por-id', payload: { id: gasto.id } })}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const accionesFinales = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => despachar({ type: 'eliminar-gasto', payload: { id: gasto.id } })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={accionesIniciales()}
                trailingActions={accionesFinales()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/icono_${informacionCategoria.icono}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {informacionCategoria.nombre}
                        </p>
                        <p>{gasto.nombreGasto}</p>
                        <p className="text-slate-600 text-sm">
                            {formatearFecha(gasto.fecha!.toString())}
                        </p>
                    </div>

                    <MostrarMonto
                        monto={gasto.monto}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
