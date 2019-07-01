import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import classnames from 'classnames';

import './TweetModal.css';

export default ({ id, showModal, closeTweet }) => {
    const classes = classnames('TweetModal', `
        fixed
        w-screen min-h-screen overflow-y-scroll
        z-50
        flex flex-col justify-center items-center
    `);
    return showModal
        ? <div className={classes} onClick={closeTweet}>
            <TweetEmbed id={id} placeholder={<p>Loading Tweet</p>} />
        </div>
        : null;
};
