import { combineReducers } from 'redux';
import { MonedasReducer } from './Monedas';
import { TicketsReducer } from './Tickets';

export const Reducers = {
    Monedas: MonedasReducer,
    Tickets: TicketsReducer
};

export default combineReducers(Reducers);
