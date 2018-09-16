/* React */
import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';

/* Assets */
import './Post.css';
import InlineButton from '../../ui/InlineButton/InlineButton';
import Banditspan from '../../ui/Banditspan/Banditspan';

const mapStateToProps = state => {
  return {
    logged: state.logged,
    user: state.user
  };
};

class ConnectedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      comment: ''
    };
    this.expand = this.expand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updated() {
    let newDate = new Date(this.props.post.updatedAt);
    return (
      newDate.getMonth() +
      1 +
      '/' +
      newDate.getDate() +
      '/' +
      newDate.getFullYear() +
      ' ' +
      newDate.toLocaleTimeString()
    );
  }

  edit() {}

  expand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    let own = this.props.post.userId === this.props.user.userId;
    return (
      <div className="post">
        <h6>
          {this.props.post.postType === 'Concert' && (
            <Banditspan text="Concert" />
          )}
          {own ? 'You posted:' : this.props.post.author + ' posted:'}
        </h6>
        <Row>
          <Col md={9}>
            <h4>{this.props.post.subject}</h4>
          </Col>
          <Col>
            <h6>
              Last updated: <br /> {this.updated()}
            </h6>
          </Col>
        </Row>
        <h6>{this.props.post.content}</h6>
        {this.props.post.postType === 'Concert' && (
          <Row>
            <Col sm={3}>
              <i className="fa fa-compass" /> | {this.props.post.location}
            </Col>
            <Col sm={3}>
              <i className="fa fa-clock-o" /> | {this.props.post.time}
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={1}>Attending:</Col>
        </Row>
        <Row>
          <Col sm={1}>
            <InlineButton text="Expand" onClick={this.expand} />
          </Col>
          <Col sm={1}>
            {own && <InlineButton text="Delete" onClick={this.props.delete} />}
          </Col>
          <Col sm={1}>
            {own && <InlineButton text="Edit" onClick={this.edit} />}
          </Col>
        </Row>
        <div hidden={this.state.expanded}>
          <i className="fa fa-thumbs-up" />
          <span>I'll be there!</span>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Comment:</Label>
              <Input type="text" name="comment" onChange={this.handleChange} />
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const Post = connect(mapStateToProps)(ConnectedPost);

export default Post;
