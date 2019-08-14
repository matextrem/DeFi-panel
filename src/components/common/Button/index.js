
import React from 'react';

import './Button.scss';

const Button = (props) => {
    const { className, children, handleClick, disabled } = props;
    return (
        <button disabled={disabled} onClick={handleClick} className={`button-container ${className}`}>
            {children}
        </button>
    );
};

export default Button;