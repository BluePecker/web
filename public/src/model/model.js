import * as Redux from 'redux';

class Model {
    reducers = {};

    constructor() {
        const dirs = require.context('./', true, /\/$/).keys();
        dirs.forEach(item => {
            item = item.substring(0, item.length - 1);
            const namespace = item.substring(2).replace(/\//g, '_');
            this.reducers[namespace] = require(`${item}`).default;
        });
    }

    getReducers() {
        return this.reducers;
    }
}

const reducers = Redux.combineReducers((new Model()).getReducers());

export default Redux.createStore(reducers);