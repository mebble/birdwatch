import React from 'react';
import classnames from 'classnames';

import './Toggle.css';

export default ({ onClick, isOn, children }) => {
    const classes = classnames('Toggle', 'bg-blue-500 text-white font-bold p-2 rounded focus:outline-none', {
        'shadow-outline': isOn,
    });
    return (
        <button className={classes} onClick={onClick}>{children}</button>
    );
};
