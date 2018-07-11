import React, { Component } from 'react';
import './Post.css';

let post = {
  date: 'December 7, 2017',
  author: 'Neil Young',
  comments: ['Great job!', 'No way!'],
  content: 'what going on tho!'
};

class Post extends Component {
  render() {
    return (
      <div className="Post">
        <h4>Post on {post.date}</h4>
        <p>{post.content}</p>
        <h5>Comments</h5>
        {post.comments && <p>{post.comments}</p>}
      </div>
    );
  }
}

export default Post;
