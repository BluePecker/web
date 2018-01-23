import * as Redux from 'redux';

const reducers = Redux.combineReducers((() => {
    const container = {};
    const reducers = require.context('./', true, /\/reducer\.js$/).keys();
    reducers.forEach(reducer => {
        const item = reducer.replace(/\/reducer\.js$/, '');
        const namespace = item.substring(2);

        const init = require(`${reducer}`).state || {};
        const func = require(`${reducer}`).default || {};
        if (typeof func === 'function') {
            console.log(namespace, init, func);
            container[namespace] = func;
        } else {
            container[namespace] = (state = typeof init === 'function' ? init() : init, action) => {
                const method = !action.type ? '' : action.type.replace(`${namespace}/`, '');
                const payload = Object.assign({}, action);
                delete payload['type'];
                return Reflect.has(func, method) && typeof func[method] === 'function' ? func[method](state, payload) : state;
            };
        }
    });
    return container;
})());

export default Redux.createStore(reducers);