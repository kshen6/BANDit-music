import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogged } from '../redux/actions/index';

import { Auth } from 'aws-amplify';

import BANDitHead from './BANDitHead/BANDitHead';
import Home from './Home/Home';
import Marketplace from './Marketplace/Marketplace';
import Activity from './Activity/Activity';
import Profile from './Profile/Profile';
import Login from './Auth/Auth';
import './App/App.css';

const mapDispatchToProps = dispatch => {
  return {
    toggleLogged: logged => dispatch(toggleLogged(logged))
  };
};

class ConnectedApp extends Component {
  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.props.toggleLogged(true);
      }
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App container-fluid">
          <BANDitHead />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/activity" component={Activity} />
            <Route path="/profile" component={Profile} />
            <Route path="/auth" component={Login} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

const App = connect(
  null,
  mapDispatchToProps
)(ConnectedApp);

export default App;
