import React from 'react';
import logo from './logo.svg';
import './App.css';
import Namespaces from './components/Namespaces';
import Rooms from './components/Rooms';

function App() {
  return (
    <div className="App">
     
      <Namespaces />
      <Rooms />
    </div>
  );
}

export default App;
