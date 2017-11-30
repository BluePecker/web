export default [
    {
        name     : '后台首页',
        path     : '/',
        icon     : 'home',
        component: ''
    },
    {
        name    : '权限管理',
        path    : 'auth',
        icon    : 'safety',
        children: [
            {
                name     : '账号管理',
                path     : 'action1',
                component: '',
            },
            {
                name     : '权限分配',
                path     : 'action2',
                component: '',
            }
        ]
    }
];