import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';

import Row from '../../components/Row';
import Button from '../../components/Button';

import './Timeline.css';

const transDuration = 500;
const barHeight = 25;
const labelWidth = 0;
const yValueRightPad = 10;
const minValue = 30;
const rightPadding = 10;

export default class extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.state = {
            loadingData: false,
            dataLoadErr: null,
            data: {
                favourites: [],
                retweets: []
            },
        };
        this.fetchUserData = this.fetchUserData.bind(this);
        this.chooseData = this.chooseData.bind(this);
        this.updateChartState = this.updateChartState.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                loadingData: true,
                dataLoadErr: null
            }, () => {
                console.log('Loading data for', this.props.user);
            });
            this.fetchUserData(this.props.user)
                .then(({ favourites, retweets }) => {
                    console.log('Got data for', this.props.user);
                    this.setState({
                        loadingData: false,
                        dataLoadErr: null,
                        data: {
                            favourites,
                            retweets
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        dataLoadErr: err
                    })
                });
        } else if (!this.state.loadingData && !this.state.dataLoadErr) {
            this.updateChartState();
        }
    }

    fetchUserData(screenName, max_id) {
        let queryString = `q=${screenName}`;
        if (max_id) queryString += `&max_id=${max_id}`;

        return fetch(`http://192.168.2.29:9000/getTweetEngagement?${queryString}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject({ message: res.statusText, statusCode: res.status });
            });
    }

    chooseData() {
        const { favourites, retweets } = this.state.data;
        const { metric, withReplies, openTweet } = this.props;
        const metricData = {
            'favourites': favourites,
            'retweets': retweets
        }[metric];
        const chartData = withReplies
            ? metricData
            : metricData.filter(({ in_reply_to_status_id_str }) => in_reply_to_status_id_str === null);
        return chartData;
    }

    updateChartState() {
        const chartData = this.chooseData();
        const { openTweet } = this.props;
        const chartWidth = this.chart.current.parentNode.clientWidth - rightPadding;
        const x = scaleLinear()
            .domain([0, max(chartData, d => d.count)])
            .range([minValue, chartWidth]);

        const bars = select(this.chart.current)
            .attr('height', barHeight * chartData.length)
            .attr('width', chartWidth)  // move out if possible, since it stays constant
            .selectAll('g')
            .data(chartData, (d, i) => d.id_str);

        const barUpdate = bars
            .transition()
            .duration(transDuration)
            .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
        barUpdate.select('.bar')
            .transition()
            .duration(transDuration)
            .attr('width', d => x(d.count));
        barUpdate.select('.yValue')
            .transition()
            .duration(transDuration)
            .attr('x', d => labelWidth + x(d.count) - yValueRightPad);

        const barEnter = bars.enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
        barEnter.append('rect')
            .attr('class', 'bar')
            .attr('x', labelWidth + 3)
            .on('click', function(d) {
                const tweetID = d.id_str.slice(1);  // remove 'r' or 'f' format
                openTweet(tweetID);
            })
            .attr('height', barHeight - 1)
            .transition()
            .duration(transDuration)
            .attr('width', d => x(d.count))
        barEnter.append('text')
            .attr('class', 'yValue')
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .transition()
            .duration(transDuration)
            .attr('x', d => labelWidth + x(d.count) - yValueRightPad)
            .text(d => d.count);

        const barExit = bars.exit()
        barExit
            .transition()
            .delay(transDuration)  // delay the 'remove' to allow transition-out effect before remove
            .remove();
        barExit.select('.bar')
            .transition()
            .duration(transDuration)
            .attr('width', 0);
        barExit.select('.yValue')
            .transition()
            .duration(transDuration)
            .attr('x', 0 - 3);
    }

    render() {
        const { loadingData, dataLoadErr } = this.state;
        const { user } = this.props;

        if (dataLoadErr) return <div>Error loading the data!!</div>;
        if (user === null) return <div>Enter a twitter username...</div>;
        if (loadingData) return <div>Loading the data...</div>;
        return (
            <div>
                <svg ref={this.chart} className="Timeline"></svg>
                <Row>
                    <Button >more</Button>
                </Row>
            </div>
        );
    }
}
