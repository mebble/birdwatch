import React from 'react';

import Icon from '../Icon';

export default ({ name, screenName, imgUrl, verified }) => {
    return (
        <div className="UserCard shadow rounded-lg p-2 bg-gray-100">
            <a className="flex items-center" href={`https://twitter.com/${screenName}`} target="_blank">
                <img className="rounded-full mr-2" src={imgUrl} />
                <div className="flex flex-col mx-1">
                    <p className="text-sm leading-tight">{name}</p>
                    <p className="text-xs leading-tight text-gray-600">@{screenName}</p>
                </div>
                <div className="ml-1">
                    {verified
                        ? <Icon name="verified" fill="#3BCAAD" width="16" height="16" />
                        : null
                    }
                </div>
            </a>
        </div>
    );
};
