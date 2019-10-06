import { combineReducers } from 'redux';
import { MainReducer as MonedasReducer } from './Monedas';

export const Reducers = {
    Monedas: MonedasReducer,
};

export default combineReducers(Reducers);
