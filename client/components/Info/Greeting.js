import React from 'react';

import Icon from '../Icon';

export default () => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Icon name="twitter" fill="#76A9EA" width="86" height="86" />
            <p className="mt-5 text-xl text-center text-gray-400">Find your tweet engagements</p>
        </div>
    );
};
