import { useMemo, useState } from "react";
import { usarPresupuesto } from "../hooks/usePresupuesto";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";

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

    const frases = [
        "Cada peso cuenta, ¡haz que valga la pena!",
        "El control financiero es el primer paso hacia la libertad.",
        "No se trata de cuánto ganas, sino de cómo lo gestionas.",
        "Presupuesta hoy, disfruta mañana.",
        "Tus metas están más cerca cuando llevas tus gastos al día."
    ];

    const fraseMotivacional = useMemo(() => {
        const indice = Math.floor(Math.random() * frases.length);
        return frases[indice];
    }, []);


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 border border-green-600"
        >
            <div className="text-center space-y-2">
                <PiggyBank className="mx-auto text-green-600" size={100} />
                <h1 className="text-3xl font-bold text-green-600">Bienvenido a BalanceFin Pro</h1>
                <p className="text-gray-600">
                    Una aplicación que te ayuda a ordenar tus ingresos y gastos mensuales con claridad y facilidad.
                    En el siguiente formulario ingresa tu presupuesto y disfruta de las increíbles funcionalidades que tenemos para ofrecerte.
                </p>
            </div>

            <form className="space-y-5" onSubmit={manejarEnvio}>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="presupuesto" className="text-xl font-semibold text-gray-700">
                        Define tu presupuesto inicial
                    </label>
                    <input
                        id="presupuesto"
                        type="number"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Ej: 500000"
                        value={presupuesto}
                        onChange={manejarCambio}
                    />
                </div>

                <input
                    type="submit"
                    value="Guardar Presupuesto"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                    disabled={esValido}
                />
                <p className="text-center text-2xl italic text-gray-500 mt-4">
                    {fraseMotivacional}
                </p>

            </form>
        </motion.div>
    );
}
