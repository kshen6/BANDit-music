import React, { Component } from 'react';
import {
  Route,
  HashRouter,
} from "react-router-dom";

import './App.css';

import Home from './Home/Home.js';
import About from './About/About.js';
import Account from './Account/Account.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/About" component={About}/>
          <Route path="/Account" component={Account}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;