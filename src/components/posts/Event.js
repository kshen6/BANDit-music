/* React */
import React, { Component } from 'react';

/* Assets */
import '../../styles/posts/Event/Event.css';
import InlineButton from '../ui/InlineButton';

class Post extends Component {
  updated() {
    let newDate = new Date(this.props.updatedAt);
    return newDate.getUTCDate();
  }
  render() {
    return (
      <div className="event">
        <h4>Event: {this.props.subject}</h4>
        <h6>Description: {this.props.content}</h6>
        <h6>Last updated: {this.updated()}</h6>
        <h6>Location: {this.props.location}</h6>
        <h6>Time: {this.props.time}</h6>
        <InlineButton text="Delete" onClick={this.props.delete} />
        {'  '}
        <InlineButton text="Expand" onClick={this.props.show} />
      </div>
    );
  }
}

export default Post;
