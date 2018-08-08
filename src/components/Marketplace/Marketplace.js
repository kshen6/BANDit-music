/* React, Redux */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Assets */
import { Col } from 'reactstrap';
import './Marketplace.css';

const mapStateToProps = state => {
  return { logged: state.logged };
};

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      genre: ['rock', 'indie', 'chill'],
      program: 'MS in CS',
      year: '2021',
      location: 'Rains Rm 164'
    };
  }

  render() {
    return (
      <div className="userCard">
        <h4>{this.props.name}</h4>
        <h6>{this.state.program + ' ' + this.state.year}</h6>
        <h6>{this.state.location}</h6>
        <p>
          Genres:{' '}
          {this.state.genre.map(genre => (
            <span key={genre.id}>{genre + ' '}</span>
          ))}
        </p>
        <a>View {this.props.name + "'s"} profile</a>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(); //don't reload window
    if (!this.state.text.length) {
      return;
    }
    this.setState(() => ({
      instrument: this.state.text,
      text: ''
    }));
  }
}

class ConnectedMarketplace extends Component {
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
      <div className="marketplace">
        {this.props.logged && (
          <Col md="8">
            <UserCard name="Kendrick Shen" />
            <UserCard name="Eric Loreaux" />
            <UserCard name="Joseph Hennessey" />
          </Col>
        )}
        {!this.props.logged && this.ensureAuth()}
      </div>
    );
  }
}

const Marketplace = connect(mapStateToProps)(ConnectedMarketplace);

export default Marketplace;
