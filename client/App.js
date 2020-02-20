import React, { Component } from 'react';

import { fetchData, fetchTweets } from './services/fetchLambda';
import { updateWindowHistory, diffAppHistory } from './services/windowHistory';
import { copyToClipboard } from './services/clipboard';

import ChartContainer from './containers/ChartContainer';
import Search from './containers/Search';

import Row from './components/Row';
import Toggle from './components/Toggle';
import Switch from './components/Switch';
import HeaderCard from './components/HeaderCard';
import Toast from './components/Toast';
import TweetModal from './components/TweetModal';
import InfoModal from './components/InfoModal';
import Body from './components/Body';
import UserCard from './components/UserCard';
import { IconButton } from './components/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user
            userQuery: props.init.userQuery,
            user: null,

            // params
            metric: props.init.metric,
            logScale: props.init.logScale,
            withReplies: props.init.withReplies,
            sorted: props.init.sorted,

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
            errMoreData: null,

            // history
            isRestore: false,  // whether the current app state was restored from history

            // misc
            toastText: null,
            showInfo: false,
        };

        this.onFavourites = this.onFavourites.bind(this);
        this.onRetweets = this.onRetweets.bind(this);
        this.onReplyToggle = this.onReplyToggle.bind(this);
        this.onSortToggle = this.onSortToggle.bind(this);
        this.onLogToggle = this.onLogToggle.bind(this);
        this.onOpenTweet = this.onOpenTweet.bind(this);
        this.onCloseTweet = this.onCloseTweet.bind(this);
        this.onOpenInfo = this.onOpenInfo.bind(this);
        this.onCloseInfo = this.onCloseInfo.bind(this);
        this.onNewQuery = this.onNewQuery.bind(this);
        this.onMoreData = this.onMoreData.bind(this);
        this.onPermalink = this.onPermalink.bind(this);
    }

    componentDidMount() {
        const { userQuery } = this.state;
        updateWindowHistory(this.state, 'replace');
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

        window.addEventListener('popstate', () => {
            console.log('popstate!', Date.now())
            if (window.history.state) {
                const { userQuery, metric, withReplies, sorted, logScale } = window.history.state;
                this.setState({
                    userQuery,
                    metric,
                    withReplies,
                    sorted,
                    logScale,
                    isRestore: true,
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const queryChanged = prevState.userQuery !== this.state.userQuery;
        const queryChangedToValid = queryChanged && this.state.userQuery;
        const queryChangedToNull = queryChanged && this.state.userQuery === null;

        if (queryChangedToValid) {
            console.log('User query changed', Date.now());
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
                            data: null,
                            loadingData: false,
                            errData: err,
                        });
                    });
            });
        }

        if (queryChangedToValid && !this.state.isRestore) {
            updateWindowHistory(this.state, 'push');
        }

        if (queryChangedToNull) {
            this.setState({
                user: null,
                data: null,
                errData: null,
            });
        }

        if (prevState.toastText === null && this.state.toastText) {
            setTimeout(() => {
                this.setState({
                    toastText: null
                });
            }, 2500);
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

    onCloseTweet() {
        this.setState({
            tweet: {
                id: null,
                show: false
            }
        });
    }

    onOpenInfo() {
        this.setState({
            showInfo: true
        });
    }

    onCloseInfo() {
        this.setState({
            showInfo: false
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

    onNewQuery(userQuery) {
        this.setState({
            userQuery,
            isRestore: false
        });
    }

    onPermalink() {
        if (diffAppHistory(this.state)) {
            updateWindowHistory(this.state, 'push');
        }
        copyToClipboard(window.location.href)
            .then(() => {
                this.setState({
                    toastText: 'app state copied'
                });
            })
            .catch(() => {
                this.setState({
                    toastText: 'an error occurred while copying the app state'
                });
            });
    }

    render() {
        console.log(Date.now());
        const {
            user, userQuery,
            tweet,
            data,
            metric, withReplies, sorted, logScale,
            loadingData, loadingMoreData, errData, errMoreData,
            toastText, showInfo
        } = this.state;
        return (
            <div className="App flex flex-col min-h-screen">
                <TweetModal id={tweet.id} showModal={tweet.show} closeTweet={this.onCloseTweet} />
                <InfoModal showInfo={showInfo} closeInfo={this.onCloseInfo} />
                <Toast text={toastText} />
                <HeaderCard>
                    <Search userQuery={userQuery} search={this.onNewQuery} />
                    {user
                        ? (<Row>
                                <UserCard {...user} />
                           </Row>)
                        : null}
                </HeaderCard>
                <HeaderCard isSticky={true}>
                    <Row>
                        <IconButton iconName="permalink" onClick={this.onPermalink} />
                        <Switch current={metric} onLeftClick={this.onFavourites} onRightClick={this.onRetweets} />
                        <IconButton iconName="question" onClick={this.onOpenInfo} />
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
