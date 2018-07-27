import React, { Component } from 'react';
import Post from './../Post/Post.js';
import './Activity.css';

class Activity extends Component {
  render() {
    return (
      <div className="Activity">
        <h3>Recent activity</h3>
        <Post />
      </div>
    );
  }
}

export default Activity;
