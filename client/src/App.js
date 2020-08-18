import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import Namespaces from './components/Namespaces';
import Rooms from './components/Rooms';
import ChatArea from './components/ChatArea';

function App() {
  const [socket, setSocket] = useState();
  const [nsSocket, setNsSocket] = useState();
  
  const [namespaces, setNamespaces] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState();
  const [rooms, setRooms] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [currentNumberOfUsers, setCurrentNumberOfUsers] = useState(0);
  const [messageToClients, setMessageToClients] = useState([]);

  useEffect(() => {
    let s = socketIOClient('http://localhost:9000');
    setSocket(s);
  }, []);

  useEffect(() => {
    if(socket) {
       socket.on('nsList', nsData => {
      setNamespaces(nsData);
      if(!selectedNamespace && nsData.length) {
        setSelectedNamespace(nsData[0]);
      }
    });
    }
  }, [socket]);

  useEffect(() => {
    if(selectedNamespace) {
      const { endpoint } = selectedNamespace;
      let s = socketIOClient('http://localhost:9000' + endpoint);
      setNsSocket(s);
    }
  }, [selectedNamespace])
  const handleClickNamespace = (namespace) => {
    
    setSelectedNamespace(namespace);
    
  }

  useEffect(() => {
    if(nsSocket) {
      nsSocket.on('nsRoomLoad', (nsRooms) => {
        setRooms(nsRooms);
      });
      nsSocket.on('messageToClients', (msg) => {
       
        setMessageToClients(currMessages => [...currMessages, msg]);
      })
    }
  }, [nsSocket]);

  const handleClickRoom = (room) => {
    setSelectedRoom(room);
  }

  useEffect(() => {
    if(selectedRoom) {
      const { roomTitle } = selectedRoom;
      nsSocket.emit('joinRoom', roomTitle, (newNumberOfMembers) => {
        setCurrentNumberOfUsers(newNumberOfMembers);
      });
    }
  }, [selectedRoom]);

  const handleClickSend = (text) => {
    nsSocket.emit('newMessageToServer', text);
  }

  console.log({messageToClients});
  
  return (
    <div className="App">
     
      <Namespaces namespaces={namespaces} onClickNamespace={handleClickNamespace} selectedNamespace={selectedNamespace}/>
      <Rooms rooms={rooms} onClickRoom={handleClickRoom}/>
      <ChatArea onClickSend={handleClickSend} messageToClients={messageToClients} />
    </div>
  );
}

export default App;
