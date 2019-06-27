import React from 'react';

import './Checkbox.css';

export default ({ onChange, checked, children }) => {
    return (
        <div className="Checkbox form-check form-check-inline bg-light py-2 px-3">
            <input className="form-check-input" type="checkbox" onChange={onChange} checked={checked}  />
            <label className="form-check-label">{children}</label>
        </div>
    );
};
