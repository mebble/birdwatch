import React, { Component } from 'react';

import Timeline from './containers/Timeline';
import Search from './containers/Search';

import Button from './components/Button';
import Row from './components/Row';
import Toggle from './components/Toggle';
import Header from './components/Header';
import TweetModal from './components/TweetModal';
import Body from './components/Body';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metric: 'favourites',
            currentUser: 'kathyra_',
            withReplies: true,
            tweet: {
                id: null,
                show: false,
            }
        };

        this.onFavourites = this.onFavourites.bind(this);
        this.onRetweets = this.onRetweets.bind(this);
        this.onReplyToggle = this.onReplyToggle.bind(this);
        this.onOpenTweet = this.onOpenTweet.bind(this);
        this.onCloseTweet = this.onCloseTweet.bind(this);
        this.onSearchUser = this.onSearchUser.bind(this);
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

    onSearchUser(screenName) {
        this.setState({
            currentUser: screenName
        });
    }

    render() {
        console.log(Date.now());
        const { metric, currentUser, withReplies, tweet } = this.state;
        return (
            <>
                <TweetModal id={tweet.id} showModal={tweet.show} closeTweet={this.onCloseTweet} />
                <Header>
                    <Search search={this.onSearchUser} />
                    <Row>
                        <Button onClick={this.onFavourites} disabled={metric === 'favourites'}>favourites</Button>
                        <Button onClick={this.onRetweets} disabled={metric === 'retweets'}>retweets</Button>
                        <Toggle onClick={this.onReplyToggle} isOn={withReplies}>replies</Toggle>
                    </Row>
                </Header>
                <Body>
                    <Timeline metric={metric} user={currentUser} withReplies={withReplies} openTweet={this.onOpenTweet} />
                </Body>
            </>
        );
    }
}

export default App;
