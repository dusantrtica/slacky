const express = require('express');
const socketio = require('socket.io')
const app = express();

const namespaces = require('./data/namespaces');

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) =>{
    let nsData = namespaces.map(({image: img, endpoint}) => {
        return {
            img,
            endpoint
        }
    });

    console.log(nsData);
    socket.emit('nsList', nsData);
});

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
        nsSocket.emit('nsRoomLoad', namespace.rooms);
    })
})
