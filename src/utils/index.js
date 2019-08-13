import Web3 from 'web3';

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