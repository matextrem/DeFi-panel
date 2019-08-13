import Web3 from 'web3';
import ABIS from '../contracts';


export const cTokens = {
    'DAI': { address: "0x6d7f0754ffeb405d23c51ce938289d4835be3b14", ABI: ABIS.DAI },
    'USDC': { address: "0x5b281a6dda0b271e91ae35de655ad301c976edb1", ABI: ABIS.USDC }
}
export const ERC20 = {
    'DAI': { address: "0xef77ce798401dac8120f77dc2debd5455eddacf9", marketId: 1, decimals: 18 },
    'USDC': { address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", marketId: 2, decimals: 6 },
    ABI: ABIS.ERC20
}

export const tokenSymbols = ['DAI', 'USDC'];

export const getAccount = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed    }
        // Non-dapp browsers...
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const accounts = await window.web3.eth.getAccounts();
    return { account: accounts[0], provider: window.web3 };
};


export const getNetwork = async web3 => {
    const network = await web3.eth.net.getId();
    return network
};
