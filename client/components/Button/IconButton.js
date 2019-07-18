import React from 'react';

import Icon from '../Icon';

export default ({ iconName, onClick }) => {
    const classes = `
        IconButton
        text-white font-bold
        rounded-full shadow
        focus:outline-none
    `;
    return (
        <button className={classes} onClick={onClick} type="button">
            <Icon name={iconName} fill="#718096" />
        </button>
    );
};
