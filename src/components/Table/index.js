import React, { useState, useEffect } from 'react';
import './Table.scss';
import { tokenSymbols } from '../../utils';
import transactionService from '../../services/transactionService';
import TxModal from '../TxModal';

function Table(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState({});
  const [isDeposited, setDeposited] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const balance = await transactionService.getTokenBalance(props.web3, selectedMarket.symbol);
      setAccountBalance(balance);
    };
    const isWeb3 = Object.keys(props.web3).length !== 0;
    if (isWeb3 && selectedMarket.symbol)
      fetchData();
  }, [props.web3, selectedMarket]);

  const setModalOptions = (protocol, token) => {
    const selectedMarket = protocol.rates.find(rate => rate.token === token);
    const market = {
      symbol: selectedMarket.token,
      interestRate: isDeposited ? selectedMarket.supply_rate : selectedMarket.borrow_rate,
      protocol
    }
    setSelectedMarket(market);
    setModalOpen(true);
  }
  const mint = async (protocol, token) => {
    setDeposited(true);
    setModalOptions(protocol, token);
  }
  const borrow = (protocol, token) => {
    setDeposited(false);
    setModalOptions(protocol, token);
  }

  const closeModal = () => setModalOpen(false);

  const { account, protocols, web3 } = props;
  return (
    <div className="interest-rates">
      <TxModal isOpen={isModalOpen}
        onRequestClose={closeModal}
        isDeposited={isDeposited}
        title={isDeposited ? `Deposit ${selectedMarket.symbol}` : `Borrow ${selectedMarket.symbol}`}
        market={selectedMarket}
        account={account}
        accountBalance={accountBalance}
        web3={web3}
      />
      {protocols.length === 0 ? 'Loading...' : (
        <div className="table">
          <div className="static">
            <div className="token-row delimiter">
              <div className="protocol-column token-cell" />
            </div>
            <div className="vertical-container">
              <div className="category-row">
                <div className="protocol-rows">
                  {protocols.map(protocol => (
                    <div key={protocol.name} className="protocol-block">
                      <div className="protocol-row name">
                        <div className="protocol-column">
                          <img
                            className="icon"
                            src={`images/${protocol.name}.svg`}
                            alt={protocol.name}
                          /><span className="name">{protocol.name}</span>
                        </div>
                      </div>
                      <div className="protocol-row action-values">
                        <div className="protocol-column">
                          <div className="percentage">
                            <div className="rate-value lend">EARN</div>
                          </div>
                          <div className="percentage">
                            <div className="rate-value borrow">BORROW</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="dynamic">
            <div className="horizontal-container">
              <div className="token-row delimiter">
                {tokenSymbols.map(token => (
                  <div key={`token-${token}`} className="token-column">
                    <div className="centered">
                      <img className="icon" src={`images/${token.toLowerCase()}.svg`} alt={token.toUpperCase()} />
                    </div>
                    <div className="centered"><span className="name">{token}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="vertical-container horizontal-container">
              <div className="category-row">
                <div className="protocol-rows">
                  {protocols.map(protocol => (
                    <div key={protocol.name} className="protocol-block">
                      <div className="protocol-row name" />
                      <div className="protocol-row action-values">
                        {protocol.rates.map(rate => (
                          <div key={rate.token} className="percentage-column">
                            <div className="percentage lend" onClick={() => mint(protocol, rate.token)}>
                              <div className="rate-value">{rate.supply_rate}%</div>
                            </div>
                            <div className="percentage borrow inverse" onClick={() => borrow(protocol, rate.token)}>
                              <div className="rate-value">{rate.borrow_rate}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;