
import { IAllState } from '../../../Util/Types/Types-Interfaces';

type TMonedasActions = 'CambiarMonedasActivas';


export interface IMonedasAction {
    type: TMonedasActions,
    payload: Partial<IAllState['Monedas']>,
    _reponse?: any
}

export const initialMonedasState: IAllState['Monedas'] = {
    moneda2: true,
    moneda5: true,
    moneda10: true,
    moneda20: true,
};


export const MonedasReducer = (state = initialMonedasState, action: IMonedasAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'CambiarMonedasActivas':
            return { ...state, ...payload }
        default:
            return state;
    }
}