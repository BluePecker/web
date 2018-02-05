/**
 * @typedef {{emit:function,on:function}} socket
 */
import store from '../../../../model';
import socket from '../../../../socket';

//noinspection JSUnusedGlobalSymbols
export default (state, dispatch) => {
    class Reducer {
        //noinspection JSUnusedGlobalSymbols
        defaultState = {
            data   : {common: {}, area: {}},
            input  : 0,
        };

        sync = (state, payload) => {
            return Object.assign({}, state, {data: payload});
        };

        //noinspection JSUnusedGlobalSymbols
        input = (state, payload) => {
            return Object.assign({}, state, payload);
        };
    }

    class Dispatch {
        //noinspection JSUnusedGlobalSymbols
        stopSync = () => clearInterval(this.interval);

        //noinspection JSUnusedGlobalSymbols
        beginSync = () => {
            socket.on('sync', data => dispatch('sync', data));
            const sync = () => socket.emit('sync', {communityId: 7});
            (this.interval = setInterval(sync, 150)) && sync();
        };

        //noinspection JSUnusedGlobalSymbols
        inputHandle = (value) => {
            dispatch('input', {input: value});
        };

        //noinspection JSUnusedGlobalSymbols
        submitHandle = (id) => {
            socket.emit('control', {
                id, value: store.getState()['admin/pump/scan/c1']['input']
            });
            dispatch('input', {input: 0});
        };

        //noinspection JSUnusedGlobalSymbols
        switchHandle = (id, value) => {
            socket.emit('control', {
                id, value: value ? 1 : 0
            });
        };
    }

    return {Reducer: Reducer, Dispatch: Dispatch};
};