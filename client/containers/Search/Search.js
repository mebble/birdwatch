import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Button from '../../components/Button';
import Row from '../../components/Row';
import SearchBar from '../../components/SearchBar';

const usersToDataList = (users) => {
    return users.map(({ name, screen_name }) => {
        return {
            value: screen_name,
            label: name
        };
    });
};

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
            fetch(`http://192.168.2.29:9000/getUserSearch?q=${this.state.value}`)
                .then(res => res.json())
                .then(users => {
                    this.setState({
                        suggestions: usersToDataList(users)
                    });
                })
                .catch(err => {
                    this.setState({
                        suggestions: [{
                            value: 'Error',
                            label: 'Network error'
                        }]
                    });
                });
        }.bind(this), 800);
    }

    searchChange(event) {
        const value = event.target.value.startsWith('@')
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
            <form onSubmit={this.searchSubmit}>
                <Row>
                    <SearchBar id="user-suggestions" value={value} dataList={suggestions} onChange={this.searchChange} />
                    <Button type="submit">Search</Button>
                </Row>
            </form>
        );
    }
}
