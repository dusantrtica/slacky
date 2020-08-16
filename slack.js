const express = require('express');
const socketio = require('socket.io')
const app = express();
let namespace = require('./data/namespaces');

const expressServer = app.listen(9000);
const io = socketio(expressServer);
