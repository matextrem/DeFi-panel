
import React from 'react';

import LoadingIcon from '../Loading/LoadingIcon';

import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-animate">
                <LoadingIcon />
            </div>
        </div>
    );
};

export default Loading;