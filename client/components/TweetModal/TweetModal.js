import React from 'react';
import TweetEmbed from 'react-tweet-embed';

import Modal from '../Modal';

export default ({ id, showModal, closeTweet }) => {
    return showModal
        ? <Modal onBackdropClick={closeTweet}>
            <TweetEmbed id={id} />
        </Modal>
        : null;
};
