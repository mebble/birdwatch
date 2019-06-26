import React, { Component } from 'react';
import { select, scaleLinear, max } from 'd3';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            dataLoadErr: null,
            favourites: [],
            retweets: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/getTweetEngagement')
            .then(res => res.json())
            .then(({ favourites, retweets }) => {
                this.setState({
                    dataLoaded: true,
                    favourites,
                    retweets
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    dataLoadErr: err
                })
            });
    }

    render() {
        const { dataLoaded, dataLoadErr } = this.state;
        const { favourites, retweets } = this.state;
        const { current, withReplies } = this.props;

        if (dataLoadErr) return <div>Error loading the data!!</div>;
        if (!dataLoaded) return <div>Loading the data...</div>;
        return (
            <div className="chart"></div>
        );
    }
}
