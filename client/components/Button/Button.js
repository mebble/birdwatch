import React from 'react';
import classnames from 'classnames';

export default ({ onClick, disabled, children, type='button' }) => {
    const classes = classnames('Button', `
        bg-indigo-700 text-white font-bold
        py-2 px-4 rounded
        focus:outline-none
    `, {
        'opacity-50 cursor-not-allowed': disabled
    });
    return <button className={classes} onClick={onClick} disabled={disabled} type={type}>{children}</button>;
};
