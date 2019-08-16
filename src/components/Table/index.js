/* eslint react/prop-types: 0 */
import React from 'react'
import './Table.scss'
import { tokenSymbols, protocolInNetwork, protocolsName } from '../../utils'

function Table (props) {
  const { protocols, networkId, handleMint, handleBorrow } = props

  const mint = (protocol, token) => handleMint(protocol, token)
  const borrow = (protocol, token) => handleBorrow(protocol, token)

  return (
    <div className='interest-rates'>
      <div className='table'>
        <div className='static'>
          <div className='token-row delimiter'>
            <div className='protocol-column token-cell' />
          </div>
          <div className='vertical-container'>
            <div className='category-row'>
              <div className='protocol-rows'>
                {protocols.map(protocol => (
                  <div key={protocol.name} className='protocol-block'>
                    <div className='protocol-row name'>
                      <div className='protocol-column'>
                        <img
                          className='icon'
                          src={`images/${protocol.name}.svg`}
                          alt={protocol.name}
                        /><span className='name'>{protocolsName[protocol.name]}</span>
                      </div>
                    </div>
                    <div className='protocol-row action-values'>
                      <div className='protocol-column'>
                        <div className='percentage'>
                          <div className='rate-value lend'>EARN</div>
                        </div>
                        <div className='percentage'>
                          <div className='rate-value borrow'>BORROW</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='dynamic'>
          <div className='horizontal-container'>
            <div className='token-row delimiter'>
              {tokenSymbols.map(token => (
                <div key={`token-${token}`} className='token-column'>
                  <div className='centered'>
                    <img className='icon' src={`images/${token.toLowerCase()}.svg`} alt={token.toUpperCase()} />
                  </div>
                  <div className='centered'><span className='name'>{token}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className='vertical-container horizontal-container'>
            <div className='category-row'>
              <div className='protocol-rows'>
                {protocols.map(protocol => (
                  <div key={protocol.name} className='protocol-block'>
                    <div className='protocol-row name' />
                    <div className='protocol-row action-values'>
                      {protocol.rates.map(rate => (
                        <div key={rate.token} className={`percentage-column ${!protocolInNetwork(protocol.name, networkId) && 'not-allowed'}`}>
                          <div className='percentage lend' onClick={() =>
                            protocolInNetwork(protocol.name, networkId)
                              ? mint(protocol, rate.token)
                              : false}>
                            <div className='rate-value'>{rate.supply_rate}%</div>
                          </div>
                          <div className='percentage borrow inverse' onClick={() =>
                            protocolInNetwork(protocol.name, networkId)
                              ? borrow(protocol, rate.token)
                              : false}>
                            <div className='rate-value'>{rate.borrow_rate}%</div>
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
    </div>
  )
}

export default Table
