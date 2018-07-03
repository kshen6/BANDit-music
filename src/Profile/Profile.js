import React, { Component } from 'react';

import "./Profile.css";

function getComp () {
    if (0) {
        return (
            <div>
                <form>
                    <label htmlFor="username">username:</label>
                    <textarea id="username"></textarea>
                </form>
            </div>
        );
    }
    return (
        <div>
            <h2>Name:</h2>
            <h3>username:</h3>
        </div>
    );
}

class Profile extends Component {
    render () {
        return (
            <div className="Profile">
                {getComp()}
            </div>
        );
    }
}

export default Profile;