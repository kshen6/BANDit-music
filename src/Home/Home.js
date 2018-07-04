import React, { Component } from "react";
import "./Home.css";

import logo from "./../img/bandit-logo.png";

class Home extends Component {
  render () {
    return (
      <div className="Home">
        <div id="welcome" className="container-fluid">
          <div className="row">
            <div className="col">
              <img src={logo} alt="logo" />
            </div>
            <div className="col">
              <h1>Welcome to BANDit!</h1>
              <h3>A progressive social platform for student musicians</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;