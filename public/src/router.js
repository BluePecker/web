import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect, HashRouter as Router} from 'react-router-dom';

import Admin from './module/admin';
import Register from './module/register';
import Login from './module/login';
import NotFound from './module/odd/404';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" extra component={Admin}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path='404' component={NotFound}/>
            <Redirect from='*' to='404'/>
        </Switch>
    </Router>
    , document.getElementById('root')
);