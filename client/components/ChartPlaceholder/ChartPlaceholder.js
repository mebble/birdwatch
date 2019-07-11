import React from 'react';

import Icon from '../Icon';
import Loader from '../Loader';

export const Init = () => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name="twitter" fill="#76A9EA" width="86" height="86" />
            <p className="mt-4 text-xl text-center text-gray-400">Find your tweet engagements</p>
        </div>
    );
};

export const Loading = () => {
    return <Loader label="Loading tweets..." />
};

const ErrorBody = ({ iconName, label }) => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name={iconName} fill="#b0b0b0" width="86" height="86" />
            <p className="mt-4 text-xl text-center text-gray-400">{label}</p>
        </div>
    );
};

export const Error = ({ error }) => {
    return error.code === 50 || error.code === 34
        ? <ErrorBody iconName="question" label={`We can't find user @${error.query}`} />
        : <ErrorBody iconName="cross" label={`Something went wrong while looking for @${error.query}`} />;
};
