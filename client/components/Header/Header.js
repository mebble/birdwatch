import React from 'react';

export default ({ children }) => {
    const classes = `
        bg-gray-300 py-8
        sticky top-0
    `;
    return (
        <section className={classes}>
            {children}
        </section>
    );
};
