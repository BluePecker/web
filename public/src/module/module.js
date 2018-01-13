import 'es5-shim';
import 'console-polyfill';

/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';

import Admin from './admin';

import './module.less';

class Module extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Admin}/>
                </Switch>
            </Router>
        );
    }
}

export default Module;