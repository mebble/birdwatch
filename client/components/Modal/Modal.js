import React from 'react';

import './Modal.css';

export default ({ onBackdropClick, children }) => {
    const backdropClasses = `
        Modal__backdrop
        fixed
        w-screen min-h-screen
        z-50
        flex justify-center items-center
    `;
    return (
        <div className={backdropClasses} onClick={onBackdropClick}>
            <div className="Modal__container w-4/5">
                {children}
            </div>
        </div>
    );
};
