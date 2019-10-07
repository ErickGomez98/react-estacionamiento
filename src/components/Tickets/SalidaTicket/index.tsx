import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import parkingLotExitImg from '../../../assets/img/parking_lot_exit.jpeg';
import Collapse from '@material-ui/core/Collapse';
import { Grid, Snackbar, Divider } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import { IAllState, ITicket } from '../../../Util/Types/Types-Interfaces';
import { Dispatch } from 'redux';
import { ITicketsAction } from '../../../Redux/Reducers/Tickets';
import Moneda from '../../Moneda/Moneda';

interface Props {

};

interface State {
    folio: string
}

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 400,
    },
});

const SalidaTicket: React.FC<Props> = () => {
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        folio: '',
    });
    const [firstPhase, setFirstPhase] = useState<boolean>(true);
    const [secondPhase, setSecondPhase] = useState<boolean>(false);
    const [thirdPhase, setThirdPhase] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [ticketFound, setTicketFound] = useState<ITicket>();
    const [totalPagar, setTotalPagar] = useState<number>(0);
    const [cambioMonedas, setCambioMonedas] = useState<any>(0);
    const [totalDepositado, setTotalDepositado] = useState<number>(0);
    const listaTickets = useSelector<IAllState, IAllState['Tickets']['listaTickets']>((state) => state.Tickets.listaTickets);
    const precioPorFraccion = useSelector<IAllState, IAllState['Tickets']['precioPorFraccion']>((state) => state.Tickets.precioPorFraccion);
    const Monedas = useSelector<IAllState, IAllState['Monedas']>((state) => state.Monedas);
    const dispatchTickets = useDispatch<Dispatch<ITicketsAction>>();

    const [tmpTimeout, setTmpTimeout] = useState<any>();


    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const buscarFolio = () => {
        const localCopyListTickets = [...listaTickets];
        const found = localCopyListTickets.filter(item => item.id === +values.folio);

        if (found.length) {
            const tmpFoundTicket = found.pop();
            if (tmpFoundTicket) {
                if (tmpFoundTicket.fechaEntrada.getTime() === tmpFoundTicket.fechaSalida.getTime()) {
                    const now = new Date();
                    const diff = Math.floor((now.getTime() - tmpFoundTicket.fechaEntrada.getTime()) / 1000);
                    const endDate = new Date(tmpFoundTicket.fechaEntrada.getTime() + (diff * 60000));
                    const totalPagar = diff > 15 ? Math.floor(Math.ceil((diff / 15)) * precioPorFraccion) : precioPorFraccion;
                    setTicketFound({
                        id: tmpFoundTicket.id,
                        fechaEntrada: tmpFoundTicket.fechaEntrada,
                        fechaSalida: endDate,
                        totalPagar
                    });
                    setFirstPhase(false);
                    setSecondPhase(true);
                    setTotalPagar(totalPagar);
                } else {
                    setValues({
                        ...values, folio: ''
                    });
                    setNotFound(true);
                }
            }

        } else {
            setValues({
                ...values, folio: ''
            });
            setNotFound(true);
        }
    }

    const handleMonedaClick = (denominacion: number) => {
        setTotalDepositado(totalD => totalD + denominacion);
        setTotalPagar(totalPagar => totalPagar - denominacion);

    };


    useEffect(() => {
        if (secondPhase && ticketFound) {
            if (totalDepositado >= ticketFound.totalPagar) {
                dispatchTickets({ type: 'SalidaTicket', payload: { newItem: ticketFound } })
                setSecondPhase(false);
                setThirdPhase(true);

                if (tmpTimeout) {
                    clearTimeout(tmpTimeout);
                }

                const tmp = setTimeout(() => {
                    setFirstPhase(true);
                    setSecondPhase(false);
                    setThirdPhase(false);
                    setValues({
                        ...values, folio: ''
                    });
                }, 10000);
                setTmpTimeout(tmp);

                // Calcular el cambio
                let tmpCreditos = 0;
                const tmpCambio: any = {};
                const monedasActivas: any = [];
                Object.entries(Monedas)
                    .map(([key, value]) => ({ key, value })).map((item) => {
                        if (item.value) {
                            monedasActivas.push(+item.key.replace('moneda', ''));
                        }
                    })

                monedasActivas.push(1);

                // Ordenar mayor a menor
                //@ts-ignore
                monedasActivas.sort((a, b) => b - a);

                while (tmpCreditos !== Math.abs(totalPagar)) {
                    for (let i = 0; i < monedasActivas.length; i++) {
                        if ((tmpCreditos + monedasActivas[i]) <= Math.abs(totalPagar)) {
                            tmpCreditos += monedasActivas[i];
                            tmpCambio[monedasActivas[i]] = !(tmpCambio[monedasActivas[i]]) ? 1 : tmpCambio[monedasActivas[i]] + 1;
                            break;
                        }

                    }
                }

                setCambioMonedas(tmpCambio);
            }
        }
    }, [totalDepositado])



    return (
        <>
            <Collapse in={firstPhase}>
                <Grid container spacing={3} justify='center' alignItems='center'>
                    <Grid item lg={8} sm={12}>
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={parkingLotExitImg}
                                    title="Estacionamiento"
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Salida
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ingresa el folio de tu ticket
                                </Typography>

                                <TextField
                                    id="ticket-folio"
                                    type="number"
                                    label="Folio de Ticket"
                                    value={values.folio}
                                    onChange={handleChange('folio')}
                                    margin="normal"
                                    variant="filled"
                                    fullWidth={true}
                                />

                            </CardContent>
                            <CardActions>
                                <Button size="large" color="primary" variant="contained" fullWidth={true} onClick={() => { buscarFolio() }}>
                                    Buscar Ticket
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Collapse>
            <Collapse in={secondPhase}>
                <Grid container spacing={3} justify='center' alignItems='center'>
                    <Grid item lg={8} sm={12}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 'auto' }}
                                >
                                    <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                                            <Typography gutterBottom variant="h2" component="h2">
                                                FOLIO {values.folio}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardMedia>
                            </CardActionArea>
                            <CardContent>
                                <Grid container>
                                    <Grid item sm={6}>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            Hora llegada: {ticketFound && ticketFound.fechaEntrada.toLocaleString('es-MX')}
                                        </Typography>
                                        <Divider />
                                        <Typography gutterBottom variant="h5" component="h5">
                                            Hora salida: {ticketFound && ticketFound.fechaSalida.toLocaleString('es-MX')}
                                        </Typography>
                                        <Divider />
                                        <Typography gutterBottom variant="h5" component="h5">
                                            Duración total: {ticketFound && Math.floor((ticketFound.fechaSalida.getTime() - ticketFound.fechaEntrada.getTime()) / 60000)} minutos
                                            </Typography>

                                    </Grid>
                                    <Grid item sm={6} style={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="h3" component="h3">
                                            Total a pagar: $ {totalPagar}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Typography variant="body1" style={{ marginTop: '20px' }} component="p">
                                    Selecciona las monedas para pagar la cantidad total indicada arriba.
                                    </Typography>

                                <Grid container>
                                    <Grid item sm={2}>
                                        <Moneda active={true} clickEv={() => handleMonedaClick(1)} denominacion={1} />
                                    </Grid>
                                    {Monedas.moneda2 && <Grid item sm={2}><Moneda active={true} clickEv={() => handleMonedaClick(2)} denominacion={2} /></Grid>}
                                    {Monedas.moneda5 && <Grid item sm={2}><Moneda active={true} clickEv={() => handleMonedaClick(5)} denominacion={5} /></Grid>}
                                    {Monedas.moneda10 && <Grid item sm={2}><Moneda active={true} clickEv={() => handleMonedaClick(10)} denominacion={10} /></Grid>}
                                    {Monedas.moneda20 && <Grid item sm={2}><Moneda active={true} clickEv={() => handleMonedaClick(20)} denominacion={20} /></Grid>}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid >
            </Collapse >

            <Collapse in={thirdPhase}>
                <Grid container spacing={3} justify='center' alignItems='center'>
                    <Grid item lg={8} sm={12}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 'auto' }}
                                    title="Estacionamiento"
                                >
                                    <Grid style={{ height: '155%' }} container spacing={3} direction='row' justify='center' alignItems='center'>
                                        <Grid item xs={12} style={{ textAlign: 'center', fontSize: '150px' }}>
                                            <CheckCircleIcon htmlColor='green' fontSize='inherit' />
                                            <Typography gutterBottom variant="h2" component="h2">
                                                FOLIO {values.folio}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardMedia>
                            </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Total ticket: $ {ticketFound && ticketFound.totalPagar}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Total Pagado: $ {totalDepositado}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Cambio: $ {Math.abs(totalPagar)}
                                </Typography>

                                {Object.entries(cambioMonedas).map(([key, value]) => ({ key, value })).map((item) => {
                                    return <div key={item.key}> Moneda: {item.key} | Cantidad: {item.value}</div>
                                })}

                            </CardContent>
                            <CardActions>
                                <Button size="large" color="secondary" variant="contained" onClick={() => {
                                    setFirstPhase(true);
                                    setSecondPhase(false);
                                    setThirdPhase(false);
                                    setValues({
                                        ...values, folio: ''
                                    });
                                }}>
                                    Entendido
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Collapse >




            <Snackbar
                open={notFound}
                autoHideDuration={3000}
                onClose={() => { setNotFound(false) }}
                message='Folio incorrecto, inténtalo de nuevo'
            />
        </>
    )
}

export default SalidaTicket;