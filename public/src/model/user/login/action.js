//noinspection JSUnusedGlobalSymbols
export const usernameOnChange = (value, dispatch) => {
    dispatch('autoComplete', {
        username: value,
        metadata: !value || value.indexOf('@') >= 0 ? [] : /\d/g.test(value) ? [
            `${value}@qq.com`,
            `${value}@gmail.com`,
            `${value}@163.com`,
        ] : [
            `${value}@gmail.com`,
            `${value}@163.com`,
        ],
    });
};

//noinspection JSUnusedGlobalSymbols
export const usernameOnSelect = (value, option, dispatch) => {
    dispatch('username', {username: value});
};

//noinspection JSUnusedGlobalSymbols
export const passwordOnChange = (e, dispatch) => {
    dispatch('password', {password: e.target.value});
};

//noinspection JSUnusedGlobalSymbols
export const autoLoginOnChange = (e, dispatch) => {
    dispatch('autoLogin', {autoLogin: e.target.checked});
};

//noinspection JSUnusedGlobalSymbols
export const mobileOnChange = (e, dispatch) => {
    dispatch('mobile', {mobile: e.target.value});
};