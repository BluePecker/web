import Io from 'socket.io-client';

const socket = Io('ws://47.52.136.193:8080');

socket.on('connect', () => {
    console.log('success connect server');
});

export default socket;
