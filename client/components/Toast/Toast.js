import React from 'react';

import './Toast.css';

export default ({ text }) => {
    const classes = `
        Toast
        text-white bg-gray-600
        shadow
        py-1 px-3 rounded-full
        z-40
    `;
    return text
        ? (<div className={classes}>
                <p>{text}</p>
            </div>)
        : null;
};
