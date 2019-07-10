import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Button from '../../components/Button';
import Row from '../../components/Row';
import SearchBar from '../../components/SearchBar';

import fetchLambda from '../../services/fetchLambda';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };

        this.searchChange = this.searchChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.fetchSuggestions = debounce(function() {
            fetchLambda(`getUserSearch?q=${this.state.value}`)
                .then(users => {
                    this.setState({
                        suggestions: users
                    });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        suggestions: []
                    });
                });
        }.bind(this), 800);
    }

    searchChange(event) {
        const value = event.target.value[0] === '@'
            ? event.target.value.slice(1)
            : event.target.value;
        this.setState({ value }, () => {
            const { value } = this.state;
            if (value !== '') {
                this.fetchSuggestions();
            }
        });
    }

    searchSubmit(event) {
        event.preventDefault();
        const { search } = this.props;
        search(this.state.value);
    }

    render() {
        const { value, suggestions } = this.state;
        return (
            <form onSubmit={this.searchSubmit} className="p-0 m-0">
                <Row>
                    <SearchBar id="user-suggestions" value={value} dataList={suggestions} onChange={this.searchChange} />
                    <Button type="submit">Search</Button>
                </Row>
            </form>
        );
    }
}
