/* React */
import React, { Component } from 'react';

/* Assets */
import './Post.css';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <h4>content: {this.props.content}</h4>
        <p>attachment: {this.props.attachment}</p>
        <p>postId: {this.props.id}</p>
        <button onClick={this.props.delete}>Delete post</button>
        <button onClick={this.props.show}>See Post</button>
      </div>
    );
  }
}

export default Post;
