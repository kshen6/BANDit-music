import React, { Component } from "react";
import {
    NavLink,
    HashRouter
} from "react-router-dom";

import logo from './../img/bandit-logo.png';
import "./Home.css";

class Home extends Component {
    render () {
        return (
            <HashRouter>
                <div className="Home">
                    <div id="welcome" className="container-fluid">
                        <NavLink exact to="/">
                            <img src={logo} className="App-logo" alt="logo" />
                        </NavLink>
                        <h1>Welcome to Stanford BANDit!</h1>
                        <h3>An initiative to make awesome-sounding music.</h3>
                        <h3>A Kendrick and Tyler Production</h3>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <NavLink exact to="/">
                                    <h2>I'm just jammin'</h2>
                                </NavLink>
                            </div>
                            <div className="col">
                                <NavLink exact to="/Account">
                                    <h2>Create Account</h2>
                                </NavLink>
                            </div>
                            <div className="col">
                                <NavLink to="/About">
                                    <h2>About</h2>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Home;