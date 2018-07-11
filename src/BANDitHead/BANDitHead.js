import React, { Component } from 'react';
import { NavLink, HashRouter } from 'react-router-dom';

import './BANDitHead.css';
import logo from './../img/bandit-logo.png';

class BANDitHead extends Component {
  render() {
    return (
      <HashRouter>
        <nav className="BANDitHead">
          <NavLink exact to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <NavLink to="/marketplace" className="link">
            Find Musicians
          </NavLink>
          <NavLink to="/activity" className="link">
            Activity
          </NavLink>
          <NavLink to="/profile" className="link">
            Profile
          </NavLink>
        </nav>
      </HashRouter>
    );
  }
}

export default BANDitHead;
