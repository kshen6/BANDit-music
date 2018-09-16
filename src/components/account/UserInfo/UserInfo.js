import React, { Component } from 'react';
import { Media, Input, Form } from 'reactstrap';
import './UserInfo.css';
import Loader from '../../ui/Loader/Loader';
import { s3Upload } from '../../../libs/awsLib';
import { API, Storage } from 'aws-amplify';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    logged: state.logged,
    user: state.user
  };
};

class ConnectedUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      preferred_name: '',
      programAndYear: '',
      instruments: '',
      genres: '',
      residence: '',
      loading: false
    };
    this.file = null;
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let URL = await Storage.get(this.props.user.photo);
    //console.log(URL)
  }

  edit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileChange = e => {
    this.file = e.target.files[0];
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.file && this.file.size > 50000000) {
      alert('Please pick a file smaller than 5 MB');
      return;
    }

    try {
      const photo = this.file ? await s3Upload(this.file) : null;
      await this.updateUser({
        preferred_name: this.state.preferred_name.length
          ? this.state.preferred_name
          : this.props.user.preferred_name,
        programAndYear: this.state.programAndYear.length
          ? this.state.programAndYear
          : this.props.user.programAndYear,
        residence: this.state.residence.length
          ? this.state.residence
          : this.props.user.residence,
        genres: this.state.genres.length
          ? this.state.genres
          : this.props.user.genres,
        instruments: this.state.instruments.length
          ? this.state.instruments
          : this.props.user.instruments,
        photo: photo
      });
      this.setState({
        loading: false
      });
      window.location.reload();
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  updateUser(user) {
    return API.put('userapi', '/banditusers', {
      body: user
    });
  }

  render() {
    return (
      <div>
        {!this.state.edit && (
          <div>
            <div className="row UserInfo">
              <Media>
                <Media left />
              </Media>
              <div className="col-sm-5 UserDetails">
                <h1>{this.props.user.preferred_name}</h1>
                <i className="fa fa-university" aria-hidden="true" />
                <h6>{this.props.user.programAndYear}</h6>
                <hr />
                <i className="fa fa-envelope-o" aria-hidden="true" />
                <h6>{this.props.user.email}</h6>
                <hr />
                <i className="fa fa-music" aria-hidden="true" />
                <h6>{this.props.user.instruments}</h6>
                <hr />
                <i className="fa fa-headphones" aria-hidden="true" />
                <h6>{this.props.user.genres}</h6>
                <hr />
                <i className="fa fa-home" aria-hidden="true" />
                <h6>{this.props.user.residence}</h6>
              </div>
            </div>
            <div className="row">
              <button className="btn" onClick={this.edit}>
                Edit profile
              </button>
            </div>
          </div>
        )}
        {this.state.edit && (
          <div>
            <div className="user-edit">
              <Form onSubmit={this.handleSubmit}>
                <Input
                  type="text"
                  name="preferred_name"
                  id="name-input"
                  placeholder={this.props.user.preferred_name}
                  onChange={this.handleChange}
                />
                <hr />
                <Input
                  type="file"
                  name="file"
                  id="file-input"
                  onChange={this.handleFileChange}
                />
                <hr />
                <i className="fa fa-university" aria-hidden="true" />
                <Input
                  type="text"
                  name="programAndYear"
                  id="programAndYear-input"
                  placeholder={this.props.user.programAndYear}
                  onChange={this.handleChange}
                />
                <hr />
                <i className="fa fa-music" aria-hidden="true" />
                <Input
                  type="text"
                  name="instruments"
                  id="instruments-input"
                  placeholder={this.props.user.instruments}
                  onChange={this.handleChange}
                />
                <hr />
                <i className="fa fa-headphones" aria-hidden="true" />
                <Input
                  type="text"
                  name="genres"
                  id="genres-input"
                  placeholder={this.props.user.genres}
                  onChange={this.handleChange}
                />
                <hr />
                <i className="fa fa-home" aria-hidden="true" />
                <Input
                  type="text"
                  name="residence"
                  id="residence-input"
                  placeholder={this.props.user.residence}
                  onChange={this.handleChange}
                />
                <Loader
                  disabled={false}
                  type="submit"
                  isLoading={this.state.loading}
                  text="Finish"
                  loadingText="Updating up your account..."
                />
              </Form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const UserInfo = connect(mapStateToProps)(ConnectedUserInfo);

export default UserInfo;
