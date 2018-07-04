import React, { Component } from 'react';
import "./Profile.css";

let signedIn = false;

let exampleUser = {
    'userInfo': {
        'name': 'Miles Davis',
        'email': 'milesdavis@milesdavis.com',
        'photoURL': 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/e/e8/Miles_Davis.jpeg/revision/latest?cb=20161003223700',
        'instruments': [
            'guitar',
            'piano'
        ],
        'looking': {
            'jams': true,
            'concerts': true,
            'performances': true,
            'band': true,
            'other': [
            ]
        },
        'genres': [
            'classical',
            'rock',
        ]
    },
    'activity': [
        'looking for someone to play Radiohead with',
        'had a great time at the Charlie Puth concert!'
    ],
    'preferences': {
        'profilePublic': true,
    }
}

class MakeAccount extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            text: '',
        };
    }

    render () {
        return (
            <div className="MakeAccount">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="instrument">
                        Instrument played:
                    </label>
                    <input
                        id="instrument"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Submit
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault(); //don't reload window
        if (!this.state.text.length) {
            return;
        }
        this.setState(() => ({
            instrument: this.state.text,
            text: '',
        }));
    }
}

class UserInfo extends Component {
    render () {
        return (
            <div className="row UserInfo">
                <div className="col col-2">
                    <img
                        id="profile-img"
                        src={this.props.user.userInfo.photoURL}
                        alt="profile"
                    />
                </div>
                <div className="col col-6">
                    <h4>Name: {this.props.user.userInfo.name}</h4>
                    <h4>Email: {this.props.user.userInfo.email}</h4>
                    <h4>
                        Instrument{this.props.user.userInfo.instruments.length > 1 ? "s" : ""} played: {this.props.user.userInfo.instruments.join(', ')}
                    </h4>
                    <h4>
                        You are looking for:
                        {this.props.user.userInfo.looking.jams && 'jams, '}
                        {this.props.user.userInfo.looking.concerts && 'concerts, '}
                        {this.props.user.userInfo.looking.performances && 'performances, '}
                        {this.props.user.userInfo.looking.bands && 'bands. '}
                        {this.props.user.userInfo.looking.other.length > 0 && this.props.user.userInfo.looking.other}
                    </h4>
                </div>
            </div>
        );
    }
}

class Profile extends Component {
    render () {
        return (
            <div className="Profile">
                {!signedIn && <MakeAccount />}
                {signedIn && <UserInfo user={exampleUser} />}
            </div>
        );
    }
}

export default Profile;