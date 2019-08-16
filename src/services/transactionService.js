import { cTokens, ERC20, getNetwork } from '../utils'
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

  mintCompound: async (web3, value, token, cb) => {
    const networkId = await getNetwork(web3)
    const { CTokenContract, amount } = await TransactionService.approveTx(web3, value, token)
    const data = await CTokenContract.methods.mint(amount).encodeABI()
    return TransactionService.getTransaction(web3, data, cTokens[token][networkId].address, cb)
  },

  borrowCompound: async (web3, value, token, cb) => {
    const networkId = await getNetwork(web3)
    const { CTokenContract, amount } = await TransactionService.approveTx(web3, value, token)
    const data = await CTokenContract.methods.borrow(amount).encodeABI()
    return TransactionService.getTransaction(web3, data, cTokens[token][networkId].address, cb)
  }

}

export default TransactionService
