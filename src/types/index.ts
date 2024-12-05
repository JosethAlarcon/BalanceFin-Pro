export type Gasto = {
    id: string
    nombreGasto: string
    monto: number
    categoria: string
    fecha: Valor
}

export type GastoBorrador = Omit<Gasto, 'id'>

export type PiezaValor = Date | null;

export type Valor = PiezaValor | [PiezaValor, PiezaValor];

export type Categoria = {
    id: string
    nombre: string
    icono: string
}
