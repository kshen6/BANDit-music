/* React, Redux */
import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

/* Assets */
import './Auth.css';
import Login from './Login';
import Signup from './Signup';

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
};

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      login: true
    };
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleLogin() {
    this.setState({
      login: !this.state.login
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="Auth">
        <Modal
          autoFocus={true}
          size="md"
          backdrop="static"
          toggle={this.toggleModal}
          isOpen={this.state.modal}
        >
          <ModalBody id="bandit-modal">
            {this.state.login ? (
              <Login onClick={() => this.toggleLogin()} />
            ) : (
              <Signup onClick={() => this.toggleLogin()} />
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const Auth_ = connect(mapStateToProps)(Authenticate);

export default Auth_;
