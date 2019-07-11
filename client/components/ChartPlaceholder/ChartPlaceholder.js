import React from 'react';

import Icon from '../Icon';
import Loader from '../Loader';

export const Init = () => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name="twitter" fill="#76A9EA" width="86" height="86" />
            <p className="mt-4 text-xl text-center text-gray-400">Find your tweet engagments</p>
        </div>
    );
};

export const Loading = () => {
    return <Loader label="Loading tweets..." />
};

export const Error = () => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name="error" fill="#b0b0b0" width="86" height="86" />
            <p className="mt-4 text-xl text-center text-gray-400">Something went wrong!</p>
        </div>
    );
};
