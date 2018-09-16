/* React, Redux */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { toggleLogged } from '../../redux/actions';
import Loader from '../ui/Loader/Loader';
import InlineButton from '../ui/InlineButton/InlineButton';

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
      loading: false,
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
      await Auth.signIn(this.state.email, this.state.password);
      this.props.toggleLogged(true); //redux!
      this.props.history.push('/');
      /* Reload page so user info will be up-to-date */
      window.location.reload();
    } catch (e) {
      let response = '';
      switch (e.message) {
        case 'User does not exist.':
          response = 'User has not been registered. Please sign up!';
          break;
        default:
          response = 'Incorrect email or password.';
          break;
      }
      if (!this.state.email.length || !this.state.password.length) {
        response =
          'Please provide a valid email and password with 8 or more characters.';
      }
      this.setState({
        response: response
      });
      this.props.toggleLogged(false);
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form className="login" onSubmit={this.handleSubmit}>
        <h4>Please log in</h4>
        <FormGroup row>
          <Label htmlFor="email" sm={3}>
            Email:
          </Label>
          <Col md={9}>
            <Input
              autoFocus={true}
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
              name="password"
              id="password-input"
              placeholder="Your password here..."
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col md className="no-padding">
            <Loader
              disabled={false}
              type="submit"
              isLoading={this.state.loading}
              text="Login"
              loadingText="Logging in"
            />
          </Col>
          <Col md={9} className="no-padding">
            or sign up{' '}
            <InlineButton text="here" onClick={() => this.props.onClick()} />.
          </Col>
          <FormText>{this.state.response}</FormText>
        </FormGroup>
      </Form>
    );
  }
}

const Login = connect(
  null,
  mapDispatchToProps
)(ConnectedLogin);

export default withRouter(Login);
