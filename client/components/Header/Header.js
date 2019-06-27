import React from 'react';

import './Header.css';

export default ({ children }) => {
    return (
        <div className="Header d-flex justify-content-center p-4">{children}</div>
    );
};
