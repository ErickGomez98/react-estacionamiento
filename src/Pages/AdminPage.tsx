import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moneda from '../components/Moneda/Moneda';
import { useSelector, useDispatch } from 'react-redux';
import { IAllState } from '../Util/Types/Types-Interfaces';
import { IMonedasAction } from '../Redux/Reducers/Monedas';
import { Dispatch } from 'redux';
import RegistroTickets from '../components/Tickets/RegistroTickets';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
    }),
);
interface Props {

}

const AdminPage: React.FC<Props> = () => {
    const classes = useStyles();
    const Monedas = useSelector<IAllState, IAllState['Monedas']>((state) => state.Monedas);
    const dispatchMonedas = useDispatch<Dispatch<IMonedasAction>>();
    const ListaTickets = useSelector<IAllState, IAllState['Tickets']['listaTickets']>((state) => state.Tickets.listaTickets);
    return (
        <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Catálogo de Monedas.
                    </Typography>

                    <Typography variant="caption" color='primary'>
                        *Da click en las monedas para activarlas o desactivarlas.
                    </Typography>

                    <Grid container spacing={3} style={{ marginTop: '10px' }}>
                        <Grid item sm={3} xs={6}>
                            <Moneda denominacion={2} active={Monedas.moneda2} clickEv={() => { dispatchMonedas({ type: 'CambiarMonedasActivas', payload: { moneda2: !Monedas.moneda2 } }) }} />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <Moneda denominacion={5} active={Monedas.moneda5} clickEv={() => { dispatchMonedas({ type: 'CambiarMonedasActivas', payload: { moneda5: !Monedas.moneda5 } }) }} />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <Moneda denominacion={10} active={Monedas.moneda10} clickEv={() => { dispatchMonedas({ type: 'CambiarMonedasActivas', payload: { moneda10: !Monedas.moneda10 } }) }} />
                        </Grid>
                        <Grid item sm={3} xs={6}>
                            <Moneda denominacion={20} active={Monedas.moneda20} clickEv={() => { dispatchMonedas({ type: 'CambiarMonedasActivas', payload: { moneda20: !Monedas.moneda20 } }) }} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Registro de Tickets
                    </Typography>
                    {ListaTickets.length ?
                        <RegistroTickets registros={ListaTickets} />
                        :
                        <Typography variant="h6" color='error'>
                            No hay ningún ticket registrado
                        </Typography>
                    }
                </Paper>
            </Grid>
        </Grid>
    )
};

export default AdminPage;