//noinspection JSUnusedGlobalSymbols
export default (state = {
    username: '舒超',
}, action) => {
    switch (action.type) {
    case 'change':
        state.username = action.username;
        return Object.assign({}, state);
    default:
        return state;
    }
};