import React from 'react';
import TweetEmbed from 'react-tweet-embed';

import Modal from '../Modal';
import Loader from '../Loader';

export default ({ id, showModal, closeTweet }) => {
    return showModal
        ? <Modal onBackdropClick={closeTweet}>
            <TweetEmbed id={id} placeholder={<Loader label="Loading tweet..." />} />
        </Modal>
        : null;
};
