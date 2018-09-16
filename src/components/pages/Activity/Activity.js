/* React */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Assets */
import PostList from '../../posts/PostList/PostList';
import CreatePost from '../../posts/CreatePost/CreatePost';
import InlineButton from '../../ui/InlineButton/InlineButton';

const mapStateToProps = state => {
  return {
    logged: state.logged,
    user: state.user
  };
};

class ConnectedActivity extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
  }

  ensureAuth() {
    return (
      <p>
        Please <InlineButton text="login" onClick={this.ensure} /> to view this
        content.
      </p>
    );
  }

  ensure() {
    this.props.history.push('auth');
  }

  render() {
    return (
      <div className="Activity page">
        {!this.props.logged && this.ensureAuth()}
        {this.props.logged && (
          <div>
            <CreatePost />
            <hr />
            <h4>Recent activity:</h4>
            <PostList user="all" />
          </div>
        )}
      </div>
    );
  }
}

const Activity = connect(mapStateToProps)(ConnectedActivity);

export default withRouter(Activity);
