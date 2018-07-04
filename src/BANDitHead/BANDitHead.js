import React, { Component } from 'react';
import {
  NavLink,
  HashRouter,
} from "react-router-dom";

import './BANDitHead.css';
// import logo from './../img/bandit-logo.png';

class BANDitHead extends Component {
  render () {
    return (
      <HashRouter>
        <nav className="container BANDitHead">
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/marketplace" className="btn">Find Musicians</NavLink>
          <NavLink to="/activity" className="btn">Activity</NavLink>
          <NavLink to="/profile" className="btn">Profile</NavLink>
        </nav>
      </HashRouter>
    );
  }
}

export default BANDitHead;