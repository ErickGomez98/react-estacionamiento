import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import AdminPage from './AdminPage';
import SalidaPage from './SalidaPage';
import EntradaPage from './EntradaPage';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
    }),
);

const AppRouter = () => {
    const [selected, setSelected] = useState<'/admin' | '/entrada' | '/salida' | string>('/admin');
    const classes = useStyles();

    useEffect(() => {
        setSelected(window.location.pathname);
    }, []);


    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Estacionamiento
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <NavLink to='/admin' style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem button selected={selected === '/admin' ? true : false} onClick={() => { setSelected('/admin') }}>
                                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                                <ListItemText primary='Admin' />
                            </ListItem>
                        </NavLink>
                        <NavLink to='/entrada' style={{ color: 'inherit', textDecoration: 'none' }} >
                            <ListItem button selected={selected === '/entrada' ? true : false} onClick={() => { setSelected('/entrada') }}>
                                <ListItemIcon><LocalParkingIcon /></ListItemIcon>
                                <ListItemText primary='Entrada' />
                            </ListItem>
                        </NavLink>
                        <NavLink to='/salida' style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem button selected={selected === '/salida' ? true : false} onClick={() => { setSelected('/salida') }} >
                                <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                                <ListItemText primary='Salida' />
                            </ListItem>
                        </NavLink>



                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path='/entrada' exact><EntradaPage /></Route>
                        <Route path='/salida' exact><SalidaPage /></Route>
                        <Route path='/admin' exact><AdminPage /></Route>
                        <Route path='*'> <Redirect to='/admin' /> </Route>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;