/* React */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* Assets */
import { API } from 'aws-amplify';
import Post from '../../posts/Post/Post';
import './PostList.css';

const mapStateToProps = state => {
  return {
    logged: state.logged,
    user: state.user
  };
};

class ConnectedPostList extends Component {
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
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!confirm) return;
    try {
      await this.deleteNote(postId);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  deleteNote(postId) {
    return API.del('postapi', `/banditposts/${postId}`);
  }

  render() {
    return (
      <div>
        {this.state.posts
          .map(post => (
            <Post
              post={post}
              key={post.subject}
              delete={
                this.props.user.userId === post.userId
                  ? e => this.delete(post.postId, e)
                  : null
              }
            />
          ))
          .reverse()}
      </div>
    );
  }
}

const RoutedPostList = withRouter(connect(mapStateToProps)(ConnectedPostList));

export default RoutedPostList;
