/* React, Redux */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

/* Assets */
import { API } from 'aws-amplify';
import '../../styles/pages/Marketplace/Marketplace.css';
import InlineButton from '../ui/InlineButton';

const mapStateToProps = state => {
  return { logged: state.logged };
};

function UserCard(props) {
  return (
    <div className="userCard">
      <h4>{props.user.preferred_name}</h4>
      <h6>Program and Year: {props.user.programAndYear}</h6>
      <h6>Residence: {props.user.residence}</h6>
      <p>Genres: {props.user.genres}</p>
      <p>Instruments: {props.user.instruments}</p>
      <a>View {props.user.preferred_name + "'s"} profile</a>
    </div>
  );
}

class ConnectedMarketplace extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    try {
      const users = await this.users();
      this.setState({ users });
    } catch (e) {
      alert(e);
    }
  }

  users() {
    return API.get('userapi', '/banditusers');
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
      <div className="marketplace page">
        {!this.props.logged && this.ensureAuth()}
        {this.props.logged && (
          <Col md="8">
            {this.state.users.map(user => <UserCard user={user} />)}
          </Col>
        )}
      </div>
    );
  }
}

const Marketplace = connect(mapStateToProps)(ConnectedMarketplace);

export default Marketplace;
