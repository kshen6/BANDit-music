/* React, Redux */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormText,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { toggleLogged } from '../../redux/actions/index';
import Loader from '../Loader/Loader';

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
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    this.setState({
      response: ''
    });
    e.preventDefault();
    this.setState({ loading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password1
      });
      this.setState({
        newUser
      });
    } catch (e) {
      if (e.message === 'UsernameExistsException') {
        Auth.resendSignUp(this.state.email);
      }
      console.log(e.message); //TODO: remove this
      let response = '';
      switch (e.message) {
        default:
          response = 'Username has been taken. Please sign in';
          break;
      }
      if (!this.state.email.length || !this.state.password.length) {
        response =
          'Please provide a valid username and password longer than 6 characters.';
      }
      this.setState({
        response: response
      });
    }

    this.setState({ loading: false });
  };

  handleConf = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confCode);
      await Auth.signIn(this.state.email, this.state.password1);
      this.props.toggleLogged(true);
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ loading: false });
    }
  };

  validate() {
    return !(this.state.password1 === this.state.password2);
  }

  renderForm() {
    return (
      <Form className="signup" onSubmit={this.handleSubmit}>
        <h4>Make your account</h4>
        <FormGroup row>
          <Label htmlFor="name" sm={3}>
            Name:
          </Label>
          <Col md={9}>
            <Input
              type="text"
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
              type="text"
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
              Please make sure passwords match and are longer than 6 characters!
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col md={3} className="no-padding">
            <Loader
              disabled={this.validate()}
              type="submit"
              isLoading={this.state.loading}
              text="Sign up"
              loadingText="Confirming"
            />
          </Col>
          <Col md={9} className="no-padding">
            or log in{' '}
            <span className="alt-span" onClick={() => this.props.onClick()}>
              here
            </span>.
          </Col>
          <FormText>{this.state.response}</FormText>
        </FormGroup>
      </Form>
    );
  }

  renderConf() {
    return (
      <Form className="Signup" onSubmit={this.handleConf}>
        <FormGroup row>
          <Label htmlFor="name" sm={3}>
            Confirmation Code sent to your inbox:
          </Label>
          <Col md={9}>
            <Input
              type="number"
              name="confCode"
              id="conf-input"
              placeholder="XXXXXX"
              value={this.state.confCode}
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
              text="Confirm"
              loadingText="Signing up"
            />
          </Col>
        </FormGroup>
        <span>
          Have an account? Login in{' '}
          <Button onClick={() => this.props.onClick()}>here</Button>
        </span>
      </Form>
    );
  }

  render() {
    return (
      <div className="ConnectedSignup">
        {this.state.newUser === null ? this.renderForm() : this.renderConf()}
      </div>
    );
  }
}

const Signup = connect(
  null,
  mapDispatchToProps
)(ConnectedSignup);

export default withRouter(Signup);
