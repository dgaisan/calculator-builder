import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Sidebar from './sidebar';
import Stage from './stage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="Calculator Builder." />
        <div className="Main">
          <Sidebar />
          <Stage />
        </div>
      </div>
    );
  }
}

export default App;
