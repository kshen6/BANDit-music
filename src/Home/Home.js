import React, { Component } from "react";
import {
    NavLink,
    HashRouter
} from "react-router-dom";

import logo from './../img/bandit-logo.png';
import "./Home.css";

class Home extends Component {
  render () {
    return (
      <HashRouter>
          <div className="Home">
            <div id="welcome" className="container-fluid">
              <NavLink exact to="/">
                  <img src={logo} className="App-logo" alt="logo" />
              </NavLink>
              <h1>Welcome to BANDit!</h1>
              <h3>An initiative to get students making awesome-sounding music.</h3>
              <h3>A Kendrick Shen Production</h3>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <NavLink to="/marketplace">
                    <h2>marketplace</h2>
                  </NavLink>
                </div>
                <div className="col">
                  <NavLink exact to="/activity">
                    <h2>See user activity</h2>
                  </NavLink>
                </div>
                <div className="col">
                  <NavLink to="/profile">
                    <h2>My profile</h2>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
      </HashRouter>
    );
  }
}

export default Home;