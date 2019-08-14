import { cTokens, ERC20 } from '../utils';
const TransactionService = {
    approveTx: async (web3, value, token) => {
        //creating contracts object
        const CTokenContract = new web3.eth.Contract(cTokens[token].ABI, cTokens[token].address);
        const tokenDecimals = ERC20[token].decimals;
        const amount = (Number(value) * Math.pow(10, tokenDecimals)).toString();
        return { CTokenContract, amount };
    },
    getTransaction: async (web3, data, to) => {
        // get transaction count, later will used as nonce
        // const count = await web3.eth.getTransactionCount(process.env.MY_ADDRESS);
        const from = (await web3.eth.getAccounts())[0];
        const rawTransaction = {
            //nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(20 * 1e9),
            gasLimit: web3.utils.toHex(400000),
            from,
            to,
            value: "0x0",
            data
        };
        //sending transacton via web3js module
        return await web3.eth.sendTransaction(rawTransaction);
    },

    mintCompound: async (web3, value, token) => {
        const { CTokenContract, amount } = await TransactionService.approveTx(web3, value, token);
        const data = await CTokenContract.methods.mint(amount).encodeABI();
        return await TransactionService.getTransaction(web3, data, cTokens[token].address);
    }
};

export default TransactionService;