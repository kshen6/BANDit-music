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
import './Profile.css';
import Post from './../Post/Post.js';
import EditAccount from './EditAccount';

const mapStateToProps = state => {
  return { logged: state.logged };
};

let exampleUser = {
  name: 'Neil Young',
  email: 'neil@neil.com',
  instruments: ['guitar', 'piano'],
  genres: ['rock', 'trap']
};

var show = 'UserInfo';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: exampleUser.name,
      email: exampleUser.email,
      password: '',
      genres: [],
      suggestions: ''
    };

    this.store = this.props.store;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    return (
      this.state.email.indexOf('@stanford.edu') !== -1 &&
      this.state.name.length > 0 &&
      this.state.password.length > 6
    );
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Form className="EditAccount" onSubmit={this.handleSubmit}>
          <h2>{exampleUser.name}</h2>
          <h5>Edit profile</h5>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name:
            </Label>
            <Col md={6}>
              <Input
                type="text"
                name="name"
                id="name-input"
                placeholder="Your name here..."
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email:
            </Label>
            <Col md={6}>
              <Input
                type="text"
                name="email"
                id="email-input"
                placeholder="Your username here..."
                value={this.state.email}
                onChange={this.handleChange}
              />
              <FormText color="muted">
                Please sign up with an 'at' stanford.edu email, as this is only
                offered to Stanford students currently.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Password:
            </Label>
            <Col md={6}>
              <Input
                type="password"
                name="password"
                id="password-input"
                placeholder="Your password here..."
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormText color="muted">
                Make sure your password is at least 6 characters long!
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row className="big-row">
            <Label for="genre" sm={2}>
              Genre(s):
            </Label>
            <Col md={6}>
              <Input
                style={{ backgroundColor: 'inherit', border: '2px solid grey' }}
                type="select"
                name="genre"
                id="genre-input"
                multiple
              >
                <option>Rock</option>
                <option>Classic</option>
                <option>Trap</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row className="big-row">
            <Label for="suggestions" sm={2}>
              Suggestions?
            </Label>
            <Col md={6}>
              <Input
                style={{ backgroundColor: 'inherit', border: '2px solid grey' }}
                type="textarea"
                name="suggestions"
                value={this.state.suggestions}
                onChange={this.handleChange}
                id="suggestions-input"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col md={{ size: 6, offset: 2 }}>
              <Button disabled={!this.validate()} type="submit">
                Sign up!
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

class UserInfo extends Component {
  edit() {
    show = 'EditProfile';
  }
  render() {
    return (
      <div>
        <div className="row UserInfo">
          <Media>
            <Media left>
              <Media
                object
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Neil_Young_in_Austin%2C_1976.jpg/170px-Neil_Young_in_Austin%2C_1976.jpg'
                }
                alt="Profile image"
              />
            </Media>
          </Media>
          <div className="col-sm-5 UserDetails">
            <h1>{this.props.user.name}</h1>
            <i className="fa fa-envelope-o" aria-hidden="true" />
            <h5>{this.props.user.email}</h5>
            <hr />
            <i className="fa fa-music" aria-hidden="true" />
            <h5>{this.props.user.instruments.join(', ')}</h5>
            <hr />
            <i className="fa fa-headphones" aria-hidden="true" />
            <h5>{this.props.user.genres.join(', ')}</h5>
            <hr />
            <span>Currently looking for: </span>
            <ul />
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={this.edit()}>
            Edit profile
          </button>
        </div>
      </div>
    );
  }
}

class ConnectedProfile extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
  }

  ensureAuth() {
    return (
      <p>
        Please <button onClick={this.ensure}>login</button> to view this
        content.
      </p>
    );
  }

  ensure() {
    this.props.history.push('auth');
  }

  render() {
    return (
      <div className="Profile">
        {this.props.logged && (
          <div>
            <EditAccount />
            {show === 'UserInfo' && <UserInfo user={exampleUser} />}
            {show === 'EditProfile' && <EditProfile user={exampleUser} />}
            <hr />
            <h3>Recent activity</h3>
            <Post />
          </div>
        )}
        {!this.props.logged && this.ensureAuth()}
      </div>
    );
  }
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;
