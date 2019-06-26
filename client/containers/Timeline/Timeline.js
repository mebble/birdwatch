import React, { Component } from 'react';
import { select, scaleLinear, max } from 'd3';

import './Timeline.css';

const exitDuration = 500;
const enterDuration = 500;
const barHeight = 20;
const chartWidth = 420;
const x = scaleLinear()
    .range([10, chartWidth]);

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
                .attr('height', barHeight * data.length)
            .selectAll('g')
                .data(data, (d, i) => d.id_str)
                .attr('transform', (d, i) => `translate(0, ${i * barHeight})`)
        const foo = bars.enter()
            .append('g')
                .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
        foo.append('rect')
            .attr('width', d => x(d.count))
            .attr("height", barHeight - 1);
        foo.append('text')
            .attr('x', d => x(d.count) - 3)
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(d => d.count);
        bars.exit()
            .remove()

        /* ************
        x.domain([0, d3.max(data, function (d) { return d.value; })]);

        chart.attr("height", barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", function (d) { return x(d.value); })
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function (d) { return x(d.value) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d) { return d.value; });
        */

        // x.domain([0, max(data, d => d.count)])
        // const bars = select(this.chart.current)
        //     .style('height', `${barHeight * data.length}px`)
        //     .selectAll('div')
        //     .data(data, (d, i) => d.id_str);
        // bars.enter()
        //     .append('div')
        //     .style('width', '0px')
        //     .transition()
        //     .delay(exitDuration)
        //     .duration(enterDuration)
        //     .style('width', d => `${x(d.count)}px`)
        //     .text(d => d.count)
        // bars.exit()
        //     .transition()
        //     .duration(exitDuration)
        //     .style('width', '0px')
        //     .remove()
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
