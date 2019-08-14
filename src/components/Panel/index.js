import React, { useState, useEffect } from 'react';
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
            const protocols = await rateService.get();
            setProtocols(protocols);
            const { account, provider } = await getAccount();
            setAccount(account);
            setProvider(provider);
        };
        fetchData();
    }, []);

    return (
        <div className="defi-panel">
            <Table web3={provider} account={account} protocols={protocols} />
        </div>
    );
}

export default Panel;
