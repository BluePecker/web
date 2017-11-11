import 'es5-shim';
import 'console-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect, HashRouter as Router} from 'react-router-dom';

import Admin from './module/admin';
import Register from './module/register';
import Login from './module/login';
import Forbidden from './module/odd/403';
import NotFound from './module/odd/404';
import ServerError from './module/odd/500';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/admin" extra render={Admin}/>
            <Route path="/login" render={Login}/>
            <Route path="/register" render={Register}/>
            <Route path="/odd/403" render={Forbidden}/>
            <Route path="/odd/404" render={NotFound}/>
            <Route path="/odd/500" render={ServerError}/>
            <Redirect from="*" to="/odd/404"/>
        </Switch>
    </Router>
    , document.getElementById('root')
);