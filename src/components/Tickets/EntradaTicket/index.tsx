import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import parkingLotImg from '../../../assets/img/parking_lot.jpg';
import Collapse from '@material-ui/core/Collapse';
import { Grid } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import { IAllState } from '../../../Util/Types/Types-Interfaces';
import { Dispatch } from 'redux';
import { ITicketsAction } from '../../../Redux/Reducers/Tickets';

interface Props {

};

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 400,
    },
});

const EntradaTicket: React.FC<Props> = () => {
    const classes = useStyles();
    const [generatedTicket, setGeneratedTicket] = useState<boolean>(false);
    const IdTicket = useSelector<IAllState, IAllState['Tickets']['folioTicket']>((state) => state.Tickets.folioTicket);
    const dispatchTickets = useDispatch<Dispatch<ITicketsAction>>();

    const [tmpTimeout, setTmpTimeout] = useState<any>();
    useEffect(() => {
        if (generatedTicket) {
            if (tmpTimeout) {
                clearTimeout(tmpTimeout);
            }

            const tmp = setTimeout(() => {
                setGeneratedTicket(false);
            }, 10000);
            setTmpTimeout(tmp);
        }
    }, [generatedTicket]);


    const generarEntrada = () => {
        const newFolio = IdTicket + 1;
        dispatchTickets({
            type: 'EntradaTicket', payload: {
                folioTicket: newFolio, newItem: {
                    id: newFolio,
                    fechaEntrada: new Date(),
                    fechaSalida: new Date(),
                    totalPagar: 0,
                }
            }
        });
        setGeneratedTicket(true);
    }


    return (
        <>
            <Collapse in={!generatedTicket}>
                <Grid container spacing={3} justify='center' alignItems='center'>
                    <Grid item lg={8} sm={12}>
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={parkingLotImg}
                                    title="Estacionamiento"
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Estacionamiento
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    La tarifa del estacionamiento es de <Typography variant="body1" style={{ fontWeight: 600 }} color="textPrimary" component="strong" >$6.00 pesos</Typography> por fracciones de <Typography variant="body1" style={{ fontWeight: 600 }} color="textPrimary" component="strong" >15 minutos</Typography>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="primary" variant="contained" fullWidth={true} onClick={() => { generarEntrada() }}>
                                    Generar Ticket
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Collapse>

            <Collapse in={generatedTicket}>
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
                                                FOLIO {IdTicket}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Ticket Generado
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Se ha generado correctamente el ticket, recuerda guardarlo en un lugar seguro.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="large" color="secondary" variant="contained" onClick={() => { setGeneratedTicket(false) }}>
                                    Entendido
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Collapse>
        </>
    )
}

export default EntradaTicket;