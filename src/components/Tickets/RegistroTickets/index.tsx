import React from 'react';
import { IAllState } from '../../../Util/Types/Types-Interfaces';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

interface Props {
    registros: IAllState['Tickets']['listaTickets']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
    }),
);

const RegistroTickets: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Folio</TableCell>
                    <TableCell align="right">Hora llegada</TableCell>
                    <TableCell align="right">Hora Salida</TableCell>
                    <TableCell align="right">Total Pagado</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.registros.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">{row.fechaEntrada.toLocaleString('es-MX')}</TableCell>
                        <TableCell align="right">{row.fechaEntrada.getTime() === row.fechaSalida.getTime() ? '~' : row.fechaSalida.toLocaleString('es-MX')}</TableCell>
                        <TableCell align="right">{row.totalPagar === 0 ? '~' : '$ ' + row.totalPagar}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};

export default RegistroTickets;