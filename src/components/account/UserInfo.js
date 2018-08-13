import React, { Component } from 'react';
import { Media } from 'reactstrap';

class UserInfo extends Component {
  edit() {}

  render() {
    return (
      <div>
        <div className="row UserInfo">
          <Media>
            <Media left>
              <Media
                object
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Neil_Young_in_Austin%2C_1976.jpg/170px-Neil_Young_in_Austin%2C_1976.jpg'
                }
                alt="Profile image"
              />
            </Media>
          </Media>
          <div className="col-sm-5 UserDetails">
            <h1>{this.props.user.preferred_name}</h1>
            <i className="fa fa-university" aria-hidden="true" />
            <h6>{this.props.user.programAndYear}</h6>
            <hr />
            <i className="fa fa-envelope-o" aria-hidden="true" />
            <h6>email here</h6>
            <hr />
            <i className="fa fa-music" aria-hidden="true" />
            <h6>{this.props.user.instruments}</h6>
            <hr />
            <i className="fa fa-headphones" aria-hidden="true" />
            <h6>{this.props.user.genres}</h6>
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={this.edit()}>
            Edit profile
          </button>
        </div>
      </div>
    );
  }
}

export default UserInfo;
