import React from 'react';
import classnames from 'classnames';

export default ({ isSticky=false, children }) => {
    const containerClasses = classnames('HeaderCard__container pt-2 md:pt-5 pointer-events-none', {
        'sticky top-0': isSticky
    });
    const classes = `
        HeaderCard
        pointer-events-auto
        py-4
        m-auto w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5
        bg-gray-100 shadow rounded
    `;
    return (
        <div className={containerClasses}>
            <div className={classes}>
                {children}
            </div>
        </div>
    );
};
