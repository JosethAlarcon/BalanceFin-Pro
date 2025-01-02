import { useMemo, useState } from "react";
import { usarPresupuesto } from "../hooks/usePresupuesto";

//Este codigo se engarga de recibir y procesar los datos del presupuesto

export default function FormularioPresupuesto() {

    const [presupuesto, setPresupuesto] = useState(0);
    const { despachar } = usarPresupuesto();

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPresupuesto(e.target.valueAsNumber);
    };

    const esValido = useMemo(() => {
        return isNaN(presupuesto) || presupuesto <= 0;
    }, [presupuesto]);

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        despachar({ type: 'agregar-presupuesto', payload: { presupuesto } });
    };

    return (
        <form className="space-y-5" onSubmit={manejarEnvio}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="presupuesto" className="text-4xl text-green-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="presupuesto"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="presupuesto"
                    value={presupuesto}
                    onChange={manejarCambio}
                />
            </div>

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-green-600 hover:bg-green-700 cursor-pointer w-full p-2 text-white 
                font-black uppercase disabled:opacity-40"
                disabled={esValido}
            />
        </form>
    );
}
