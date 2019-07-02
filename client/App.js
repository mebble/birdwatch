import React, { Component } from 'react';

import Timeline from './containers/Timeline';
import Search from './containers/Search';

import Button from './components/Button';
import Row from './components/Row';
import Toggle from './components/Toggle';
import Header from './components/Header';
import TweetModal from './components/TweetModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'favourites',
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
    }

    onFavourites() {
        this.setState({
            current: 'favourites'
        });
    };

    onRetweets() {
        this.setState({
            current: 'retweets'
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

    render() {
        console.log(Date.now());
        const { current, withReplies, tweet } = this.state;
        return (
            <>
                <TweetModal id={tweet.id} showModal={tweet.show} closeTweet={this.onCloseTweet} />
                <Header>
                    <Search />
                    <Row>
                        <Button onClick={this.onFavourites} disabled={current === 'favourites'}>favourites</Button>
                        <Button onClick={this.onRetweets} disabled={current === 'retweets'}>retweets</Button>
                        <Toggle onClick={this.onReplyToggle} isOn={withReplies}>replies</Toggle>
                    </Row>
                </Header>
                <Timeline current={current} withReplies={withReplies} openTweet={this.onOpenTweet} />
            </>
        );
    }
}

export default App;
