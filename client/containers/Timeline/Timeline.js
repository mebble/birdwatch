import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const staticChartOptions = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Tweet Engagement'
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            formatter: function() {
                return Math.abs(this.value);
            }
        },
        tickPositioner: function() {
            const maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
            const halfMaxDeviation = Math.ceil(maxDeviation / 2);
            return [-maxDeviation, -halfMaxDeviation, 0, halfMaxDeviation, maxDeviation];
        },
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    tooltip: {
        formatter: function() {
            return `${this.series.name}: ${Math.abs(this.y)}`;
        }
    },
};

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            chartOptions: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/getTweetEngagement')
            .then(res => res.json())
            .then(({ tweets, favourites, retweets }) => {
                const categories = tweets.map(({ id_str }) => id_str);
                this.setState({
                    dataLoaded: true,
                    chartOptions: {
                        ...staticChartOptions,
                        xAxis: [{
                            reversed: false,
                            categories: categories,
                        }, {  // mirror axis on the right side
                            opposite: true,
                            reversed: false,
                            linkedTo: 0,
                            categories: categories,
                        }],
                        series: [{
                            name: 'Retweets',
                            data: retweets.map(x => -Math.abs(x))
                        }, {
                            name: 'Favourites',
                            data: favourites
                        }]
                    },
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err
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
        const { dataLoaded, chartOptions } = this.state;
        if (!dataLoaded) return <div>Loading the data...</div>;
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        );
    }
}
