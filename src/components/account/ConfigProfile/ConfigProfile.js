import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from 'reactstrap';
import Loader from '../../ui/Loader/Loader';
import Banditspan from '../../ui/Banditspan/Banditspan';
import { s3Upload } from '../../../libs/awsLib';
import './ConfigProfile.css';

import { API } from 'aws-amplify';

class ConfigProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dropGenre: false,
      preferred_name: '',
      programAndYear: '',
      residence: '',
      dropInstrument: false,
      uniqueGenre: '',
      uniqueInstrument: '',
      genres: [],
      instruments: []
    };
    this.toggleGenre = this.toggleGenre.bind(this);
    this.toggleInstrument = this.toggleInstrument.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImage = async e => {
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
        preferred_name: 'kendrick shen'
      });
      this.setState({
        loading: false
      });
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  toggleGenre() {
    this.setState(prevState => ({
      dropGenre: !prevState.dropGenre
    }));
  }

  toggleInstrument() {
    this.setState(prevState => ({
      dropInstrument: !prevState.dropInstrument
    }));
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

    try {
      await this.configUser({
        preferred_name: this.state.preferred_name,
        programAndYear: this.state.programAndYear,
        residence: this.state.residence,
        genres: this.state.genres,
        instruments: this.state.instruments
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

  configUser(user) {
    return API.post('userapi', '/banditusers', {
      body: user
    });
  }

  handleGenre(genre) {
    this.setState(prevState => ({
      genres: [...prevState.genres, genre]
    }));
  }

  handleInstrument(instrument) {
    this.setState(prevState => ({
      instruments: [...prevState.instruments, instrument]
    }));
  }

  validate() {
    return (
      this.state.preferred_name.length &&
      this.state.genres.length &&
      this.state.instruments.length &&
      this.state.programAndYear.length &&
      this.state.residence.length
    );
  }

  render() {
    return (
      <div>
        <Form className="configProfile" onSubmit={this.handleSubmit}>
          <h4>Please set up your profile</h4>
          <h6>
            Just a few preferences, so you can get to connecting right away.
          </h6>
          <FormGroup row>
            <Label htmlFor="preferred_name" sm={1}>
              Preferred name:
            </Label>
            <Col md={6}>
              <Input
                type="text"
                name="preferred_name"
                id="preferred_name-input"
                placeholder="Your name here..."
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="programAndYear" sm={1}>
              Program and year:
            </Label>
            <Col md={6}>
              <Input
                type="text"
                name="programAndYear"
                id="program-input"
                placeholder="e.g. B.A. in music, 2019"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="residence" sm={1}>
              Residence:
            </Label>
            <Col md={6}>
              <Input
                type="text"
                name="residence"
                id="residence-input"
                placeholder="or off-campus"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="genre" sm={1}>
              Music Interests:
            </Label>
            <Col md={6}>
              <Dropdown isOpen={this.state.dropGenre} toggle={this.toggleGenre}>
                <DropdownToggle id="b-d-toggle" caret>
                  Select one or more
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={e => this.handleGenre('Rock', e)}>
                    Rock
                  </DropdownItem>
                  <DropdownItem onClick={e => this.handleGenre('Indie', e)}>
                    Indie
                  </DropdownItem>
                  <DropdownItem onClick={e => this.handleGenre('Jazz', e)}>
                    Jazz
                  </DropdownItem>
                  <DropdownItem onClick={e => this.handleGenre('Classical', e)}>
                    Classical
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => this.handleGenre('Electronic', e)}
                  >
                    Electronic
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Input
                type="text"
                name="uniqueGenre"
                id="uniqueGenre-input"
                placeholder="enter another..."
                onChange={this.handleChange}
              />
              <Button
                id="unique"
                onClick={e =>
                  this.state.uniqueGenre.length
                    ? this.handleGenre(this.state.uniqueGenre, e)
                    : null
                }
              >
                Add
              </Button>
              <div>
                {this.state.genres.map(genre => (
                  <Banditspan key={genre.id} text={genre} />
                ))}
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="instruments" sm={1}>
              Instrument(s), if any:
            </Label>
            <Col md={6}>
              <Dropdown
                isOpen={this.state.dropInstrument}
                toggle={this.toggleInstrument}
              >
                <DropdownToggle id="b-d-toggle" caret>
                  Select one or more
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={e => this.handleInstrument('Guitar', e)}
                  >
                    Guitar
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => this.handleInstrument('Piano', e)}
                  >
                    Piano
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => this.handleInstrument('Computer music', e)}
                  >
                    Computer music
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => this.handleInstrument('Trumpet', e)}
                  >
                    Trumpet
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => this.handleInstrument('Drums', e)}
                  >
                    Drums
                  </DropdownItem>
                  <DropdownItem onClick={e => this.handleInstrument('Bass', e)}>
                    Bass
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Input
                type="text"
                name="uniqueInstrument"
                id="uniqueInstrument-input"
                placeholder="enter another..."
                onChange={this.handleChange}
              />
              <Button
                id="unique"
                onClick={e =>
                  this.state.uniqueInstrument.length
                    ? this.handleInstrument(this.state.uniqueInstrument, e)
                    : null
                }
              >
                Add
              </Button>
              <div>
                {this.state.instruments.map(instrument => (
                  <Banditspan key={instrument.id} text={instrument} />
                ))}
              </div>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col md={{ offset: 2 }}>
              <Loader
                disabled={!this.validate()}
                type="submit"
                isLoading={this.state.loading}
                text="Finish"
                loadingText="Setting up your account..."
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ConfigProfile;
