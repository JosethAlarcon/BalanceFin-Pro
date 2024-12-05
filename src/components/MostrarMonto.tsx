import { formatearMoneda } from "./helpers"

type MostrarMontoProps = {
    etiqueta?: string
    monto: number
}

export default function MostrarMonto({ etiqueta, monto }: MostrarMontoProps) {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {etiqueta && `${etiqueta}: `}
            <span className="font-black text-black">{formatearMoneda(monto)}</span>
        </p>
    )
}
