/* React */
import React, { Component } from 'react';

/* Assets */
import '../../styles/posts/Post/Post.css';
import InlineButton from '../ui/InlineButton';

class Post extends Component {
  updated() {
    let newDate = new Date(this.props.updatedAt);
    return (
      newDate.getMonth() +
      1 +
      '/' +
      newDate.getDate() +
      '/' +
      newDate.getFullYear()
    );
  }

  render() {
    return (
      <div className="post">
        <h4>Subject: {this.props.subject}</h4>
        <h6>Content: {this.props.content}</h6>
        <h6>Last updated: {this.updated()}</h6>
        <InlineButton text="Delete" onClick={this.props.delete} />
        {'  '}
        <InlineButton text="Expand" onClick={this.props.show} />
      </div>
    );
  }
}

export default Post;
