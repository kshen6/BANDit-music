/* React and Redux */
import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogged, saveUserInfo } from '../redux/actions/index';

import { Auth, API } from 'aws-amplify';

/* Components for Router to render */
import BANDitHead from './ui/BANDitHead/BANDitHead';
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import Activity from './pages/Activity/Activity';
import Profile from './pages/Profile/Profile';
import Login from './Auth/Auth';
import './App/App.css';

const mapDispatchToProps = dispatch => {
  return {
    toggleLogged: logged => dispatch(toggleLogged(logged)),
    saveUserInfo: (
      preferred_name,
      programAndYear,
      residence,
      genres,
      instruments,
      userId
    ) =>
      dispatch(
        saveUserInfo(
          preferred_name,
          programAndYear,
          residence,
          genres,
          instruments,
          userId
        )
      )
  };
};

class ConnectedApp extends Component {
  /*   to ensure session is retained if window is reloaded */
  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.props.toggleLogged(true);
        let currSess = await Auth.currentUserInfo();
        let user = await API.get('userapi', `/banditusers/${currSess.id}`);
        if (user) {
          let savedUser = {
            preferred_name: user.preferred_name,
            programAndYear: user.programAndYear,
            residence: user.residence,
            genres: user.genres,
            instruments: user.instruments,
            userId: user.userId,
            email: currSess.attributes.email
          };
          this.props.saveUserInfo(savedUser);
        } else {
          this.props.saveUserInfo(null);
        }
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
            <Route path="/activity" exact component={Activity} />
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
