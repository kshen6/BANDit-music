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

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      content: '',
      attachment: '',
      type: 'Create new...',
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
    return this.state.content.length > 0;
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
        content: this.state.content,
        attachment: this.state.attachment
      });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }

    this.setState({ loading: false });
  };

  handleDrop(type) {
    this.setState({
      type: type
    });
  }

  render() {
    return (
      <Form className="createPost" onSubmit={this.handleSubmit}>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle id="b-d-toggle" caret>
            {this.state.type}
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
        <FormGroup row>
          <Label htmlFor="content" sm={2}>
            Content:
          </Label>
          <Col md>
            <Input
              type="text"
              name="content"
              id="content-input"
              placeholder=""
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="attachment" sm={2}>
            Attachment:
          </Label>
          <Col md>
            <Input
              type="input"
              name="attachment"
              id="attachment-input"
              placeholder=""
              value={this.state.attachment}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
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
