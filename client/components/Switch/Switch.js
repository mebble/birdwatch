import React from 'react';
import classnames from 'classnames';

export default ({ current, onLeftClick, onRightClick }) => {
    const leftIsOn = current === 'favourites';
    const rightIsOn = current === 'retweets';
    const baseClasses = 'bg-gray-300 text-gray-800 font-bold py-2 px-4';
    const leftClasses = classnames(baseClasses, 'rounded-l', {
        'shadow-inner cursor-not-allowed bg-gray-400': leftIsOn
    });
    const rightClasses = classnames(baseClasses, 'rounded-r', {
        'shadow-inner cursor-not-allowed bg-gray-400': rightIsOn
    });
    return (
        <div className="inline-flex">
            <button className={leftClasses} onClick={onLeftClick} disabled={leftIsOn}>
                favourites
            </button>
            <button className={rightClasses} onClick={onRightClick} disabled={rightIsOn}>
                retweets
            </button>
        </div>
    );
};
