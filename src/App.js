import React, { Component } from 'react';
import logo from './img/bandit-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <nav className="navbar">
          <a className="navbar-brand" href="../public/index.html">
            <img src={logo} height="30" className="App-logo" alt="logo" />
            Stanford BandIt
          </a>
          <div className="navbar-text navbar-right">
            <a href="../public/index.html" className="btn" role="button">Sign Up</a>
            <a href="../public/index.html" className="btn" role="button">Sign In</a>
            <a href="../public/index.html" className="btn" role="button">Contact</a>
          </div>
        </nav>

        <div className="container" id="welcome">
          <h1>Welcome to Stanford BANDit!</h1>
          <h3>An initiative to make awesome-sounding music.</h3>
          <h3>A Kendrick and Tyler Production</h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm" id="site-descrip">
              <h2>I'm just jammin'</h2>
            </div>
            <div className="col-sm" id="site-descrip">
              <h2>I wanna perform</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
