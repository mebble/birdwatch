import React, { Component } from 'react';

import Button from '../../components/Button';
import Row from '../../components/Row';
import SearchBar from '../../components/SearchBar';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };

        this.searchChange = this.searchChange.bind(this);
    }

    searchChange(event) {
        this.setState({
            value: event.target.value
        });
        // fetch('http://localhost:9000/getUserSearch')
        //     .then(res => res.json())
        //     .then(users => {
        //         this.setState({
        //             suggestions: users.map(u => u.screen_name)
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             suggestions: ['Network error']
        //         });
        //     });
    }

    render() {
        const { value, suggestions } = this.state;
        return (
            <Row>
                <SearchBar id="user-suggestions" value={value} suggestions={suggestions} onChange={this.searchChange} />
                <Button>Search</Button>
            </Row>
        );
    }
}
