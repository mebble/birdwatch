import React from 'react';
import classnames from 'classnames';

export default ({ onClick, disabled, children }) => {
    return <button className="Button btn btn-light" onClick={onClick} disabled={disabled}>{children}</button>;
};
