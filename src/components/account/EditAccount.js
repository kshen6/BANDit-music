/* React */
import React, { Component } from 'react';
import {
  Label,
  Col,
  Input,
  FormGroup,
  Form,
  FormText,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';

/* Assets */
import { s3Upload } from '../../libs/awsLib';
import { API } from 'aws-amplify';
import Loader from '../ui/Loader';
import '../../styles/pages/Profile/Profile.css';

const mapStateToProps = state => {
  return { logged: state.logged };
};

class ConnectedEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.file = null;
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange = e => {
    this.file = e.target.files[0];
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (this.file && this.file.size > 50000000) {
      alert('Please pick a file smaller than 5 MB');
      return;
    }

    this.setState({ loading: true });

    try {
      const photo = this.file ? await s3Upload(this.file) : null;
      await this.configUser({
        photo,
        preferred_name: 'kendrick shen'
      });
      this.setState({
        loading: false
      });
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  configUser(user) {
    return API.post('userapi', '/banditusers', {
      body: user
    });
  }

  render() {
    return (
      <Form className="editAccount" onSubmit={this.handleSubmit}>
        <h4>Add profile photo</h4>
        <FormGroup row>
          <Label htmlFor="photo" sm={3}>
            Photo:
          </Label>
          <Col md={9}>
            <Input
              type="file"
              name="photo"
              id="photo-input"
              placeholder="Your photo here..."
              onChange={this.handleFileChange}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col md={{ size: 6, offset: 2 }}>
            <Loader
              disabled={false}
              type="submit"
              isLoading={this.state.loading}
              text="Add photo"
              loadingText="Adding photo..."
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const EditAccount = connect(mapStateToProps)(ConnectedEdit);

export default EditAccount;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'ken',
      email: 'k@gmail',
      password: '',
      genres: [],
      suggestions: ''
    };

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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Form className="EditAccount" onSubmit={this.handleSubmit}>
          <h2>Kendrick</h2>
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
