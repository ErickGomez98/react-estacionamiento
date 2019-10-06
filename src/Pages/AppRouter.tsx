import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import AdminPage from './AdminPage';
import SalidaPage from './SalidaPage';
import EntradaPage from './EntradaPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <main className='Main'>
                <Switch>
                    <Route path='/entrada' exact><EntradaPage /></Route>
                    <Route path='/salida' exact><SalidaPage /></Route>
                    <Route path='/admin' exact><AdminPage /></Route>
                    <Route path='*'> <Redirect to='/admin' /> </Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter;