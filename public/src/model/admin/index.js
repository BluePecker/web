//noinspection JSUnusedGlobalSymbols
export default (state = {
    username: 'xxxx',
}, action) => {
    switch (action.type) {
    case 'change':
        state.username = action.username;
        return Object.assign({}, state);
    default:
        return state;
    }
};