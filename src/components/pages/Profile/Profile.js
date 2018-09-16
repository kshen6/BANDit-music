/* React */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Assets */
import './Profile.css';
import InlineButton from '../../ui/InlineButton/InlineButton';
import ConfigProfile from '../../account/ConfigProfile/ConfigProfile';
import UserInfo from '../../account/UserInfo/UserInfo';

const mapStateToProps = state => {
  return {
    logged: state.logged,
    user: state.user
  };
};

class ConnectedProfile extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
  }

  ensureAuth() {
    return (
      <p>
        Please <InlineButton text="login" onClick={this.ensure} /> to view this
        content.
      </p>
    );
  }

  ensure() {
    this.props.history.push('auth');
  }

  displayProfile() {
    if (!this.props.user) return <ConfigProfile />;
    else return <UserInfo />;
  }

  render() {
    return (
      <div className="Profile page">
        {!this.props.logged && this.ensureAuth()}
        {this.props.logged && this.displayProfile()}
      </div>
    );
  }
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;
