//noinspection JSUnusedGlobalSymbols
export default (state = {
    metadata: []
}, action) => {
    switch (action.type) {
    case 'admin/expand':
        return Object.assign({}, state, {
            openKeys: action.openKeys
        });
    case 'admin/collapsed':
        return Object.assign({}, state, {
            collapsed: !state.collapsed
        });
    case 'admin/isMobile':
        return Object.assign({}, state, {
            isMobile: action.isMobile
        });
    default:
        return state;
    }
};