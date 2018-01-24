export const state = {
    metadata : [],
    username : '',
    password : '',
    autoLogin: true,
};

//noinspection JSUnusedGlobalSymbols
export default {
    username    : (state, payload) => {
        return Object.assign({}, state, payload);
    },
    password    : (state, payload) => {
        return Object.assign({}, state, payload);
    },
    autoComplete: (state, payload) => {
        return Object.assign({}, state, payload);
    },
    autoLogin   : (state, payload) => {
        return Object.assign({}, state, payload);
    },
};