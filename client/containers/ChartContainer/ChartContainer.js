import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleLog } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';

import fetchLambda from '../../services/fetchLambda';

import Row from '../../components/Row';
import Button from '../../components/Button';
import Chart from '../../components/Chart';
import { Init, Loading, Error } from '../../components/ChartPlaceholder/ChartPlaceholder';

const transDuration = 500;
const barHeight = 30;
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
            loadingMoreData: false,
            dataLoadErr: null,
            moreDataLoadErr: null,
            data: null,
        };
        this.fetchTweets = this.fetchTweets.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.chooseData = this.chooseData.bind(this);
        this.updateChartState = this.updateChartState.bind(this);
        this.onMoreClick = this.onMoreClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userQuery && prevProps.userQuery !== this.props.userQuery) {
            this.setState({
                loadingData: true,
                dataLoadErr: null
            }, () => {
                console.log('Loading data for', this.props.userQuery);
            });
            const tweetsPromise = this.fetchTweets(this.props.userQuery);
            const userInfoPromise = this.fetchUserInfo(this.props.userQuery);
            Promise.all([tweetsPromise, userInfoPromise])
                .then(([ { favourites, retweets, maxId }, user ]) => {
                    console.log('Got data for', this.props.userQuery);
                    this.props.setUser(user);
                    this.setState({
                        loadingData: false,
                        dataLoadErr: null,
                        data: {
                            favourites,
                            retweets,
                            maxId
                        }
                    });
                })
                .catch(err => {
                    this.setState({
                        loadingData: false,
                        dataLoadErr: err,
                        data: null,
                    }, () => {
                        this.props.clearUserAndQuery();
                    });
                });
        } else if (this.state.loadingMoreData) {
            const { user } = this.props;
            const { maxId } = this.state.data;
            console.log('Loading more data for', user.screenName);
            this.fetchTweets(user.screenName, maxId)
                .then(({ favourites, retweets, maxId }) => {
                    console.log('Got more data for', user.screenName);
                    this.setState(({ data }) => {
                        const { favourites: favCurrent, retweets: retCurrent } = data;
                        return {
                            loadingMoreData: false,
                            moreDataLoadErr: null,
                            data: {
                                favourites: [...favCurrent, ...favourites],
                                retweets: [...retCurrent, ...retweets],
                                maxId
                            },
                        };
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        loadingMoreData: false,
                        moreDataLoadErr: err
                    });
                });
        } else if (this.chart.current && !this.state.loadingData && !this.state.dataLoadErr) {
            this.updateChartState();
        }
    }

    fetchTweets(screenName, maxId) {
        let queryString = `q=${screenName}`;
        if (maxId) queryString += `&max_id=${maxId}`;

        return fetchLambda(`getTweetEngagement?${queryString}`);
    }

    fetchUserInfo(screenName) {
        return fetchLambda(`getUserInfo?q=${screenName}`);
    }

    chooseData() {
        const { favourites, retweets } = this.state.data;
        const { metric, withReplies, sorted, openTweet } = this.props;
        const metricData = {
            'favourites': favourites,
            'retweets': retweets
        }[metric];
        const chartData = withReplies
            ? metricData.slice()
            : metricData.filter(({ isReply }) => !isReply);
        if (sorted) {
            chartData.sort((a, b) => {
                return b.count - a.count;
            });
        }
        return chartData;
    }

    onMoreClick() {
        this.setState({
            loadingMoreData: true
        });
    }

    updateChartState() {
        const chartData = this.chooseData();
        const { openTweet, logScale } = this.props;
        const chartWidth = this.chart.current.parentNode.clientWidth - rightPadding;
        const scale = logScale
                ? scaleLog()
                : scaleLinear();
        const x = scale
            .clamp(true)  // the data's smallest value (0) will be clamped to 0.1
            .domain([0.1, max(chartData, d => d.count)])
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
            .classed('replyBar', d => d.isReply)
            .attr('x', labelWidth + 3)
            .attr('rx', 3)
            .on('click', function(d) {
                const tweetID = d.id_str.slice(1);  // remove 'r' or 'f' format
                openTweet(tweetID);
            })
            .attr('height', barHeight - 3)
            .transition()
            .duration(transDuration)
            .attr('width', d => x(d.count))
        barEnter.append('text')
            .attr('class', 'yValue')
            .attr('y', barHeight / 2)
            .attr('dy', '.25em')
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
        const { loadingData, loadingMoreData, dataLoadErr } = this.state;
        const { user } = this.props;

        if (loadingData) return <Loading />;
        if (dataLoadErr) return <Error error={dataLoadErr} />;
        if (user === null) return <Init />;
        return (
            <div className="ChartContainer w-full">
                <Chart ref={this.chart} />
                <Row>
                    {loadingMoreData
                        ? <Loading />
                        : <Button onClick={this.onMoreClick} disabled={loadingMoreData}>more</Button>}
                </Row>
            </div>
        );
    }
}
