import React, { Component } from 'react';

import Timeline from './containers/Timeline';

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
                <button onClick={this.onFavourites} disabled={current === 'favourites'}>Favourites</button>
                <button onClick={this.onRetweets} disabled={current === 'retweets'}>Retweets</button>
                <label>
                    <input onChange={this.onReplyToggle} type="checkbox" checked={withReplies} />
                    With replies
                </label>
                <Timeline current={current} withReplies={withReplies} />
            </>
        );
    }
}

export default App;
