import React, { Component } from 'react';
import { NavLink, HashRouter } from 'react-router-dom';

import './BANDitHead.css';
import logo from '../../assets/img/bandit-logo.png';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
};

class ConnectedBANDitHead extends Component {
  render() {
    return (
      <HashRouter>
        <nav className="BANDitHead">
          <NavLink exact to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <NavLink to="/marketplace" className="link">
            <span>Find Musicians</span>
            <i className="fa fa-users" aria-hidden="true" />
          </NavLink>
          <NavLink to="/activity" className="link">
            <span>Activity</span>
            <i className="fa fa-music" aria-hidden="true" />
          </NavLink>
          <NavLink to="/profile" className="link">
            <span>Profile</span>
            <i className="fa fa-user-circle" aria-hidden="true" />
          </NavLink>
          {this.props.logged && <h1>logged in!</h1>}
        </nav>
      </HashRouter>
    );
  }
}

const BANDitHead = connect(mapStateToProps)(ConnectedBANDitHead);

export default BANDitHead;
