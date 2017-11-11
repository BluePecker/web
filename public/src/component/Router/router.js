import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (<route.component {...props} routes={route.routes}/>)}/>
);

export default ({routes}) => (
    <BrowserRouter>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
            ))}
        </Switch>
    </BrowserRouter>
);