/* React */
import React, { Component } from 'react';
import { Label, Col, Input, FormGroup, Form } from 'reactstrap';
import { connect } from 'react-redux';

/* Assets */
import './Profile.css';
import Loader from '../Loader/Loader';
import { s3Upload } from '../../libs/awsLib';
import { API } from '../../../node_modules/aws-amplify';

const mapStateToProps = state => {
  return { logged: state.logged };
};

class ConnectedEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.file = null;
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange = e => {
    this.file = e.target.files[0];
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (this.file && this.file.size > 50000000) {
      alert('Please pick a file smaller than 5 MB');
      return;
    }

    this.setState({ loading: true });

    try {
      const photo = this.file ? await s3Upload(this.file) : null;
      await this.configUser({
        photo,
        given_name: 'neil diamond'
      });
      this.setState({
        loading: false
      });
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  configUser(user) {
    return API.post('userapi', '/banditusers', {
      body: user
    });
  }

  render() {
    return (
      <Form className="editAccount" onSubmit={this.handleSubmit}>
        <h4>Add profile photo</h4>
        <FormGroup row>
          <Label htmlFor="photo" sm={3}>
            Photo:
          </Label>
          <Col md={9}>
            <Input
              type="file"
              name="photo"
              id="photo-input"
              placeholder="Your photo here..."
              onChange={this.handleFileChange}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col md={{ size: 6, offset: 2 }}>
            <Loader
              disabled={false}
              type="submit"
              isLoading={this.state.loading}
              text="Add photo"
              loadingText="Adding photo..."
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const EditAccount = connect(mapStateToProps)(ConnectedEdit);

export default EditAccount;
