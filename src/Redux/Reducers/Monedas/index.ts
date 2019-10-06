
import { IAllState } from '../../../Util/Types/Types-Interfaces';

type TMainActions =
    'CambiarMonedasActivas' |
    'Action';


export interface IMonedasAction {
    type: TMainActions,
    payload: Partial<IAllState['Monedas']>,
    _reponse?: any
}

export const initialMainState: IAllState['Monedas'] = {
    moneda2: true,
    moneda5: true,
    moneda10: true,
    moneda20: true,
};


export const MainReducer = (state = initialMainState, action: IMonedasAction) => {
    const { type, payload, _reponse = {} } = action;
    switch (type) {
        case 'CambiarMonedasActivas':
            return { ...state, ...payload }
        case 'Action':
        default:
            return state;
    }
}