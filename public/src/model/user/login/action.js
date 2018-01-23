//noinspection JSUnusedGlobalSymbols
export const usernameOnChange = (value, dispatch) => {
    dispatch('autoComplete', {
        username: value,
        metadata: !value || value.indexOf('@') >= 0 ? [] : [
            `${value}@qq.com`,
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