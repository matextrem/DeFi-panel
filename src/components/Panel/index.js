import React from 'react';
import './Panel.scss';

//Components
import Table from '../Table';

function Panel(props) {
    return (
        <div className="defi-panel">
            <Table web3={props.provider} {...props} />
        </div>
    );
}

export default Panel;
