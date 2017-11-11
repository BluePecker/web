import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';

// import {Link} from 'react-router-dom';
// import Router from './component/Router';

import Admin from './module/admin';
import Register from './module/register';
import Login from './module/login';

ReactDOM.render(
    <Router>
        <Switch>
            {/*<Switch>*/}
            {/*/!* 404 *!/*/}
            {/*<Route path='404' component={NotFoundPage} />*/}
            {/*/!* 其他重定向到 404 *!/*/}
            {/*<Redirect from='*' to='404'/>*/}
            <Route path="/user/login" component={Login}/>
            <Route path="/user/register" component={Register}/>
            <Route path="/" component={Admin}/>
            {/*</Switch>*/}
        </Switch>
    </Router>
    , document.getElementById('root')
);

// const routes = [{
//     component: Admin,
//     path     : '/tacos',
//     routes   : [{
//         path     : '/tacos/bus',
//         component: Register
//     }, {
//         path     : '/tacos/cart',
//         component: Login
//     }]
// }];
//
// ReactDOM.render(
//     <ul>
//         <li><Link to="/tacos">Tacos</Link></li>
//         <li><Link to="/sandwiches">Sandwiches</Link></li>
//         {/*<Router routes={routes}/>*/}
//     </ul>
//     , document.getElementById('root')
// );