import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import './Panel.scss';
import { getAccount } from '../../utils'
//Services
import rateService from '../../services/rateService';

//Components
import Table from '../Table';

function Panel() {
    const [protocols, setProtocols] = useState([]);
    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const protocolsList = await rateService.get();
            setProtocols(protocolsList);
            const { account, provider } = await getAccount();
            setAccount(account);
            setProvider(provider);
        };
        if (!isEqual(previousInputs.current, [protocols, account]))
            fetchData();
    });

    const previousInputs = useRef();
    useEffect(() => {
        previousInputs.current = [protocols, account];
    });

    return (
        <div className="defi-panel">
            <Table web3={provider} account={account} protocols={protocols} />
        </div>
    );
}

export default Panel;
