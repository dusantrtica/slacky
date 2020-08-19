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
        nsSocket.on('joinRoom', (roomToJoin) => {
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            if(roomToLeave) {
                nsSocket.leave(roomToLeave);
                updateUsersInRoom(namespace, roomToLeave);
            }
            
            nsSocket.join(roomToJoin);            

            const allRooms = namespaces.flatMap(ns => ns.rooms);
            const nsRoom = allRooms.find(({roomTitle: rt}) => rt === roomToJoin);
            nsSocket.emit('historyCatchUp', nsRoom.history);

            updateUsersInRoom(namespace, roomToJoin);
        });

        nsSocket.on('newMessageToServer', (msg) => {
            const username = nsSocket.handshake.query.username;
            const fullMsg = {
                text: msg,
                time: Date.now(),
                username,
                avatar: 'https://via.placeholder.com/30'
            }
            
            const roomTitle = Object.keys(nsSocket.rooms)[1];     
            const allRooms = namespaces.flatMap(ns => ns.rooms);
            const nsRoom = allRooms.find(({roomTitle: rt}) => rt === roomTitle);
            nsRoom.addMessage(fullMsg);       
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);

        });
    })
})

function updateUsersInRoom (namespace, roomToJoin)  {
    io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length);
    })
}