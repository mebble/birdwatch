import React, { Component } from 'react';
import { select, scaleLinear, max } from 'd3';

import './Timeline.css';

const exitDuration = 500;
const enterDuration = 500;
const barHeight = 20;
const chartWidth = 420;
const x = scaleLinear()
    .range([0, chartWidth]);

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.state = {
            dataLoaded: false,
            dataLoadErr: null,
            favourites: [],
            retweets: [],
        };

        this.updateChart = this.updateChart.bind(this);
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
        select(this.chart.current)
            .style('width', `${chartWidth}px`);
    }

    componentDidUpdate(prevProps, prevState) {
        const { favourites, retweets } = this.state;
        const { current, withReplies } = this.props;
        const data_ = {
            'favourites': favourites,
            'retweets': retweets
        }[current];
        const data = withReplies
            ? data_
            : data_.filter(({ in_reply_to_status_id_str }) => in_reply_to_status_id_str);
        this.updateChart(data);
    }

    updateChart(data) {
        x.domain([0, max(data, d => d.count)])
        const bars = select(this.chart.current)
            .style('height', `${barHeight * data.length}px`)
            .selectAll('div')
            .data(data, (d, i) => d.id_str);
        bars.enter()
            .append('div')
            .style('width', '0px')
            .transition()
            .delay(exitDuration)
            .duration(enterDuration)
            .style('width', d => `${x(d.count)}px`)
            .text(d => d.count)
        bars.exit()
            .transition()
            .duration(exitDuration)
            .style('width', '0px')
            .remove()
    }

    render() {
        const { dataLoaded, dataLoadErr } = this.state;

        if (dataLoadErr) return <div>Error loading the data!!</div>;
        if (!dataLoaded) return <div>Loading the data...</div>;
        return (
            <div ref={this.chart} className="Timeline"></div>
        );
    }
}
