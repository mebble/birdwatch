import React from 'react';

const RowItem = ({ children }) => {
    return <div className="flex items-center mx-2">{children}</div>;
};

export default ({ children }) => {
    const classes = 'Row flex justify-center p-2';
    return (
        <div className={classes}>{
            Array.isArray(children)
                ? children.map((child, i) => <RowItem key={i}>{child}</RowItem>)
                : <RowItem>{children}</RowItem>
        }</div>
    );
};
