import Home from './home';
import Auth from './auth';

export default [
    {
        name     : '后台首页',
        path     : '/',
        icon     : 'home',
        component: Home
    },
    {
        name     : '权限管理',
        path     : 'safety',
        icon     : 'safety',
        component: Auth,
        children : [
            {
                name     : '账号管理',
                path     : 'account',
                component: Auth,
            },
            {
                name     : '权限分配',
                path     : 'auth',
                component: Auth,
            }
        ]
    }
];