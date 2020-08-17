import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import Namespaces from './components/Namespaces';
import Rooms from './components/Rooms';

function App() {
  const [socket, setSocket] = useState();
  const [nsSocket, setNsSocket] = useState();
  
  const [namespaces, setNamespaces] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState();
  const [rooms, setRooms] = useState();

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
      })
    }
  }, [nsSocket]);

  
  return (
    <div className="App">
     
      <Namespaces namespaces={namespaces} onClickNamespace={handleClickNamespace} selectedNamespace={selectedNamespace}/>
      <Rooms rooms={rooms} />
    </div>
  );
}

export default App;
