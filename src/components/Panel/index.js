import React, { useState, useEffect } from 'react';
import './Panel.scss';
import { getAccount } from '../../utils'
//Services
import rateService from '../../services/rateService';

//Components
import Table from '../Table';

function Panel() {
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
    const [protocols, setProtocols] = useState([]);
    const [account, setAccount] = useState({});
    const [provider, setProvider] = useState({});
    return (
        <div className="defi-panel">
            <Table protocols={protocols} />
        </div>
    );
}

export default Panel;
