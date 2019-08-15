import Web3 from 'web3';
import ABIS from '../contracts';

//  Rikenby: 4
//  Mainnet: 1
//  Ropsten: 3
//  Kovan: 42

export const cTokens = {
    'DAI': {
        4: {
            address: "0x6d7f0754ffeb405d23c51ce938289d4835be3b14",
            ABI: ABIS.DAI[4]
        }
    },
    'USDC': {
        4: {
            address: "0x5b281a6dda0b271e91ae35de655ad301c976edb1",
            ABI: ABIS.USDC[4]
        }
    }
}
export const ERC20 = {
    'DAI': {
        4: {
            address: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea"
        },
        marketId: 1,
        decimals: 18
    },
    'USDC': {
        4: {
            address: "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b"
        },
        marketId: 2,
        decimals: 6
    },
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

export const shortenAccount = account => account.slice(0, 6) + '...' + account.slice(account.length - 4);


export const modalStyle = {
    content: {
        backgroundColor: '#fff',
        borderColor: 'transparent',
        bottom: 'auto',
        boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '0',
        left: 'auto',
        overflow: 'hidden',
        padding: '17px',
        position: 'relative',
        right: 'auto',
        top: 'auto',
        width: '350px',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '12345',
    },
};
