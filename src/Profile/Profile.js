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
import './Profile.css';
import { Media } from 'reactstrap';
import Post from './../Post/Post.js';

let exampleUser = {
  name: 'Neil Young',
  email: 'neil@neil.com',
  instruments: ['guitar', 'piano'],
  genres: ['rock', 'trap']
};

class MakeAccount extends Component {
  render() {
    return (
      <Form className="MakeAccount">
        <h2>Make an Account</h2>
        <FormGroup row>
          <Label for="name" sm={1}>
            Name:
          </Label>
          <Col sm={6}>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Your name here..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={1}>
            Username:
          </Label>
          <Col sm={6}>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="Your username here..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={1}>
            Password:
          </Label>
          <Col sm={6}>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password here..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="genre" sm={1}>
            Genre(s):
          </Label>
          <Col sm={6}>
            <Input type="select" name="genre" id="genre" multiple />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="suggestions" sm={1}>
            Suggestions?
          </Label>
          <Col sm={6}>
            <Input type="textarea" name="text" id="suggestions" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 6, offset: 1 }}>
            <Button>Sign up!</Button>
            <FormText color="muted">
              Please note that BANDit is currently offered only to Stanford
              students.
            </FormText>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

class UserInfo extends Component {
  render() {
    return (
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
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        {false && <MakeAccount />}
        {true && (
          <div>
            <UserInfo user={exampleUser} />
            <hr />
            <h3>Recent activity</h3>
            <Post />
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
