import React from 'react';

export type DenominacionMoneda = 2 | 5 | 10 | 20;
interface Props {
    denominacion: DenominacionMoneda,
    clickEv: () => void,
    active: boolean
}

const Moneda: React.FC<Props> = (props) => {
    return (
        <div onClick={props.clickEv} className={'moneda' + (props.active ? ' active' : '')}>
            {props.denominacion}
        </div>
    );
};

export default Moneda;
