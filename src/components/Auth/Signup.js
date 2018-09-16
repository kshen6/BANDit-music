/* React, Redux */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Form, FormText, FormGroup, Label, Input } from 'reactstrap';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { toggleLogged } from '../../redux/actions/index';
import InlineButton from '../ui/InlineButton/InlineButton';
import Loader from '../ui/Loader/Loader';

import { API } from 'aws-amplify';

const mapDispatchToProps = dispatch => {
  return {
    toggleLogged: logged => dispatch(toggleLogged(logged))
  };
};

class ConnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password1: '',
      password2: '',
      confCode: '',
      loading: false,
      newUser: null,
      response: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      response: ''
    });
    this.setState({ loading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password1
      });
      this.setState({
        newUser
      });
      await Auth.signIn(this.state.email, this.state.password1);
      await this.configUser({
        preferred_name: this.state.name,
        programAndYear: null,
        residence: null,
        genres: null,
        instruments: null
      });
      this.setState({
        loading: false
      });
      this.props.toggleLogged(true);
      this.props.history.push('/');
      window.location.reload();
    } catch (e) {
      alert(e.message);
      let response = '';
      switch (e.message) {
        case 'Password did not conform with policy: Password not long enough':
          response = 'Please enter a password with 8 or more characters.';
          break;
        default:
          response =
            'Email is already in use. Please sign in or try another email!';
          break;
      }
      if (!this.state.email.length || !this.state.password1.length) {
        response =
          'Please provide a valid email and password with 8 or more characters.';
      }
      this.setState({
        response: response
      });
    }

    this.setState({ loading: false });
  };

  configUser(user) {
    return API.post('userapi', '/banditusers', {
      body: user
    });
  }

  validate() {
    return this.state.password1 === this.state.password2;
  }

  render() {
    return (
      <div className="ConnectedSignup">
        <Form className="signup" onSubmit={this.handleSubmit}>
          <h4>Make your account</h4>
          <FormGroup row>
            <Label htmlFor="name" sm={3}>
              Preferred Name:
            </Label>
            <Col md={9}>
              <Input
                type="name"
                name="name"
                id="name-input"
                placeholder="First and Last"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="email" sm={3}>
              Email:
            </Label>
            <Col md={9}>
              <Input
                type="email"
                name="email"
                id="email-input"
                placeholder="example@stanford.edu"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="password" sm={3}>
              Password:
            </Label>
            <Col md={9}>
              <Input
                type="password"
                name="password1"
                id="password-input"
                placeholder="Your password here..."
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="password" sm={3}>
              Retype Password:
            </Label>
            <Col md={9}>
              <Input
                type="password"
                name="password2"
                id="password-input"
                placeholder="Your password here..."
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormText color="muted">
                Please make sure passwords match and are 8 or more characters!
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col md className="no-padding">
              <Loader
                disabled={!this.validate()}
                type="submit"
                isLoading={this.state.loading}
                text="Sign up"
                loadingText="Confirming"
              />
            </Col>
            <Col md={9} className="no-padding">
              or log in{' '}
              <InlineButton text="here" onClick={() => this.props.onClick()} />.
            </Col>
            <FormText>{this.state.response}</FormText>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const Signup = connect(
  null,
  mapDispatchToProps
)(ConnectedSignup);

export default withRouter(Signup);
