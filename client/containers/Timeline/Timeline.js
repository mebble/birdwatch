import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {
                chart: {
                    type: 'bar'
                },

                title: {
                    text: 'Tweet Engagement'
                },

                xAxis: [{
                    reversed: false
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    linkedTo: 0
                }],

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
                    formatter: function () {
                        return `${this.series.name}: ${Math.abs(this.y)}`;
                    }
                },
            }
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/foo')
            .then(res => res.json())
            .then(tweets => {
                tweets = tweets.reverse();
                console.log(tweets);
                const favourites = tweets.map(t => ({
                    // x: t.id_str,
                    y: t.favorite_count
                }));
                const retweets = tweets.map(t => ({
                    // x: t.id_str,
                    y: -t.retweet_count
                }));
                const categories = tweets.map(({ id_str }) => id_str);
                console.log(favourites);
                console.log(retweets);
                this.setState({
                    chartOptions: {
                        xAxis: [{
                            categories: categories,
                        }, {
                            categories: categories,
                        }],
                        series: [{
                            name: 'Retweets',
                            data: retweets
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
        const { chartOptions } = this.state;
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        );
    }
}
