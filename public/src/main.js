/**
 * @typedef {{render:function}} ReactDOM
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Model from './model';
import Module from './module';

ReactDOM.render(
    <Provider store={Model}>
        <Module/>
    </Provider>,
    document.getElementById('root')
);