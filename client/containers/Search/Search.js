import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import { Button } from '../../components/Button';
import Row from '../../components/Row';
import SearchBar from '../../components/SearchBar';

import fetchLambda from '../../services/fetchLambda';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.userQuery || '',
            suggestions: []
        };

        this.searchChange = this.searchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

            if (!prevState.value.startsWith(value) && value.trim() !== '') {  // on non-backspace and white-space input
                const normVal = value.toLowerCase().trim();
                const matchFound = suggestions.some(({ name, screenName }) => {
                    const normName = name.toLowerCase();
                    const normScreenName = screenName.toLowerCase();
                    return normName.startsWith(normVal) || normScreenName.startsWith(normVal);
                });

                if (!matchFound) {
                    this.fetchSuggestions();
                }
            }
        }

        if (prevProps.userQuery !== this.props.userQuery) {
            this.setState({
                value: this.props.userQuery || ''
            });
        }
    }

    searchChange(event) {
        const value = event.target.value.startsWith('@')
            ? event.target.value.slice(1)
            : event.target.value;
        this.setState({ value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { value } = this.state;
        if (value !== this.props.userQuery) {
            this.props.search(value);
        }
    }

    render() {
        const { value, suggestions } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="p-0 m-0">
                <Row>
                    <SearchBar id="user-suggestions" value={value} dataList={suggestions} onChange={this.searchChange} />
                    <Button type="submit">search</Button>
                </Row>
            </form>
        );
    }
}
