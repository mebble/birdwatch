import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleLog } from 'd3-scale';
import { max, min } from 'd3-array';
import 'd3-transition';

import Row from '../../components/Row';
import { Button } from '../../components/Button';
import Chart from '../../components/Chart';
import Loader from '../../components/Loader';
import { Greeting, Error } from '../../components/Info';

const transDuration = 500;
const barHeight = 30;
const labelWidth = 0;
const yValueRightPad = 5;
const minValue = 35;
const rightPadding = 10;

export default class extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.chooseData = this.chooseData.bind(this);
        this.updateChartState = this.updateChartState.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.chart.current && !this.props.loadingData && !this.props.dataLoadErr) {
            this.updateChartState();
        }
    }

    chooseData() {
        const { favourites, retweets } = this.props.data;
        const { metric, withReplies, sorted } = this.props;
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

    updateChartState() {
        const chartData = this.chooseData();
        const { openTweet, logScale } = this.props;
        const chartWidth = this.chart.current.parentNode.clientWidth;
        const scale = logScale
                ? scaleLog()
                : scaleLinear();
        const x = scale
            .clamp(true)  // the data's smallest value (0) will be clamped to 0.1
            .domain([0.1 + min(chartData, d => d.count), max(chartData, d => d.count)])
            .range([minValue, chartWidth - rightPadding]);

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
            .attr('class', 'yValue pointer-events-none')
            .attr('y', barHeight / 2)
            .attr('dy', '.25em')
            .transition()
            .duration(transDuration)
            .attr('x', d => labelWidth + x(d.count) - yValueRightPad)
            .text(d => d.count_str);

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
        const { data, loadingData, loadingMoreData, errData } = this.props;

        if (loadingData) return <Loader />;
        if (errData) return <Error error={errData} />;
        if (data === null) return <Greeting />;
        return (
            <div className="ChartContainer w-full">
                <Chart ref={this.chart} />
                <Row>
                    {loadingMoreData
                        ? <Loader />
                        : <Button onClick={this.props.moreData} disabled={loadingMoreData}>more</Button>}
                </Row>
            </div>
        );
    }
}
