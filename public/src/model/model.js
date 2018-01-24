import * as Redux from 'redux';

const reducers = Redux.combineReducers((() => {
    const container = {};

    const reducers = require.context('./', true, /\/$/).keys();
    reducers.forEach(model => {
        const namespace = model.replace(/(^\.\/|\/$)/g, '');
        model = require(`${model}`).default;

        if (typeof model === 'function') {
            const reducer = new (model().Reducer);
            container[namespace] = (state, action) => {
                const {type} = action;
                const method = (type || '').replace(`${namespace}/`, '');

                return Reflect.has(reducer, method) ? Reflect.apply() : state;
            };


            // container[namespace] = (state, action) => {
            // const method = !action.type ? '' : action.type.replace(`${namespace}/`, '');
            // reducer.ownKeys(reducer).indexOf(method) > -1 && Reflect.apply(reducer[method], reducer, [state, action]);
            // };
        }
    });
    return container;
})());

export default Redux.createStore(reducers);