import { formatearMoneda } from "./helpers"

//Este codigo tipea la moneda y la formatea

type MostrarMontoProps = {
    etiqueta?: string
    monto: number
}

export default function MostrarMonto({ etiqueta, monto }: MostrarMontoProps) {
    return (
        <p className="text-2xl text-green-600 font-bold">
            {etiqueta && `${etiqueta}: `}
            <span className="font-black text-gray-700">{formatearMoneda(monto)}</span>
        </p>
    )
}
