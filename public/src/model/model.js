import * as Redux from 'redux';

const reducers = Redux.combineReducers((() => {
    const container = {};

    const reducers = require.context('./', true, /\/$/).keys();
    reducers.forEach(model => {
        const namespace = model.replace(/(^\.\/|\/$)/g, '');
        /**
         * @typedef {{defaultState:object}} model
         */
        model = require(`${model}`).default;
        if (typeof model === 'function') {
            const reducer = new (model().Reducer);
            container[namespace] = (state = reducer.defaultState || {}, action) => {
                const {type, ...metadata} = action;
                const method = (type || '').replace(`${namespace}/`, '');
                return Reflect.has(reducer, method) ? reducer[method](state, metadata) : state;
            };
        }
    });
    return container;
})());

export default Redux.createStore(reducers);