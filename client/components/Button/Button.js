import React from 'react';
import classnames from 'classnames';

export default ({ onClick, disabled, children }) => {
    const classes = classnames('Button', 'bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none', {
        'opacity-50 cursor-not-allowed': disabled
    });
    return <button className={classes} onClick={onClick} disabled={disabled}>{children}</button>;
};
