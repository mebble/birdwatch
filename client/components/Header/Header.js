import React from 'react';

export default ({ children }) => {
    const classes = 'sticky top-0 bg-gray-300 py-8';
    return (
        <section className={classes}>
            {children}
        </section>
    );
};
