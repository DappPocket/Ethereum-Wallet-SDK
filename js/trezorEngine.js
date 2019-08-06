import { version } from '../package.json';

const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions');
const CustomTrezorSubprovider = require('./trezorProvider');
const StaticProvider = require('./staticProvider');

// eslint-disable-next-line no-underscore-dangle
let _defaultAddress;

const rpcUrl = 'https://mainnet.infura.io/v3/056c00b3a8d846369185946435ca1ea3';

const getDefaultAddress = () => {
    if (_defaultAddress !== undefined) {
        return _defaultAddress;
    }
    return '';
};

const getNetVersion = () => 1;

// Create new web3 and set default account

const initTrezorEngine = (account) => {
    const eng = new ProviderEngine();

    // Do not move this subprovider, it should always be the first one

    // static results
    const staticProvider = new StaticProvider(getDefaultAddress, getNetVersion);

    eng.addProvider(staticProvider);

    // Trezor
    eng.addProvider(new CustomTrezorSubprovider(account));

    // filters
    eng.addProvider(new SubscriptionSubprovider());

    // Add rpc data source
    eng.addProvider(new RpcSubprovider({ rpcUrl }));

    eng.connected = true;

    eng.isConnected = () => true;

    // Set properties of Dapp SDK
    eng.isDappSdk = true;
    eng.dappSdk = { version };

    // start polling for blocks
    eng.start();
    return eng;
};

export default initTrezorEngine;
