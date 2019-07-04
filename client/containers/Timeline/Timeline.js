import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';

import './Timeline.css';

const transDuration = 500;
const barHeight = 20;

export default class extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.state = {
            dataLoaded: false,
            dataLoadErr: null,
            favourites: [],
            retweets: [],
        };
        this.fetchUserData = this.fetchUserData.bind(this);
        this.updateChartState = this.updateChartState.bind(this);
    }

    componentDidMount() {
        this.fetchUserData(this.props.user)
            .then(({ favourites, retweets }) => {
                console.log('Got data for', this.props.user, Date.now());
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                dataLoaded: false,
                dataLoadErr: null
            }, () => {
                console.log('Loading data for', this.props.user);
            });
            this.fetchUserData(this.props.user)
                .then(({ favourites, retweets }) => {
                    console.log('Got data for', this.props.user);
                    this.setState({
                        dataLoaded: true,
                        dataLoadErr: null,
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
        } else if (this.state.dataLoaded && !this.state.dataLoadErr) {
            this.updateChartState();
        }
    }

    fetchUserData(screenName) {
        return fetch(`http://192.168.2.29:9000/getTweetEngagement?q=${screenName}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Error occurred');
            });
    }

    updateChartState() {
        const { favourites, retweets } = this.state;
        const { metric, withReplies, openTweet } = this.props;
        const data_ = {
            'favourites': favourites,
            'retweets': retweets
        }[metric];
        const data = withReplies
            ? data_
            : data_.filter(({ in_reply_to_status_id_str }) => in_reply_to_status_id_str === null);

        const chartWidth = this.chart.current.parentNode.clientWidth - 20;
        const x = scaleLinear()
            .domain([0, max(data, d => d.count)])
            .range([20, chartWidth]);

        const bar = select(this.chart.current)
            .attr('height', barHeight * data.length)
            .attr('width', chartWidth)  // move out if possible, since it stays constant
            .selectAll('g')
            .data(data, (d, i) => d.id_str);

        const barUpdate = bar
            .transition()
            .duration(transDuration)
            .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
        barUpdate.select('rect')
            .transition()
            .duration(transDuration)
            .attr('width', d => x(d.count));
        barUpdate.select('text')
            .transition()
            .duration(transDuration)
            .attr('x', d => x(d.count) - 3);

        const barEnter = bar.enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
        barEnter.append('rect')
            .on('click', function(d) {
                const tweetID = d.id_str.slice(1);  // remove 'r' or 'f' format
                // const tweetID = '1142465239474196480';
                openTweet(tweetID);
            })
            .transition()
            .duration(transDuration)
            .attr('width', d => x(d.count))
            .attr('height', barHeight - 1)
        barEnter.append('text')
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .transition()
            .duration(transDuration)
            .attr('x', d => x(d.count) - 3)
            .text(d => d.count);

        const barExit = bar.exit()
        barExit
            .transition()
            .delay(transDuration)  // delay the 'remove' to allow transition-out effect before remove
            .remove();
        barExit.select('rect')
            .transition()
            .duration(transDuration)
            .attr('width', 0)
            .remove();
        barExit.select('text')
            .transition()
            .duration(transDuration)
            .attr('x', 0 - 3)
            .remove();
    }

    render() {
        const { dataLoaded, dataLoadErr } = this.state;

        if (dataLoadErr) return <div>Error loading the data!!</div>;
        if (!dataLoaded) return <div>Loading the data...</div>;
        return (
            <svg ref={this.chart} className="Timeline"></svg>
        );
    }
}
