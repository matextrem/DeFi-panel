import BigNumber from 'bignumber.js'
import { cTokens, ERC20, getNetwork } from '../utils'
import { Solo, AmountReference, AmountDenomination, ConfirmationType } from '@dydxprotocol/solo'

const TransactionService = {
  approveTx: async (web3, value, token) => {
    // creating contracts object
    const networkId = await getNetwork(web3)
    const CTokenContract = new web3.eth.Contract(
      cTokens[token][networkId].ABI,
      cTokens[token][networkId].address
    )
    const tokenDecimals = ERC20[token].decimals
    const amount = (Number(value) * Math.pow(10, tokenDecimals)).toString()
    return { CTokenContract, amount }
  },
  getTransaction: async (web3, data, to, cb) => {
    // get transaction count, later will used as nonce
    const from = (await web3.eth.getAccounts())[0]
    const rawTransaction = {
      gasPrice: web3.utils.toHex(20 * 1e9),
      gasLimit: web3.utils.toHex(400000),
      from,
      to,
      value: '0x0',
      data
    }
    // sending transacton via web3js module
    return web3.eth.sendTransaction(rawTransaction, cb)
  },

  getTokenBalance: async (web3, token) => {
    const networkId = await getNetwork(web3)
    const ERC20Contract = new web3.eth.Contract(ERC20.ABI, ERC20[token][networkId].address)
    const account = (await web3.eth.getAccounts())[0]
    const balance = await ERC20Contract.methods.balanceOf(account).call()
    const newTokenBalance = parseFloat(balance) / Math.pow(10, ERC20[token].decimals)
    return newTokenBalance
  },

  getDyDxData: async (provider, value, token) => {
    const networkId = await getNetwork(provider)
    const account = (await provider.eth.getAccounts())[0]
    const tokenDecimals = ERC20[token].decimals
    const amount = (Number(value) * Math.pow(10, tokenDecimals)).toString()
    const solo = new Solo(provider, networkId)
    const operation = solo.operation.initiate()
    const dydxData = {
      primaryAccountOwner: account,
      primaryAccountId: new BigNumber('0'),
      marketId: new BigNumber(ERC20[token].marketId),
      amount: {
        value: new BigNumber(amount),
        reference: AmountReference.Delta,
        denomination: AmountDenomination.Actual
      }
    }
    return { operation, dydxData, account }
  },

  mintCompound: async (web3, value, token, cb) => {
    const networkId = await getNetwork(web3)
    const { CTokenContract, amount } = await TransactionService.approveTx(web3, value, token)
    const data = await CTokenContract.methods.mint(amount).encodeABI()
    return TransactionService.getTransaction(web3, data, cTokens[token][networkId].address, cb)
  },

  mintDyDx: async (web3, value, token) => {
    const { operation, dydxData, account } = await TransactionService.getDyDxData(web3, value, token)
    const dydxObj = { ...dydxData, from: account }
    await operation.deposit(dydxObj)
    return operation.commit({
      from: account,
      gasPrice: '1000000000',
      confirmationType: ConfirmationType.Confirmed
    })
  },

  borrowDyDx: async (web3, value, token) => {
    const { operation, dydxData, account } = await TransactionService.getDyDxData(web3, value, token)
    const dydxObj = { ...dydxData, to: account }
    await operation.withdraw(dydxObj)
    return operation.commit({
      from: account,
      gasPrice: '1000000000',
      confirmationType: ConfirmationType.Confirmed
    })
  },

  borrowCompound: async (web3, value, token, cb) => {
    const networkId = await getNetwork(web3)
    const { CTokenContract, amount } = await TransactionService.approveTx(web3, value, token)
    const data = await CTokenContract.methods.borrow(amount).encodeABI()
    return TransactionService.getTransaction(web3, data, cTokens[token][networkId].address, cb)
  }

}

export default TransactionService
