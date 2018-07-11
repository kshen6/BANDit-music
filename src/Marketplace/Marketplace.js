import React, { Component } from 'react';

import './Marketplace.css';

function user(details) {
  this.name = details.name;
  this.onTheLook = true;
  this.instrument = null;
  this.greeting = function() {
    if (this.onTheLook) {
      return 'Lets find you another musician!';
    }
    return 'Nice to see youve joined a band!';
  };
}

let users = {
  userList: ['Kendrick', 'Jason', 'Tyler']
};

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      looking: true,
      instrument: null,
      text: ''
    };
  }

  render() {
    let user1 = new user({ name: 'Kendrick Shen' });
    user1.onTheLook = false;

    return (
      <div className="UserCard">
        <h1>{this.props.name}</h1>
        <h2>
          {this.props.name} is looking for jam sessions: {this.state.looking}{' '}
        </h2>
        <h3>
          {this.props.name} plays the {this.state.instrument}{' '}
        </h3>
        <button onClick={() => this.setState({ looking: false })}>
          {' '}
          Click to turn off searching{' '}
        </button>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="instrument">Instrument played:</label>
          <input
            id="instrument"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>Submit</button>
        </form>
        {user1.greeting()}
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(); //don't reload window
    if (!this.state.text.length) {
      return;
    }
    this.setState(() => ({
      instrument: this.state.text,
      text: ''
    }));
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: ['Kendrick', 'Tyler', 'Jason'],
      numUsers: 3
    };
  }

  displayUser(user) {
    return <UserCard name={user} />;
  }

  render() {
    return <div className="UserList" />;
  }
}

class Marketplace extends Component {
  render() {
    return (
      <div className="Marketplace">
        <UserList />
        <h3>Users:</h3>
        <ol>{users.userList.map(user => <li>{user}</li>)}</ol>
      </div>
    );
  }
}

export default Marketplace;
