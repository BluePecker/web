//noinspection JSUnusedGlobalSymbols

export default (state, dispatch) => {
    class Reducer {
        //noinspection JSUnusedGlobalSymbols
        defaultState = {
            menu     : {
                home    : {
                    name    : '管理后台',
                    icon    : 'home',
                    children: {
                        scan: {
                            name: '无锡总览',
                            icon: 'global',
                        },
                    }
                },
                // metadata: {
                //     name    : '数据中心',
                //     icon    : 'pie-chart',
                //     children: {
                //         dashboard: {
                //             name: '数据总览',
                //             icon: 'dashboard',
                //         },
                //         area     : {
                //             name    : '地区数据',
                //             icon    : 'global',
                //             children: {
                //                 beijing: {
                //                     name: '北京',
                //                     icon: 'cloud',
                //                 },
                //                 chengdu: {
                //                     name: '成都',
                //                     icon: 'cloud',
                //                 },
                //             }
                //         }
                //     },
                // },
                pump  : {
                    name    : '泵房管理',
                    icon    : 'appstore-o',
                    children: {
                        scan  : {
                            name: '状态总览',
                            icon: 'scan'
                        },
                        safety: {
                            name: '安防系统',
                            icon: 'safety',
                        }
                    }
                },
                secure: {
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
                        profile  : {
                            name: '个人中心',
                            icon: 'idcard',
                        }
                    }
                }
            },
            openKeys : [],
            collapsed: false,
            isMobile : false,
        };

        //noinspection JSUnusedGlobalSymbols
        collapsed = state => {
            return Object.assign({}, state, {
                collapsed: !state.collapsed
            });
        };

        expand = (state, payload) => {
            return Object.assign({}, state, {
                ...payload
            });
        };

        isMobile = (state, payload) => {
            return Object.assign({}, state, {
                ...payload
            });
        };
    }

    class Dispatch {
        //noinspection JSUnusedGlobalSymbols
        handleExpand = keys => {
            dispatch('expand', {openKeys: keys});
        };

        //noinspection JSUnusedGlobalSymbols
        handleMobile = isMobile => {
            dispatch('isMobile', {isMobile});
        };

        //noinspection JSUnusedGlobalSymbols
        handleCollapsed = () => {
            dispatch('collapsed');
        };
    }

    return {Reducer: Reducer, Dispatch: Dispatch};
};