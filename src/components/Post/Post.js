/* React */
import React, { Component } from 'react';

/* Assets */
import './Post.css';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <h4>
          {this.props.postType === 'Post' ? 'Subject: ' : 'Event: '}{' '}
          {this.props.subject}
        </h4>
        <h6>
          {this.props.postType === 'Post' ? 'Content: ' : 'Description: '}{' '}
          {this.props.content}
        </h6>
        <button onClick={this.props.delete}>Delete</button>
        <button onClick={this.props.show}>Expand</button>
      </div>
    );
  }
}

export default Post;
