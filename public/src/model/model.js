import * as Redux from 'redux';

const reducers = Redux.combineReducers({
    test  : (state = {}, action) => {
        console.log('test', state, action);
        state.username = action.username;
        return Object.assign({}, state);
    },
    test1 : (state = {}, action) => {
        console.log("test1", state, action);
        state.username = action.username;
        return Object.assign({}, state);
    },
    change: (state = {}, action) => {
        console.log("test1", state, action);
        state.username = action.username;
        return Object.assign({}, state);
    },
});

export default Redux.createStore(reducers);