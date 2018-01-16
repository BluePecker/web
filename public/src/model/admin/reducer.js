import {enquireScreen as EnquireScreen} from 'enquire-js';

let isMobile;
EnquireScreen((bool) => {
    isMobile = bool;
});

//noinspection JSUnusedGlobalSymbols
export default (state = {
    menu     : {
        home    : {
            name    : '管理后台',
            icon    : 'home',
            children: {
                dashboard: {
                    name: '控制台',
                    icon: 'dashboard',
                },
            }
        },
    },
    openKeys : [],
    collapsed: false,
    isMobile : isMobile,
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