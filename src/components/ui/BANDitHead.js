/* React, Redux */
import React, { Component } from 'react';
import { HashRouter, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogged } from '../../redux/actions/index';

/* Assets */
import { Auth } from 'aws-amplify';
import '../../styles/ui/BANDitHead/BANDitHead.css';
import logo from '../../assets/img/bandit-logo.png';

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleLogged: logged => dispatch(toggleLogged(logged))
  };
};

class ConnectedBANDitHead extends Component {
  handleSignOut = async e => {
    await Auth.signOut();
    this.props.toggleLogged(false);
    this.props.history.push('auth');
  };

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
          {!this.props.logged && (
            <NavLink to="auth" className="auth">
              <span>Login</span>
            </NavLink>
          )}
          {this.props.logged && (
            <NavLink to="/" className="auth" onClick={this.handleSignOut}>
              <span>Sign out</span>
            </NavLink>
          )}
        </nav>
      </HashRouter>
    );
  }
}

const BANDitHead = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedBANDitHead);

export default withRouter(BANDitHead);
