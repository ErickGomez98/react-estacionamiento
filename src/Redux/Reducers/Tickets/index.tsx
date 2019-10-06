
import { IAllState } from '../../../Util/Types/Types-Interfaces';

type TTicketsActions =
    'EntradaTicket' |
    'SalidaTicket';


export interface ITicketsAction {
    type: TTicketsActions,
    payload: Partial<IAllState['Tickets']>,
    _reponse?: any
}

export const initialTicketsState: IAllState['Tickets'] = {
    listaTickets: [],
    precioPorHora: 10
};


export const TicketsReducer = (state = initialTicketsState, action: ITicketsAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'EntradaTicket':
            return { ...state, ...payload }
        case 'SalidaTicket':
        default:
            return state;
    }
}