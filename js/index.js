const Web3 = require('web3');

const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions');
const RemoteLoginSubprovider = require('./dappSdkProvider');
const StaticProvider = require('./staticProvider');

require('../static/css/bootstrap-iso.css'); // version: 4.3.1

// Get MetaMask provider
windowProvider = window.ethereum;
windowWeb3 = window.web3;
console.debug('windowProvider', windowProvider);
console.debug('windowWeb3', windowWeb3);

let _defaultAddress;

const initEngine = () => {
    let engine = new ProviderEngine();

    // Do not move this subprovider, it should always be the first one

    // static results
    let staticProvider = new StaticProvider(getDefaultAddress, getNetVersion);

    engine.addProvider(staticProvider);

    // Remote login
    engine.addProvider(new RemoteLoginSubprovider());

    // filters
    engine.addProvider(new SubscriptionSubprovider());

    // data source
    engine.addProvider(new RpcSubprovider({
        rpcUrl: 'https://mainnet.infura.io/v3/056c00b3a8d846369185946435ca1ea3',
    }));
    engine.connected = true;

    engine.isConnected = () => true;

    engine.enable = async (cb = () => {}) => {
        p = new Promise((resolve, reject) => {
            engine.sendAsync({ method: 'eth_requestAccounts' }, (err, res) => {
                if (err) {
                    console.log('enable rejected with err: ', err);
                    reject(err);
                }
                console.log('enable resolved');
                defaultEnableCallback(err, res);
                cb(err, res);
                resolve(res);
            });
        });
        return p;
    };

    // start polling for blocks
    engine.start();

    return engine;
};

const getDefaultAddress = () => {
    console.log('getDefaultAddress');
    if (_defaultAddress !== undefined) {
        return _defaultAddress;
    }
    return '';
};

const getNetVersion = () => {
    console.log('getNetVersion');
    return 1;
};

// Set window.ethereum
const defaultEnableCallback = (err, res) => {
    const { result } = res;
    console.debug(res);
    console.debug(result);

    _defaultAddress = result[0];
    web3 = new Web3(window.ethereum);
    web3.eth.defaultAccount = _defaultAddress;
    web3.givenProvider = engine;
    // web3.currentProvider.isDappPocket = true;

    window.web3 = web3;
};

let engine = initEngine();

window.ethereum = engine;
