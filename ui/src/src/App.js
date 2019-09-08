import React from 'react';
import { Component } from 'react';
import './App.css';
import Wifi from './Wifi.js';

class App extends Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }
  render(props, state) {
    return (
      <div className="App">
        <header className="App-header">
          <title>東京大学教養学部学生自治会　UTokyo WiFiスピードテスト</title>
        </header>
        <Wifi />
      </div>
    );
  }
}

export default App;
