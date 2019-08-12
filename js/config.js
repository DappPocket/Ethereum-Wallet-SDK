const INFURA_API_KEY = '056c00b3a8d846369185946435ca1ea3';

const mainnet = {
    network: 'mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    chainId: 1,
};

const ropsten = {
    network: 'ropsten',
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
    chainId: 3,
};

const networksList = {
    mainnet,
    ropsten,
};

const currentNetwork = networksList.mainnet; // Change this variable

export default currentNetwork;
