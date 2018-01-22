//noinspection JSUnusedGlobalSymbols
export default (state = {
    metadata: [],
    username: '',
    password: '',
}, action) => {
    switch (action.type) {
    case 'user/login/auto-complete':
        delete action['type'];
        return Object.assign({}, state, action);
    case 'user/login/username':
        delete action['type'];
        return Object.assign({}, state, action);
    case 'user/login/password':
        delete action['type'];
        return Object.assign({}, state, action);
    default:
        return state;
    }
};