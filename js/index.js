import getWallectConnector from './walletConnect';
import RemoteLoginSubprovider from './dappSdkProvider';

const Web3 = require('web3');

const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions');
const StaticProvider = require('./staticProvider');

require('../static/css/bootstrap-iso.css'); // version: 4.3.1

// eslint-disable-next-line no-underscore-dangle
let _defaultAddress;
let engine;

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

    [_defaultAddress] = result;
    const web3 = new Web3(window.ethereum);
    web3.eth.defaultAccount = _defaultAddress;
    web3.givenProvider = engine;
    // web3.currentProvider.isDappPocket = true;

    window.web3 = web3;
};


const initEngine = () => {
    const eng = new ProviderEngine();

    // Do not move this subprovider, it should always be the first one

    // static results
    const staticProvider = new StaticProvider(getDefaultAddress, getNetVersion);

    eng.addProvider(staticProvider);

    // Remote login
    eng.addProvider(new RemoteLoginSubprovider());

    // filters
    eng.addProvider(new SubscriptionSubprovider());

    // data source
    eng.addProvider(new RpcSubprovider({
        rpcUrl: 'https://mainnet.infura.io/v3/056c00b3a8d846369185946435ca1ea3',
    }));
    eng.connected = true;

    eng.isConnected = () => true;

    // wallet connect
    const walletConnector = getWallectConnector();

    eng.enable = async (cb = () => {}) => {
        console.log('enable');
        const p = new Promise((resolve, reject) => {
            const rpcData = {
                method: 'eth_requestAccounts',
                payload: {
                    walletConnector,
                },
            };
            eng.sendAsync(rpcData, (err, res) => {
                if (err) {
                    console.log('enable rejected with err: ', err);
                    reject(err);
                }
                console.log('enable resolved, res: ', res);
                defaultEnableCallback(err, res);
                cb(err, res);
                resolve(res);
            });
        });
        return p;
    };

    // Log out function, return promise
    eng.logout = async (cb = () => {}) => {
        const p = new Promise((resolve, reject) => {
            if (!walletConnector.connected) {
                const err = new Error('User does not log in with wallet connect.')
                cb(err, null);
                reject(err);
            } else {
                walletConnector.killSession();
                const res = {
                    message: 'Logout successfully.',
                };
                cb(null, res);
                resolve(res);
            }
        });
        return p;
    };

    // start polling for blocks
    eng.start();
    return eng;
};

engine = initEngine();

window.ethereum = engine;
