import React, { Component } from 'react';

import { fetchData, fetchTweets } from './services/fetchLambda';
import parseQueryString from './services/parseQueryString';

import ChartContainer from './containers/ChartContainer';
import Search from './containers/Search';

import Row from './components/Row';
import Toggle from './components/Toggle';
import Switch from './components/Switch';
import HeaderCard from './components/HeaderCard';
import TweetModal from './components/TweetModal';
import Body from './components/Body';
import UserCard from './components/UserCard';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user
            userQuery: null,
            user: null,

            // params
            metric: 'favourites',
            logScale: false,
            withReplies: true,
            sorted: false,

            // tweet
            tweet: {
                id: null,
                show: false,
            },

            // data
            data: null,
            loadingData: false,
            loadingMoreData: false,
            errData: null,
            errMoreData: null
        };

        this.onFavourites = this.onFavourites.bind(this);
        this.onRetweets = this.onRetweets.bind(this);
        this.onReplyToggle = this.onReplyToggle.bind(this);
        this.onSortToggle = this.onSortToggle.bind(this);
        this.onLogToggle = this.onLogToggle.bind(this);
        this.onOpenTweet = this.onOpenTweet.bind(this);
        this.onCloseTweet = this.onCloseTweet.bind(this);
        this.setUserQuery = this.setUserQuery.bind(this);
        this.onMoreData = this.onMoreData.bind(this);
    }

    componentDidMount() {
        const { userQuery } = parseQueryString(window.location.search);
        if (userQuery) {
            this.setState({
                loadingData: true,
                errData: null
            }, () => {
                console.log('Loading data for', userQuery);
                fetchData(userQuery)
                    .then(([initData, user]) => {
                        console.log('Got data for', userQuery);
                        this.setState({
                            data: initData,
                            user,
                            loadingData: false,
                            errData: null,
                        });
                    })
                    .catch(err => {
                        this.setState({
                            loadingData: false,
                            errData: err
                        });
                    });
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.userQuery && prevState.userQuery !== this.state.userQuery) {
            console.log('User query changed', Date.now())
            this.setState({
                loadingData: true,
                errData: null
            }, () => {
                console.log('Loading data for', this.state.userQuery);
                fetchData(this.state.userQuery)
                    .then(([{ favourites, retweets, maxId }, user]) => {
                        console.log('Got data for', this.state.userQuery);
                        this.setState({
                            loadingData: false,
                            errData: null,
                            user: user,
                            data: {
                                favourites,
                                retweets,
                                maxId
                            }
                        });
                    })
                    .catch(err => {
                        this.setState({
                            user: null,
                            userQuery: null,
                            data: null,
                            loadingData: false,
                            errData: err,
                        });
                    });
            });
        }
    }

    onFavourites() {
        this.setState({
            metric: 'favourites'
        });
    };

    onRetweets() {
        this.setState({
            metric: 'retweets'
        });
    }

    onReplyToggle() {
        this.setState(({ withReplies }) => {
            return { withReplies: !withReplies };
        });
    }

    onSortToggle() {
        this.setState(({ sorted }) => {
            return { sorted: !sorted };
        });
    }

    onLogToggle() {
        this.setState(({ logScale }) => {
            return { logScale: !logScale }
        });
    }

    onOpenTweet(tweetID) {
        this.setState({
            tweet: {
                id: tweetID,
                show: true
            }
        });
    }

    onCloseTweet(event) {
        this.setState({
            tweet: {
                id: null,
                show: false
            }
        });
    }

    onMoreData() {
        const { user, data: { maxId } } = this.state;
        this.setState({
            loadingMoreData: true,
            errMoreData: null,
        }, () => {
            console.log('Loading more data for', user.screenName);
            fetchTweets(user.screenName, maxId)
                .then(({ favourites, retweets, maxId }) => {
                    console.log('Got more data for', user.screenName);
                    this.setState(({ data }) => {
                        const { favourites: favCurrent, retweets: retCurrent } = data;
                        return {
                            loadingMoreData: false,
                            errMoreData: null,
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
                        errMoreData: err
                    });
                });
        });
    }

    setUserQuery(userQuery) {
        this.setState({
            userQuery
        });
    }

    render() {
        console.log(Date.now());
        const {
            user,
            tweet,
            data,
            metric, withReplies, sorted, logScale,
            loadingData, loadingMoreData, errData, errMoreData
        } = this.state;
        return (
            <div className="App flex flex-col min-h-screen">
                <TweetModal id={tweet.id} showModal={tweet.show} closeTweet={this.onCloseTweet} />
                <HeaderCard>
                    <Search search={this.setUserQuery} />
                    {user
                        ? (<Row>
                                <UserCard {...user} />
                           </Row>)
                        : null}
                </HeaderCard>
                <HeaderCard isSticky={true}>
                    <Row>
                        <Switch current={metric} onLeftClick={this.onFavourites} onRightClick={this.onRetweets} />
                    </Row>
                    <Row>
                        <Toggle onClick={this.onReplyToggle} isOn={withReplies}>replies</Toggle>
                        <Toggle onClick={this.onSortToggle} isOn={sorted}>sorted</Toggle>
                        <Toggle onClick={this.onLogToggle} isOn={logScale}>log scale</Toggle>
                    </Row>
                </HeaderCard>
                <Body>
                    <ChartContainer
                        data={data}
                        metric={metric} withReplies={withReplies} sorted={sorted} logScale={logScale}
                        loadingData={loadingData} loadingMoreData={loadingMoreData}
                        errData={errData} errMoreData={errMoreData}
                        openTweet={this.onOpenTweet} moreData={this.onMoreData}
                    />
                </Body>
            </div>
        );
    }
}

export default App;
