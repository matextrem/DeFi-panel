
import React from 'react';

import './FormRow.scss';

export const FormRowsContainer = props => <div className="form-rows--container">{props.children}</div>;

const FormRow = (props) => {
    const { text, value } = props;
    return (
        <div className="form-row--wrapper">
            <div className="form-row--text">{text}</div>
            <div className="form-row--value">{value}</div>
        </div>
    );
};

export default FormRow;