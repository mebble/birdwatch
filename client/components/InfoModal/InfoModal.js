import React from 'react';

import Modal from '../Modal';
import Row from '../Row';
import Icon from '../Icon';

const InfoRow = ({ iconName, text }) => {
    return (
        <Row>
            <div className="px-2 md:px-4 py-2">
                <Icon name={iconName} fill="#4c6e98" width="48" height="48" />
            </div>
            <span className="px-2 md:px-4 py-2 max-w-xs text-gray-700">{text}</span>
        </Row>
    );
};

const InfoBody = () => {
    const classes = `
        InfoBody
        bg-white
        rounded
        shadow
        p-5
    `;
    return (
        <div className={classes}>
            <InfoRow iconName="barchart" text="Find out how many favourites and retweets a Twitter user's tweets have gotten" />
            <InfoRow iconName="textbox" text="Click on the bar chart to open up a tweet and interact with it" />
            <InfoRow iconName="permalink" text="Save the application state into a link and copy it to the clipboard" />
        </div>
    );
};

export default ({ showInfo, closeInfo }) => {
    return showInfo
        ? (<Modal onBackdropClick={closeInfo}>
            <InfoBody />
        </Modal>)
        : null;
};
