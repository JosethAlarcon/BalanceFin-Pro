import { ReactNode } from "react";

//Este codigo muestra un mensaje de error si se excede el presupuesto

type MensajeErrorProps = {
    children: ReactNode
}

export default function MensajeError({ children }: MensajeErrorProps) {
    return (
        <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
            {children}
        </p>
    )
}


