import React, { useState } from 'react';
import Modal from 'react-modal';

import CloseModal from '../common/CloseModal';
import FormRow, { FormRowsContainer } from '../common/FormRow';
import Button from '../common/Button';
import Loading from '../common/Loading';
import AmountTextfield from '../AmountTextfield';
import { modalStyle, shortenAccount } from '../../utils';
import transactionService from '../../services/transactionService';

import './TxModal.scss';

Modal.setAppElement('#root');

function TxModal(props) {
  const [tokens, setTokens] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disbledButton, setDisabledButton] = useState(true);


  const getTokens = e => {
    const value = e.target.value;
    if (value.length === 0) setDisabledButton(true);
    else setDisabledButton(false);
    if (value <= props.accountBalance)
      setTokens(value);
  }

  const handleCallback = (err, transactionHash) => {
    console.log("TxHash", transactionHash);
    if (err) {
      setError(true);
      setLoading(false)
    }
  }

  const deposit = async () => {
    switch (market.protocol.name) {
      case 'compound':
        await transactionService.mintCompound(web3, tokens, market.symbol, handleCallback);
        break;
      case 'dydx':
        break;

      default:
        break;
    }
    setLoading(false);
  }

  const borrow = async () => {
    switch (market.protocol.name) {
      case 'compound':
        await transactionService.borrowCompound(web3, tokens, market.symbol, handleCallback);
        break;
      case 'dydx':

        break;

      default:
        break;
    }
    setLoading(false);
  }

  const handleClick = async () => {
    setError(false);
    setLoading(true);
    if (isDeposited) deposit();
    else borrow();
  }

  const closeModal = () => {
    setError(false);
    setTokens('');
    setDisabledButton(true);
    onRequestClose();
  }
  const { market, onRequestClose, title, isDeposited, account, web3, ...restProps } = props;
  return (
    <Modal {...restProps} style={modalStyle}>
      <div className="modal-title">
        <h2 className="modal-title--text">{title}</h2>
        <button className="modal-close" onClick={closeModal}>
          <CloseModal />
        </button>
      </div>
      {isDeposited && (
        <p className="modal-text">
          Deposit <strong>{market.symbol}</strong> and earn interest automatically.
       </p>
      )}
      <FormRowsContainer>
        <FormRow text="Account" value={shortenAccount(account || '')} />
        <FormRow
          text="Interest"
          value={`Earn ${market.interestRate}% APR`}
        />
      </FormRowsContainer>
      <h3 className="modal-subtitle">Amount</h3>
      <AmountTextfield onChange={getTokens} value={tokens} token={market.symbol} placeholder={'0.00'} />
      {isLoading ? (
        <Loading />
      ) : (
          <p className="modal-note">
            {error && <div className="modal-note--error">There was an error making the {isDeposited ? 'deposit' : 'borrow'}.</div>}
          </p>
        )}
      <Button disabled={disbledButton} handleClick={handleClick} className={`modal-send-button ${!isDeposited && 'modal-send-button--inverse'}`}>
        {isDeposited ? 'Deposit' : 'Borrow'}
      </Button>
    </Modal>
  );
}

export default TxModal;