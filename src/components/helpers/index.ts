export function formatearMoneda(monto: number) {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(monto)
}

export function formatearFecha(fechaStr: string): string {
    const fechaObj = new Date(fechaStr)
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', opciones).format(fechaObj)
}
