import React, { Component } from 'react';
import {
  Route,
  HashRouter,
} from "react-router-dom";

import Home from './Home/Home.js';
import Marketplace from './Marketplace/Marketplace.js';
import Activity from './Activity/Activity.js';
import Profile from './Profile/Profile.js';
import "./App/App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/marketplace" component={Marketplace}/>
          <Route path="/activity" component={Activity}/>
          <Route path="/profile" component={Profile}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;