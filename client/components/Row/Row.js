import React from 'react';

import './Row.css';

const RowItem = ({ children }) => {
    return <div className="mx-2">{children}</div>;
};

export default ({ children }) => {
    const rowItems = Array.isArray(children)
        ? children.map((child, i) => <RowItem key={i}>{child}</RowItem>)
        : <RowItem>{children}</RowItem>;
    const classes = 'Row flex justify-center p-2';
    return (
        <div className={classes}>{rowItems}</div>
    );
};
