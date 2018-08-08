/* React */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Assets */
import Post from './../Post/Post.js';
import CreatePost from './../CreatePost/CreatePost';
import './Activity.css';
import { API } from 'aws-amplify';

const mapStateToProps = state => {
  return { logged: state.logged };
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const posts = await this.posts();
      this.setState({ posts });
    } catch (e) {
      alert(e);
    }
  }

  posts() {
    return API.get('postapi', '/banditposts');
  }

  delete = async (postId, e) => {
    e.preventDefault();
    const confirm = window.confirm('delete?');
    if (!confirm) return;
    try {
      await this.deleteNote(postId);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  deleteNote(id) {
    return API.del('postapi', `/banditposts/${id}`);
  }

  show(postId) {
    this.props.history.push(`activity/${postId}`);
  }

  render() {
    return (
      <div>
        {this.state.posts
          .map(post => (
            <Post
              content={post.content}
              attachment={post.attachment}
              key={post.postId}
              id={post.postId}
              delete={e => this.delete(post.postId, e)}
              show={e => this.show(post.postId, e)}
            />
          ))
          .reverse()}
      </div>
    );
  }
}

let RoutedPostList = withRouter(PostList);

class ConnectedActivity extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
  }

  ensureAuth() {
    return (
      <p>
        Please <button onClick={this.ensure}>login</button> to view this
        content.
      </p>
    );
  }

  ensure() {
    this.props.history.push('auth');
  }

  render() {
    return (
      <div className="Activity">
        {!this.props.logged && this.ensureAuth()}
        {this.props.logged && (
          <div>
            <CreatePost />
            <hr />
            <h3>Recent activity:</h3>
            <RoutedPostList />
          </div>
        )}
      </div>
    );
  }
}

const Activity = connect(mapStateToProps)(ConnectedActivity);

export default withRouter(Activity);
