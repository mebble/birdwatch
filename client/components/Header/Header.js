import React from 'react';

export default ({ children }) => {
    const classes = `
        py-4
        m-auto w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5
        bg-gray-100 shadow rounded
    `;
    return (
        <div className="pt-2 md:pt-5 xs-max:sticky xs-max:top-0">
            <section className={classes}>
                {children}
            </section>
        </div>
    );
};
