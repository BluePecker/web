//noinspection JSUnusedGlobalSymbols
export default (state = {
    menu          : {
        home    : {
            name: '管理后台',
            icon: 'home'
        },
        metadata: {
            name    : '数据中心',
            icon    : 'pie-chart',
            children: {
                dashboard: {
                    name: '数据总览',
                    icon: 'dashboard',
                }
            }
        },
        secure  : {
            name    : '安全中心',
            icon    : 'safety',
            children: {
                account  : {
                    name: '账号管理',
                    icon: 'contacts',
                },
                authorize: {
                    name: '权限管理',
                    icon: 'warning',
                },
            }
        }
    },
    menu_open_keys: [],
    collapsed     : false,
    username      : '舒超',
}, action) => {
    switch (action.type) {
    case 'admin/change':
        state.username = action.username;
        return Object.assign({}, state);
    case 'admin/menu_change':
        state.menu_open_keys = action.keys;
        return Object.assign({}, state);
    case 'admin/collapsed':
        state.collapsed = !state.collapsed;
        return Object.assign({}, state);
    default:
        return state;
    }
};