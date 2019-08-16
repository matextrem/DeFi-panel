import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { getAccount, shortenAccount, networkIds, getNetwork } from './utils'
//Services
import rateService from './services/rateService';
import './App.scss';
import Panel from './components/Panel';
import Button from './components/common/Button';


function App() {
  const [protocols, setProtocols] = useState([]);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState({});
  const [networkId, setNetwork] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const protocolsList = await rateService.get();
      setProtocols(protocolsList);
    };
    if (!isEqual(previousInputs.current, [protocols]))
      fetchData();
  });

  const previousInputs = useRef();
  useEffect(() => {
    previousInputs.current = [protocols];
  });

  const connectAccount = async () => {
    const { account, provider } = await getAccount();
    setAccount(account);
    setProvider(provider);
    const networkId = await getNetwork(provider);
    setNetwork(networkId);
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          DeFi Panel
        </p>
        {!account ? (<Button handleClick={connectAccount} className="connect-button">
          Connect to Metamask
        </Button>) : <div className="account-info">
            <p><strong>Account:</strong> {shortenAccount(account || '')}</p>
            <p> <strong> Network:</strong> {networkIds[networkId] || networkIds[0]} </p>
          </div>}
      </header>
      <main>
        <div className="App-content">
          <Panel networkId={networkId} provider={provider} account={account} protocols={protocols} />
        </div>
      </main>
    </div>
  );
}

export default App;