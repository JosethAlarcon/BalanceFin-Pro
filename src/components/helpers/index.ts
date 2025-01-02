//Funcion para formatear moneda y darle el formate CLP

export function formatearMoneda(monto: number) {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'CLP'}).format(monto)
}

//Funcion para formatear fecha

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
