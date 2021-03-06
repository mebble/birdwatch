import React from 'react';

import './Modal.css';

export default ({ onBackdropClick, children }) => {
    const backdropClasses = `
        Modal__backdrop
        fixed overflow-auto
        w-screen min-h-screen
        z-50
        flex justify-center items-center
    `;
    const containerClasses = `
        Modal__container
        absolute
        xs-max:w-4/5
    `;
    return (
        <div className={backdropClasses} onClick={onBackdropClick}>
            <div className={containerClasses} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
