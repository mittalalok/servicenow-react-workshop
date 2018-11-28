import React, { Component } from 'react';
import './app.sass';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { headerMessage: null };
    }

    componentDidMount() {
        fetch('/api/getHeader')
            .then(res => res.json())
            .then(res => this.setState({ headerMessage: res.message }));
    }

    render() {
        const { headerMessage } = this.state;
        return (
            <div>
                {headerMessage ? <h1>{`${headerMessage}`}</h1> : <h1>Welcome</h1>}
            </div>
        );
    }
}
