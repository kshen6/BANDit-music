/* React */
import React, { Component } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { Media } from 'reactstrap';
import { connect } from 'react-redux';

/* Assets */
import '../../styles/pages/Profile/Profile.css';
import InlineButton from '../ui/InlineButton';
import ConfigProfile from '../account/ConfigProfile';
import UserInfo from '../account/UserInfo';

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
    else return <UserInfo user={this.props.user} />;
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
