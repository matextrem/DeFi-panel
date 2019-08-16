import React, { useState, useEffect } from 'react'
import './Panel.scss'
import TxModal from '../TxModal'
import transactionService from '../../services/transactionService'
import Loading from '../common/Loading'
import ErrorBoundary from '../common/ErrorBoundary'
import { isContractDeployed } from '../../utils'

// Components
import Table from '../Table'

function Panel (props) {
  const { account, web3, protocols, networkId } = props
  const [isModalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMarket, setSelectedMarket] = useState({})
  const [isDeposited, setDeposited] = useState(false)
  const [accountBalance, setAccountBalance] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const balance = await transactionService.getTokenBalance(web3, selectedMarket.symbol)
      setAccountBalance(balance || 0)
    }
    const isWeb3 = Object.keys(web3).length !== 0
    if (isWeb3 && selectedMarket.symbol) {
      fetchData()
    }
  }, [web3, selectedMarket])

  const setModalOptions = (protocol, token) => {
    const selectedMarket = protocol.rates.find(rate => rate.token === token)
    const market = {
      symbol: selectedMarket.token,
      interestRate: isDeposited ? selectedMarket.supply_rate : selectedMarket.borrow_rate,
      protocol
    }
    setSelectedMarket(market)
    setModalOpen(true)
  }
  const handleMint = async (protocol, token) => {
    if (isContractDeployed(networkId, token)) {
      setDeposited(true)
      setModalOptions(protocol, token)
    } else setError({ message: 'Contract is not deployed in the selected network. Try switching it.' })
  }
  const handleBorrow = (protocol, token) => {
    setDeposited(false)
    setModalOptions(protocol, token)
  }

  const closeModal = () => setModalOpen(false)
  return (
    <div className='defi-panel'>
      <TxModal isOpen={isModalOpen}
        onRequestClose={closeModal}
        isDeposited={isDeposited}
        title={isDeposited ? `Deposit ${selectedMarket.symbol}` : `Borrow ${selectedMarket.symbol}`}
        market={selectedMarket}
        account={account}
        accountBalance={accountBalance}
        web3={web3}
      />
      {protocols.length === 0 ? <div className='defi-panel--loading'><Loading /></div> : (
        !error ? <Table handleMint={handleMint} handleBorrow={handleBorrow} {...props} />
          : <ErrorBoundary error={error} />
      )}
    </div>
  )
}

export default Panel
