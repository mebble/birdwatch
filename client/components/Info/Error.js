import React from 'react';

import Icon from '../Icon';

const ErrorBody = ({ iconName, label }) => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name={iconName} fill="#b0b0b0" width="86" height="86" />
            <p className="mt-4 text-xl text-center text-gray-400">{label}</p>
        </div>
    );
};

export default ({ error={} }) => {
    return error.code === 50 || error.code === 34
        ? <ErrorBody iconName="question" label={`We can't find user @${error.query}`} />
        : <ErrorBody iconName="cross" label={`Something went wrong while looking for @${error.query}`} />;
};
