
import React from 'react';

import './Button.scss';

const Button = (props) => {
    const { className, children, handleClick, disabled, customStyles } = props;
    return (
        <button style={customStyles} disabled={disabled} onClick={handleClick} className={`button-container ${className}`}>
            {children}
        </button>
    );
};

export default Button;