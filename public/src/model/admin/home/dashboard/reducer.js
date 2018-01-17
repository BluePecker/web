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
    case 'admin_home_dashboard/num1':
        return Object.assign({}, state, {num1: action.num1});
    case 'admin_home_dashboard/num2':
        return Object.assign({}, state, {num2: action.num2});
    case 'admin_home_dashboard/num3':
        return Object.assign({}, state, {num3: action.num3});
    case 'admin_home_dashboard/num4':
        return Object.assign({}, state, {num4: action.num4});
    case 'admin_home_dashboard/status':
        return Object.assign({}, state, {status: action.status});
    case 'admin_home_dashboard/flow1':
        return Object.assign({}, state, {flow1: action.flow1});
    case 'admin_home_dashboard/flow2':
        return Object.assign({}, state, {flow2: action.flow2});
    case 'admin_home_dashboard/state':
        delete action['type'];
        return Object.assign({}, state, action);
    default:
        return state;
    }
};