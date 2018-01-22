import {enquireScreen as EnquireScreen} from 'enquire-js';

let isMobile;
EnquireScreen((bool) => {
    isMobile = bool;
});

export const state = {
    menu     : {
        // home    : {
        //     name    : '管理后台',
        //     icon    : 'home',
        //     children: {
        //         dashboard: {
        //             name: '控制台',
        //             icon: 'dashboard',
        //         },
        //     }
        // },
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
    // todo 修复bug
    isMobile : (() => {
        return true;
    })(),
};

//noinspection JSUnusedGlobalSymbols
export default {
    collapsed: (state) => {
        return Object.assign({}, state, {
            collapsed: !state.collapsed
        });
    },
    expand   : (state, payload) => {
        return Object.assign({}, state, {
            ...payload
        });
    },
    isMobile : (state, payload) => {
        return Object.assign({}, state, {
            isMobile: payload.isMobile === undefined ? false : payload.isMobile
        });
    }
};