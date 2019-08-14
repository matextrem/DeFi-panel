import React, { useState } from 'react';
import Modal from 'react-modal';

import CloseModal from '../common/CloseModal';
import FormRow, { FormRowsContainer } from '../common/FormRow';
import Button from '../common/Button';
import AmountTextfield from '../AmountTextfield';
import { modalStyle, shortenAccount } from '../../utils';
import transactionService from '../../services/transactionService';

import './TxModal.scss';

Modal.setAppElement('#root');

function TxModal(props) {
  const [tokens, setTokens] = useState('0');
  const [disbledButton, setDisabledButton] = useState(true);


  const getTokens = e => {
    const value = e.target.value;
    if (value.length === 0) setDisabledButton(true);
    else setDisabledButton(false);
    setTokens(value);
  }
  const deposit = async () => {
    let response;
    switch (market.protocol.name) {
      case 'compound':
        response = await transactionService.mintCompound(web3, tokens, market.symbol);
        break;
      case 'dydx':

        break;

      default:
        break;
    }

    console.log(response, 'final response');

  }
  const handleClick = () => {
    if (isDeposited) deposit();
  }
  const { market, onRequestClose, title, isDeposited, account, web3, ...restProps } = props;
  return (
    <Modal {...restProps} style={modalStyle}>
      <div className="modal-title">
        <h2 className="modal-title--text">{title}</h2>
        <button className="modal-close" onClick={onRequestClose}>
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
      <AmountTextfield onChange={getTokens} token={market.symbol} placeholder={'0.00'} />
      <Button disabled={disbledButton} handleClick={handleClick} className="modal-send-button">
        {isDeposited ? 'Deposit' : 'Borrow'}
      </Button>
    </Modal>
  );
}

export default TxModal;