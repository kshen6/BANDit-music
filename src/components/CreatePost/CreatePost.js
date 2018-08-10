import React, { Component } from 'react';
import {
  Input,
  Col,
  Form,
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Loader from '../Loader/Loader';
import { API } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import './CreatePost.css';
import * as Datetime from 'react-datetime';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      subject: '',
      content: '',
      location: '',
      time: '',
      postType: 'Create new...',
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  validatePost() {
    return this.state.subject.length && this.state.content.length;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createPost(post) {
    return API.post('postapi', '/banditposts', {
      body: post
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      await this.createPost({
        postType: this.state.postType,
        subject: this.state.subject,
        content: this.state.content,
        location: this.state.postType === 'Post' ? null : this.state.location,
        time: this.state.postType === 'Post' ? null : this.state.time
      });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }

    this.setState({ loading: false });
  };

  handleDrop(postType) {
    this.setState({
      postType: postType
    });
    this.forceUpdate();
  }

  render() {
    return (
      <Form className="createPost" onSubmit={this.handleSubmit}>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle id="b-d-toggle" caret>
            {this.state.postType}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled>Create new...</DropdownItem>
            <DropdownItem onClick={e => this.handleDrop('Post', e)}>
              Post
            </DropdownItem>
            <DropdownItem onClick={e => this.handleDrop('Event', e)}>
              Event
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.state.postType === 'Post' && (
          <div>
            <FormGroup row>
              <Label htmlFor="subject" sm={2}>
                Subject:
              </Label>
              <Col md={6}>
                <Input
                  type="text"
                  name="subject"
                  id="subject-input"
                  placeholder=""
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="content" sm={2}>
                Content:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="content"
                  id="content-input"
                  placeholder=""
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </div>
        )}
        {this.state.postType === 'Event' && (
          <div>
            <FormGroup row>
              <Label htmlFor="event" sm={2}>
                Event Name:
              </Label>
              <Col md={6}>
                <Input
                  type="text"
                  name="subject"
                  id="event-input"
                  placeholder=""
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="description" sm={2}>
                Description:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="content"
                  id="content-input"
                  placeholder=""
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="location" sm={2}>
                Location:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="location"
                  id="location-input"
                  placeholder=""
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="time" sm={2}>
                Date and time:
              </Label>
              <Col md={6}>
                <Datetime name="time" value={this.state.time} />
              </Col>
            </FormGroup>
          </div>
        )}
        <FormGroup check row>
          <Col id="l-row">
            <Loader
              disabled={!this.validatePost()}
              type="submit"
              isLoading={this.state.loading}
              text="Publish"
              loadingText="Publishing..."
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default withRouter(CreatePost);
