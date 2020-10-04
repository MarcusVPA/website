import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import FormUser from './pages/FormUser';
import Register from './pages/Register';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/registration" component={Register} />
            <Route exact={true} path="/view-user/:id" component={FormUser} />
            <Route exact={true} path="/subir" component={Upload} />
            <Route exact={true} path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;