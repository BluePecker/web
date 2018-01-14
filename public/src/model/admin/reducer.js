//noinspection JSUnusedGlobalSymbols
export default (state = {
    menu     : {
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
                },
                area     : {
                    name    : '地区数据',
                    icon    : 'global',
                    children: {
                        beijing: {
                            name: '北京',
                            icon: 'cloud',
                        },
                        chengdu: {
                            name: '成都',
                            icon: 'cloud',
                        },
                    }
                }
            },
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
    openKeys : [],
    collapsed: false,
}, action) => {
    switch (action.type) {
    case 'admin/onChange':
        return Object.assign({}, state, {
            openKeys: action.keys
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