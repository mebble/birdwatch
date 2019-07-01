import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';

import './Timeline.css';

const transDuration = 500;
const barHeight = 20;

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
            : data_.filter(({ in_reply_to_status_id_str }) => in_reply_to_status_id_str === null);
        this.updateChart(data, this.props.openTweet);
    }

    updateChart(data, openTweet) {
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
