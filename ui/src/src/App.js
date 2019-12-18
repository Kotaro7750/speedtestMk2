import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Component } from 'react';

import './App.css';
import Wifi from './Wifi.js';
import NavBar from './AppBar.js'

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
        <body>
          <NavBar />
          <Wifi />
        </body>
      </div>
    );
  }
}

export default App;
