import React, { Component } from 'react';

import "./Marketplace.css";

class Marketplace extends Component {
    constructor(props){
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render () {
        return (
            <div className="Marketplace">
                <userList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-user">
                        Marketplace, Enter names below:
                    </label>
                    <input
                        id="new-user"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add user #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault(); //so window does not reload
        if (!this.state.text.length) {
            return;
        }
        let newUser = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newUser),
            text: ''
        }));
    }
}

class userList extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

export default Marketplace;