
import React from 'react';
import './AmountTextfield.scss';

const AmountTextfield = (props) => {
    const { placeholder, token, onChange } = props;
    return (
        <div className="amount-textfield--wrapper">
            <input
                className="amount-textfield--input"
                type={'number'}
                placeholder={placeholder}
                onChange={onChange}
            />
            <div className="amount-textfield--token">
                {token}
            </div>
        </div>
    );
};

export default AmountTextfield;