//noinspection JSUnusedGlobalSymbols
export default (state = {
    flow1 : 501,
    flow2 : 40314,
    num1  : 40,
    num2  : 56,
    num3  : 2,
    num4  : 2232,
    status: true,
}, action) => {
    switch (action.type) {
    case 'admin_home_dashboard/state':
        delete action['type'];
        return Object.assign({}, state, action);
    default:
        return state;
    }
};