import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/foo')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    loaded: true
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err
                })
            });
    }

    render() {
        const { loaded, error } = this.state;
        if (error) return <div>Error!</div>;
        if (loaded) return <div>Loaded!</div>;
        return <div>Loading...</div>;
    }
}

export default App;
