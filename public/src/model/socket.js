import io from 'socket.io-client';

const socket = io('ws://47.52.136.193:8080');

socket.on('connect', () => {
    console.log('success connect server');
    setInterval(() => {
        socket.emit('sync', {communityId: 1});
    }, 150);
});

socket.on('sync', data => {
    console.log(JSON.stringify(data));
});
