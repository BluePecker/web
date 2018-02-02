/**
 * @typedef {{emit:function,on:function}} socket
 */
import store from '../../../model';
import socket from '../../../socket';

//noinspection JSUnusedGlobalSymbols
export default (state, dispatch) => {
    class Reducer {
        //noinspection JSUnusedGlobalSymbols
        defaultState = {
            data   : {common: {}, area: {}},
            input  : '',
            popover: false,
        };

        sync = (state, payload) => {
            return Object.assign({}, state, {data: payload});
        };

        //noinspection JSUnusedGlobalSymbols
        input = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        popover = state => {
            return Object.assign({}, state, {popover: !state.popover});
        }
    }

    class Dispatch {
        //noinspection JSUnusedGlobalSymbols
        stopSync = () => clearInterval(this.interval);

        //noinspection JSUnusedGlobalSymbols
        beginSync = () => {
            socket.on('sync', data => dispatch('sync', data));
            const sync = () => socket.emit('sync', {communityId: 1});
            (this.interval = setInterval(sync, 150)) && sync();
        };

        //noinspection JSUnusedGlobalSymbols
        inputHandle = (value) => {
            dispatch('input', {input: value});
        };

        //noinspection JSUnusedGlobalSymbols
        popoverHandle = () => {
            dispatch('popover');
        };

        //noinspection JSUnusedGlobalSymbols
        submitHandle = (id) => {
            socket.emit('control', {
                id, value: store.getState()['admin/pump/scan']['input']
            });
            dispatch('popover');
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