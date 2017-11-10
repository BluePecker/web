import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Admin from './module/admin';
import Register from './module/register';
import Login from './module/login';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" component={Admin}/>
            {/*/!* 404 *!/*/}
            {/*<Route path='404' component={NotFoundPage} />*/}
            {/*/!* 其他重定向到 404 *!/*/}
            {/*<Redirect from='*' to='404'/>*/}
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);