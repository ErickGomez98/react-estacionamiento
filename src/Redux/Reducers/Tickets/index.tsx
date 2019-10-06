
import { IAllState } from '../../../Util/Types/Types-Interfaces';

type TTicketsActions =
    'EntradaTicket' |
    'SalidaTicket';


export interface ITicketsAction {
    type: TTicketsActions,
    payload: Partial<IAllState['Tickets']>
}

export const initialTicketsState: IAllState['Tickets'] = {
    listaTickets: [],
    precioPorFraccion: 6,
    folioTicket: 0,
    newItem: {
        id: 0,
        fechaEntrada: new Date(),
        fechaSalida: new Date(),
        totalPagar: 0
    }
};


export const TicketsReducer = (state = initialTicketsState, action: ITicketsAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'EntradaTicket':
            if (payload.newItem) {
                return { ...state, ...payload, listaTickets: [...state.listaTickets, payload.newItem] }
            } else {
                return { ...state, ...payload }
            }
        case 'SalidaTicket':
        default:
            return state;
    }
}