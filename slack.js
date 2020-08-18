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
        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
            nsSocket.join(roomToJoin);
            io.of(namespace.endpoint).in(roomToJoin).clients((err, clients) => {
                console.log({clients});
                numberOfUsersCallback(clients.length);
            });            
        });

        nsSocket.on('newMessageToServer', (msg) => {
            const fullMsg = {
                text: msg,
                time: Date.now(),
                username: 'Dusan',
                avatar: 'https://via.placeholder.com/30'
            }
            
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            console.log(roomTitle);
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);
        });
    })
})
