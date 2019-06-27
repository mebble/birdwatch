import React from 'react';

export default ({ placeholder, value }) => {
    const classes = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline';
    return <input className={classes} type="text" placeholder={placeholder} value={value} />;
};
