import React from 'react';

export default ({ children }) => {
    return (
        <section className="Body m-4 flex-grow flex flex-col justify-center items-center">
            {children}
        </section>
    );
};
