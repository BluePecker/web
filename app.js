const socket = require('socket.io-client')('ws://47.52.136.193:4044');

socket.on('connect', () => {
    console.log('success');
});

socket.emit('update', {tet: 'shuc'});

socket.on('notice', data => {
    console.log('notice', data);
});