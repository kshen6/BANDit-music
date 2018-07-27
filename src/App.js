import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import BANDitHead from './BANDitHead/BANDitHead';
import Content from './Content';
import './App/App.css';

import { connect } from 'react-redux';
import { toggleLogged } from './actions/index';

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
          <Content />
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
