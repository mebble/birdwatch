import React, { Component } from 'react';
// import * as d3 from 'd3';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            dataLoadErr: null,
            tweets: [],
            favourites: [],
            retweets: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/getTweetEngagement')
            .then(res => res.json())
            .then(({ tweets, favourites, retweets }) => {
                const categories = tweets.map(({ id_str }) => id_str);
                this.setState({
                    dataLoaded: true,
                    tweets,
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

    // componentDidUpdate(prevProps, prevState) {
    //     this.setState({
    //         chartOptions: {
    //             series: []
    //         }
    //     });
    // }

    render() {
        const { dataLoaded, dataLoadErr } = this.state;
        const { tweets, favourites, retweets } = this.state;
        if (dataLoadErr) return <div>Error loading the data!!</div>;
        if (!dataLoaded) return <div>Loading the data...</div>;
        return (
            <div style={{display: 'flex'}}>
                <ul>{tweets.map((t, i) => <li key={i}>{t.full_text}</li>)}</ul>
                <ul>{favourites.map((f, i) => <li key={i}>{f}</li>)}</ul>
                <ul>{retweets.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
        );
    }
}
