//noinspection JSUnusedGlobalSymbols
export default (state = {
    menu    : {
        home  : {
            name    : '管理后台',
            icon    : 'home',
            children: {
                dashboard: {
                    name: '后台首页',
                    icon: 'dashboard',
                }
            }
        },
        secure: {
            name    : '安全中心',
            icon    : 'safety',
            children: {
                account  : {
                    name: '账号管理',
                    icon: 'account',
                },
                authorize: {
                    name: '权限管理',
                    icon: 'authorize',
                },
            }
        },
    },
    username: '舒超',
}, action) => {
    switch (action.type) {
    case 'admin/change':
        state.username = action.username;
        return Object.assign({}, state);
    default:
        return state;
    }
};