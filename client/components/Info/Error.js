import React from 'react';

import Icon from '../Icon';

const ErrorBody = ({ iconName, label, subLabel=null }) => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name={iconName} fill="#b0b0b0" width="86" height="86" />
            <div className="mt-5 text-center text-gray-500">
                <p className="text-xl mb-3">
                    {label}
                </p>
                <p className="text-sm">
                    {subLabel}
                </p>
            </div>
        </div>
    );
};

const UserNotFound = ({ error }) => {
    return (
        <ErrorBody iconName="question"
            label={
                <span>User @{error.query}<br />can't be found</span>
            }
        />
    );
};

const SomethingWrong = ({ error }) => {
    return (
        <ErrorBody iconName="cross"
            label={
                <span>Something went wrong while<br />looking for @{error.query}</span>
            }
            subLabel={
                <span>Either my developer needs to pay his bills<br />
                    or something's up with{" "}
                    <a className="font-semibold text-blue-300" href={`https://twitter.com/${error.query}`} target="_blank">
                        @{error.query}'s Twitter account
                    </a>
                </span>
            }
        />
    );
};

const NetworkError = () => {
    return (
        <ErrorBody iconName="cross"
            label={
                <span>Something's wrong with your network</span>
            }
        />
    );
};

export default ({ error={} }) => {
    return error.code === 50 || error.code === 34
        ? <UserNotFound error={error} />
        : error.query
        ? <SomethingWrong error={error} />
        : <NetworkError />
};
