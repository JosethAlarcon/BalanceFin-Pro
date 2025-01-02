import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { usarPresupuesto } from "../hooks/usePresupuesto";
import MostrarMonto from "./MostrarMonto";
import "react-circular-progressbar/dist/styles.css";

//Este codigo se encarga de llenar la grafica y resetear la aplicacion

export default function RastreadorPresupuesto() {
    const { estado, gastosTotales, presupuestoRestante, despachar } = usarPresupuesto();

    const porcentaje = +((gastosTotales / estado.presupuesto) * 100).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje === 100 ? '#DC2626' : '#00bb0c',
                        trailColor: '#ffeb99',
                        textColor: porcentaje === 100 ? '#DC2626' : '#00bb0c',
                        textSize: 10,
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-yellow-400 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={() => despachar({ type: 'reiniciar-app' })}
                >
                    Reiniciar App
                </button>
                <MostrarMonto
                    etiqueta="Presupuesto"
                    monto={estado.presupuesto}
                />
                <MostrarMonto
                    etiqueta="Disponible"
                    monto={presupuestoRestante}
                />
                <MostrarMonto
                    etiqueta="Gastado"
                    monto={gastosTotales}
                />
            </div>
        </div>
    );
}
