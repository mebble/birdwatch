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
            const query = this.state.value.trim();
            fetchLambda(`getUserSearch?q=${query}`)
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            const { value, suggestions } = this.state;

            if (!prevState.value.startsWith(value)) {  // on non-backspace input
                const matchFound = suggestions.some(({ name, screenName }) => {
                    return name.startsWith(value) || screenName.startsWith(value);
                });

                if (!matchFound) {
                    this.fetchSuggestions();
                }
            }
        }
    }

    searchChange(event) {
        const value = event.target.value.startsWith('@')
            ? event.target.value.slice(1)
            : event.target.value;
        this.setState({ value });
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
                    <Button type="submit">search</Button>
                </Row>
            </form>
        );
    }
}
