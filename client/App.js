import React, { Component } from 'react';

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
            metric: 'favourites',
            logScale: false,
            userQuery: null,
            user: null,
            withReplies: true,
            sorted: false,
            tweet: {
                id: null,
                show: false,
            }
        };

        this.onFavourites = this.onFavourites.bind(this);
        this.onRetweets = this.onRetweets.bind(this);
        this.onReplyToggle = this.onReplyToggle.bind(this);
        this.onSortToggle = this.onSortToggle.bind(this);
        this.onLogToggle = this.onLogToggle.bind(this);
        this.onOpenTweet = this.onOpenTweet.bind(this);
        this.onCloseTweet = this.onCloseTweet.bind(this);
        this.setUserQuery = this.setUserQuery.bind(this);
        this.setUser = this.setUser.bind(this);
        this.clearUserAndQuery = this.clearUserAndQuery.bind(this);
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

    setUserQuery(userQuery) {
        this.setState({
            userQuery
        });
    }

    setUser(userObject) {
        this.setState({
            user: userObject
        });
    }

    clearUserAndQuery() {
        this.setState({
            userQuery: null,
            user: null
        });
    }

    render() {
        console.log(Date.now());
        const { metric, userQuery, user, withReplies, sorted, logScale, tweet } = this.state;
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
                    <ChartContainer metric={metric} userQuery={userQuery} user={user}
                        withReplies={withReplies} sorted={sorted} logScale={logScale}
                        openTweet={this.onOpenTweet} clearUserAndQuery={this.clearUserAndQuery} setUser={this.setUser}
                    />
                </Body>
            </div>
        );
    }
}

export default App;
