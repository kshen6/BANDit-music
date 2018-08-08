import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import Post from './Post';
import { Form, FormGroup, Label, Col, Input, Media } from 'reactstrap';
import Loader from '../Loader/Loader';

class OnePost extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      post: null,
      content: '',
      attachment: '',
      photoURL: null,
      photo: null
    };
  }

  async componentDidMount() {
    try {
      let photoURL;
      const post = await this.getPost();
      const photo = await this.getPhoto();
      const { content, attachment } = post;
      if (photo) {
        photoURL = await Storage.vault.get(photo);
      }

      this.setState({
        post,
        content,
        attachment,
        photoURL,
        photo
      });
    } catch (e) {
      alert(e);
    }
  }

  getPost() {
    return API.get('postapi', `/banditposts/${this.props.match.params.id}`);
  }

  getPhoto() {
    return API.get('userapi', '/banditusers');
  }

  formatFile(str) {
    return str.replace(/^\w-/, '');
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleFileChange = e => {
    this.file = e.target.files[0];
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  handleDelete = async e => {
    e.preventDefault();
    const confirmed = window.confirm('delete?');
    if (!confirmed) return;
  };

  render() {
    return (
      <div className="one-post">
        {this.state.post && (
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label htmlFor="content" sm={3}>
                Content:
              </Label>
              <Col md={9}>
                <Input
                  type="text"
                  name="content"
                  id="content-input"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="attachment" sm={3}>
                attachment:
              </Label>
              <Col md={9}>
                <Input
                  type="text"
                  name="attachment"
                  id="attachment-input"
                  value={this.state.attachment}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            {this.state.photo && (
              <FormGroup row>
                <Label htmlFor="photo" sm={3}>
                  photo:
                </Label>
                <Media>
                  <Media left>
                    <Media
                      object
                      src={this.state.photoURL}
                      alt="profile image"
                    />
                  </Media>
                </Media>
              </FormGroup>
            )}
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
        )}
      </div>
    );
  }
}

export default OnePost;
