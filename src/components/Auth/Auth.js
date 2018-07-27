import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLogged } from '../../redux/actions/index';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Loader from '../Loader/Loader';
import './Auth.css';
import { Auth } from 'aws-amplify';

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

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({ loading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.toggleLogged(true); //redux!
    } catch (e) {
      alert(e.message);
      this.setState({ loading: false });
      this.props.toggleLogged(false);
    }
  };

  render() {
    return (
      <Form className="Login" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <FormGroup row>
          <Label htmlFor="email" sm={2}>
            Email:
          </Label>
          <Col md={6}>
            <Input
              type="text"
              name="email"
              id="email-input"
              placeholder="Your email here..."
              value={this.state.email}
              onChange={this.handleChange}
            />
            <FormText color="muted">
              Please sign in with your 'at' stanford.edu email, as this is only
              offered to Stanford students currently.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="password" sm={2}>
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
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col md={{ size: 6, offset: 2 }}>
            <Loader
              disabled={false}
              type="submit"
              isLoading={this.state.loading}
              text="Login"
              loadingText="Logging in..."
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const Login = connect(
  null,
  mapDispatchToProps
)(ConnectedLogin);

class ConnectedLogged extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await Auth.signOut();
      this.props.toggleLogged(false);
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleSubmit}>Sign out</Button>
      </div>
    );
  }
}

const Logged = connect(
  null,
  mapDispatchToProps
)(ConnectedLogged);

const ConnectedProfile = ({ logged }) => (
  <div className="Auth">
    {!logged && <Login />}
    {logged && <Logged />}
  </div>
);

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;
