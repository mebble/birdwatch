import React, { Component } from 'react';
import debounce from 'lodash.debounce';

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
        this.fetchSuggestions = debounce(function() {
            console.log('fetching', this.state.value, Date.now())
            fetch(`http://localhost:9000/getUserSearch?q=${this.state.value}`)
                .then(res => res.json())
                .then(users => {
                    this.setState({
                        suggestions: users
                    });
                })
                .catch(err => {
                    this.setState({
                        suggestions: ['Network error']
                    });
                });
        }.bind(this), 800);
    }

    searchChange(event) {
        this.setState({
            value: event.target.value
        }, () => {
            const { value } = this.state;
            if (value !== '') {
                this.fetchSuggestions();
            }
        });
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
