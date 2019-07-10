import React from 'react';
import classnames from 'classnames';

import './Toggle.css';

export default ({ onClick, isOn, children }) => {
    const classes = classnames('Toggle', `
        bg-gray-100
        border border-solid border-gray-400 rounded-full
        text-black
        px-3 py-2
        focus:outline-none
    `, {
        'border-gray-700 bg-gray-200': isOn,
    });
    return (
        <button className={classes} onClick={onClick}>{children}</button>
    );
};
