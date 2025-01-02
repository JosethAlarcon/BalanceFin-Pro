import { ChangeEvent, useEffect, useState } from "react";
import type { GastoBorrador, Valor } from "../types";
import { categorias } from "../data/categorias";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import MensajeError from "./MensajeError";
import { usarPresupuesto } from "../hooks/usePresupuesto";

//Este formulario se encargar de recibir los datos de los gastos y procesarlos

export default function FormularioGasto() {

    const [gasto, setGasto] = useState<GastoBorrador>({
        monto: 0,
        nombreGasto: '',
        categoria: '',
        fecha: new Date()
    });

    const [error, setError] = useState('');
    const [montoAnterior, setMontoAnterior] = useState(0);
    const { despachar, estado, presupuestoRestante } = usarPresupuesto();

    useEffect(() => {
        if (estado.idEditando) {
            const gastoEnEdicion = estado.gastos.filter(
                gastoActual => gastoActual.id === estado.idEditando
            )[0];
            setGasto(gastoEnEdicion);
            setMontoAnterior(gastoEnEdicion.monto);
        }
    }, [estado.idEditando]);

    const manejarCambio = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const esCampoMonto = ['monto'].includes(name);
        setGasto({
            ...gasto,
            [name]: esCampoMonto ? Number(value) : value
        });
    };

    const manejarCambioFecha = (valor: Valor) => {
        setGasto({
            ...gasto,
            fecha: valor
        });
    };

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if (Object.values(gasto).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

        // Validar que no exceda el presupuesto restante
        if ((gasto.monto - montoAnterior) > presupuestoRestante) {
            setError('Ese gasto se sale del presupuesto');
            return;
        }

        // Agregar o actualizar gasto
        if (estado.idEditando) {
            despachar({
                type: 'actualizar-gasto',
                payload: { gasto: { id: estado.idEditando, ...gasto } }
            });
        } else {
            despachar({
                type: 'agregar-gasto',
                payload: { gasto }
            });
        }

        // Reiniciar el estado
        setGasto({
            monto: 0,
            nombreGasto: '',
            categoria: '',
            fecha: new Date()
        });
        setMontoAnterior(0);
    };

    return (
        <form className="space-y-5" onSubmit={manejarEnvio}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-yellow-500 py-2">
                {estado.idEditando ? 'Guardar cambios' : 'Nuevo gasto'}
            </legend>

            {error && <MensajeError>{error}</MensajeError>}

            <div className="flex flex-col gap-2">
                <label htmlFor="nombreGasto" className="text-xl">
                    Nombre del Gasto:
                </label>
                <input
                    type="text"
                    id="nombreGasto"
                    placeholder="Añade el nombre del gasto"
                    className="bg-yellow-50 p-2"
                    name="nombreGasto"
                    value={gasto.nombreGasto}
                    onChange={manejarCambio}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="monto" className="text-xl">
                    Monto:
                </label>
                <input
                    type="number"
                    id="monto"
                    placeholder="Añade la cantidad del gasto ej. 300"
                    className="bg-yellow-50 p-2"
                    name="monto"
                    value={gasto.monto}
                    onChange={manejarCambio}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="categoria" className="text-xl">
                    Categoría:
                </label>
                <select
                    id="categoria"
                    className="bg-yellow-50 p-2"
                    name="categoria"
                    onChange={manejarCambio}
                    value={gasto.categoria}
                >
                    <option value="">--- Seleccione ---</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="fecha" className="text-xl">
                    Fecha del Gasto:
                </label>
                <DatePicker
                    className="bg-yellow-50 p-2 border-0"
                    value={gasto.fecha}
                    onChange={manejarCambioFecha}
                />
            </div>

            <input
                type="submit"
                className="bg-yellow-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={estado.idEditando ? 'Guardar cambios' : 'Registrar Gasto'}
            />
        </form>
    );
}
