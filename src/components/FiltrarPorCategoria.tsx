import { ChangeEvent } from "react";
import { categorias } from "../data/categorias";
import { usarPresupuesto } from "../hooks/usePresupuesto";

export default function FiltrarPorCategoria() {

    const { despachar } = usarPresupuesto();

    const manejarCambio = (e: ChangeEvent<HTMLSelectElement>) => {
        despachar({ type: 'agregar-filtro-categoria', payload: { id: e.target.value } });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">
                        Filtrar gastos
                    </label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={manejarCambio}
                    >
                        <option value="">-- Todas las categorías</option>
                        {categorias.map(category => (
                            <option
                                value={category.id}
                                key={category.id}
                            >
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
