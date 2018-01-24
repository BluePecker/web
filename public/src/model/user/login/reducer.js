export const state = {
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
    }
};

//noinspection JSUnusedGlobalSymbols
export default {
    username    : (state, payload) => {
        const {username} = payload;
        return Object.assign({}, state, {
            username: {
                status : '',
                value  : username,
                message: ''
            },
        });
    },
    password    : (state, payload) => {
        return Object.assign({}, state, {
            password: {
                value: payload.password,
            },
        });
    },
    autoComplete: (state, payload) => {
        const {username} = payload;
        return Object.assign({}, state, {
            username: {
                status : '',
                value  : username,
                message: ''
            },
            metadata: payload.metadata,
        });
    },
    autoLogin   : (state, payload) => {
        return Object.assign({}, state, payload);
    },
    mobile      : (state, payload) => {
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
    },
    captcha     : (state, payload) => {
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
    },
};