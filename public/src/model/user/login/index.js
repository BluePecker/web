// import fetch from '../../fetch';
//noinspection JSUnusedGlobalSymbols
export default (state, dispatch) => {
    class Reducer {
        defaultState = {
            metadata : [],
            username : {
                status : '',
                value  : '',
                message: '',
            },
            password : {
                status : '',
                value  : '',
                message: '',
            },
            autoLogin: true,
            mobile   : {
                status : '',
                value  : '',
                message: '',
            },
            captcha  : {
                status : '',
                value  : '',
                message: '',
            },
            // 获取验证码倒计时
            count    : 0,
            loginType: 'account',
            loading  : false,
        };

        //noinspection JSUnusedGlobalSymbols
        username = (state, payload) => {
            const {username} = payload;
            return Object.assign({}, state, {
                username: {
                    status : '',
                    value  : username,
                    message: ''
                },
            });
        };

        //noinspection JSUnusedGlobalSymbols
        password = (state, payload) => {
            return Object.assign({}, state, {
                password: {
                    value: payload.password,
                },
            });
        };

        //noinspection JSUnusedGlobalSymbols
        autoComplete = (state, payload) => {
            const {username} = payload;
            return Object.assign({}, state, {
                username: {
                    status : '',
                    value  : username,
                    message: ''
                },
                metadata: payload.metadata,
            });
        };

        //noinspection JSUnusedGlobalSymbols
        autoLogin = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        mobile = (state, payload) => {
            const {mobile} = payload;
            if (mobile === '') {
                payload['mobile'] = {
                    status : '',
                    value  : payload.mobile,
                    message: '',
                };
            } else {
                let reg, match = mobile;
                switch (mobile.length) {
                case 1:
                    reg = /^(1)$/;
                    break;
                case 2:
                    reg = /^(13|14|15|17|18)$/;
                    break;
                case 3:
                    reg = /^(13[0-9]|14[57]|15[012356789]|17[678]|18[0-9])$/;
                    break;
                default:
                    match = match.substr(3, 8);
                    reg = /^[0-9]+$/;
                }

                if (mobile.length === 11 && reg.test(match)) {
                    payload['mobile'] = {
                        status : 'success',
                        value  : payload.mobile,
                        message: '',
                    };
                } else {
                    payload['mobile'] = reg.test(match) ? {
                        status : '',
                        value  : payload.mobile,
                        message: '',
                    } : {
                        status : 'error',
                        value  : payload.mobile,
                        message: '手机号格式错误',
                    };
                }
            }
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        captcha = (state, payload) => {
            const {captcha} = payload;
            if (captcha.length === 6) {
                payload['captcha'] = /^\d{6}$/.test(captcha) ? {
                    status : 'success',
                    value  : captcha,
                    message: '',
                } : {
                    status : 'error',
                    value  : captcha,
                    message: '六位纯数字验证码',
                };
            } else {
                payload['captcha'] = captcha.length && !/^\d+$/.test(captcha) ? {
                    status : 'error',
                    value  : captcha,
                    message: '六位纯数字验证码',
                } : {
                    status : '',
                    value  : captcha,
                    message: '',
                };
            }
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        decrease = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        tableSwitch = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        loading = (state, payload) => {
            return Object.assign({}, state, payload);
        };
    }

    class Dispatch {
        //noinspection JSUnusedGlobalSymbols
        tableOnChange = (key) => {
            dispatch('tableSwitch', {loginType: key});
        };

        //noinspection JSUnusedGlobalSymbols
        usernameOnChange = (value) => {
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
        usernameOnSelect = (value) => {
            dispatch('username', {username: value});
        };

        //noinspection JSUnusedGlobalSymbols
        passwordOnChange = (e) => {
            dispatch('password', {password: e.target.value});
        };

        //noinspection JSUnusedGlobalSymbols
        mobileOnChange = (e) => {
            dispatch('mobile', {mobile: e.target.value});
        };

        //noinspection JSUnusedGlobalSymbols
        autoLoginOnChange = (e) => {
            dispatch('autoLogin', {autoLogin: e.target.checked});
        };

        //noinspection JSUnusedGlobalSymbols
        onGetCaptcha = () => {
            let count = 60;
            dispatch('decrease', {count});
            this.interval = setInterval(() => {
                if (--count === 0) {
                    clearInterval(this.interval);
                    dispatch('decrease', {count: 0});
                } else {
                    dispatch('decrease', {count});
                }
            }, 1000);
        };

        //noinspection JSUnusedGlobalSymbols
        login = () => {
            // fetch('logic', Object.assign(state, {
            //     resource: 'user/login'
            // })).then(res => console.log(res)).catch(err => console.log(err));
            dispatch('loading', {loading: true});
        };
    }

    return {Reducer: Reducer, Dispatch: Dispatch};
};