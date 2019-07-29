import getWallectConnector from './walletConnect';
import RemoteLoginSubprovider from './dappSdkProvider';
import { version } from '../package.json';

const Web3 = require('web3');

const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions');
const StaticProvider = require('./staticProvider');

require('../static/css/bootstrap-iso.css'); // version: 4.3.1

// eslint-disable-next-line no-underscore-dangle
let _defaultAddress;

const rpcUrl = 'https://mainnet.infura.io/v3/056c00b3a8d846369185946435ca1ea3';

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

// Create new web3 and set default account
const defaultEnableCallback = (err, res) => {
    const { result } = res;

    // Create new web3
    const web3 = new Web3(window.ethereum);

    // Set default account
    [_defaultAddress] = result;
    web3.eth.defaultAccount = _defaultAddress;

    window.web3 = web3;
};


const isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
window.isMobile = isMobile;

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

    // Add rpc data source
    eng.addProvider(new RpcSubprovider({ rpcUrl }));

    eng.connected = true;

    eng.isConnected = () => true;

    // Create wallet connector
    const walletConnector = getWallectConnector();

    // Set properties of Dapp SDK
    eng.isDappSdk = true;
    eng.dappSdk = { version };

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

    /**
     * Log out from wallet connect
     * Return Promise
     */
    eng.logout = async (cb = () => {}) => {
        const p = new Promise((resolve, reject) => {
            if (!walletConnector.connected) {
                const err = new Error('User does not log in with wallet connect.');
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

// Create engine of Dapp SDK
const engine = initEngine();

// Set engine and web3
window.ethereum = engine;
window.dappSdkProvider = engine;
web3.givenProvider = engine;
web3.currentProvider = engine;
window.web3 = web3;
