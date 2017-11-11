import 'es5-shim';
import 'console-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';

import Admin from './module/admin';
import Register from './module/register';
import Login from './module/login';
import Odd from './component/Odd';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/500" render={
                () => {
                    return (
                        <Odd type="500" actions/>
                    );
                }
            }
            />
            <Route path="/" component={Admin}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);