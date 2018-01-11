import * as Redux from 'redux';

const reducers = Redux.combineReducers((() => {
    const reducerMap = {};
    const reducers = require.context('./', true, /\/reducer\.js$/).keys();
    reducers.forEach(reducer => {
        const item = reducer.replace(/\/reducer\.js$/, '');
        const namespace = item.substring(2).replace(/\//g, '_');
        reducerMap[namespace] = require(`${reducer}`).default;
    });
    return reducerMap;
})());

export default Redux.createStore(reducers);