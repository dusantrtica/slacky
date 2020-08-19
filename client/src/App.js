import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import Namespaces from './components/Namespaces';
import Rooms from './components/Rooms';
import ChatArea from './components/ChatArea';

const username = prompt('What is your name?');

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
    let s = socketIOClient('http://localhost:9000', {
      query: {
        username
      }
    });
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
      if(nsSocket) {
        nsSocket.close();
      }
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
      nsSocket.on('historyCatchUp', history => {
        setMessageToClients(history);
      });

      nsSocket.on('updateMembers', (numOfMembers) => {
        setCurrentNumberOfUsers(numOfMembers);
      })
    }
  }, [selectedRoom]);

  const handleClickSend = (text) => {
    nsSocket.emit('newMessageToServer', text);
  }
  
  return (
    <div className="App">
     
      <Namespaces namespaces={namespaces} onClickNamespace={handleClickNamespace} selectedNamespace={selectedNamespace}/>
      <Rooms rooms={rooms} onClickRoom={handleClickRoom}/>
      <ChatArea  currentNumberOfUsers={currentNumberOfUsers} onClickSend={handleClickSend} messageToClients={messageToClients} />
    </div>
  );
}

export default App;
