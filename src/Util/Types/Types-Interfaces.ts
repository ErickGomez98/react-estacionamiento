export interface ITicket {
    id: number,
    fechaEntrada: Date,
    fechaSalida: Date,
    totalPagar: number
}

export interface IAllState {
    Monedas: {
        moneda2: boolean,
        moneda5: boolean,
        moneda10: boolean,
        moneda20: boolean,
    },
    Tickets: {
        listaTickets: ITicket[],
        precioPorFraccion: number,
        folioTicket: number,
        newItem: ITicket
    }
}