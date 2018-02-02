/**
 * @typedef {{emit:function,on:function}} socket
 */
import socket from '../../../socket';

//noinspection JSUnusedGlobalSymbols
export default (state, dispatch) => {
    class Reducer {
        //noinspection JSUnusedGlobalSymbols
        defaultState = {
            data: {common: {}, area: {}}
        };

        sync = (state, payload) => {
            return Object.assign({}, state, {data: payload});
        };
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
    }

    return {Reducer: Reducer, Dispatch: Dispatch};
};