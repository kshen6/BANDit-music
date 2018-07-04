import React, { Component } from 'react';

import "./Activity.css";

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <div className="name">
                {props.name}
            </div>
            <div className="number">
                {props.number}
            </div>
        </div>
    );
}

function Post(props) {
    return (
        <div className="Post">
            <UserInfo name="kendrick" number={1} />
        </div>
    );
}

class Activity extends Component {
    render () {
        return (
            <div className="Activity">
                <Post name="Kendrick" number={1} />
            </div>
        );
    }
}

export default Activity;