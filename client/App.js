import React, { Component } from 'react';

import Timeline from './containers/Timeline';
import Button from './components/Button';
import Header from './components/Header';
import Checkbox from './components/Checkbox';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'favourites',
            withReplies: true
        };

        this.onFavourites = this.onFavourites.bind(this);
        this.onRetweets = this.onRetweets.bind(this);
        this.onReplyToggle = this.onReplyToggle.bind(this);
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

    render() {
        console.log(Date.now());
        const { current, withReplies } = this.state;
        return (
            <>
                <Header>
                    <Button onClick={this.onFavourites} disabled={current === 'favourites'}>Favourites</Button>
                    <Button onClick={this.onRetweets} disabled={current === 'retweets'}>Retweets</Button>
                    <Checkbox onChange={this.onReplyToggle} checked={withReplies}>With replies</Checkbox>
                </Header>
                <Timeline current={current} withReplies={withReplies} />
            </>
        );
    }
}

export default App;
