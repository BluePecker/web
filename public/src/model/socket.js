import Io from 'socket.io-client';

import Helper from '../../../utils/helper';

// const socket = Io('ws://47.52.136.193:8080');
// const socket = Io(Helper.loadConfig()['socket']);

class Socket {
    constructor() {
        return Io(Helper.loadConfig()['socket']);
    }
}

export default new Socket();
