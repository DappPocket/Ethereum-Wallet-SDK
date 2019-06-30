/*
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
console.log('windowProvider', windowProvider);
console.log('windowWeb3', windowWeb3);

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
*/

import WalletConnect from '@walletconnect/browser';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';

// Create a walletConnector
const walletConnector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org' // Required
});

walletConnector.killSession();

// Check if connection is already established
if (!walletConnector.connected) {
    // create new session
    walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        const { uri } = walletConnector;
        console.log(uri);
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
            console.log('QR Code Modal closed');
        });
    });
} else {
    console.log('walletConnector.connected');
}

// Subscribe to connection events
walletConnector.on('connect', (error, payload) => {
    if (error) {
        throw error;
    }

    // Close QR Code Modal
    WalletConnectQRCodeModal.close();

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    console.log('on connect', accounts, chainId);

    // send tx
    const tx = {
        from: accounts[0],
        to: '0x1952d797Ce4D282F6C83Ca32AE9840D869C9BDD1',
        value: '1000000000000000',
        gas: 21000,
    };
    walletConnector.sendTransaction(tx)
        .then((result) => {
            // Returns transaction id (hash)
            console.log(result);
        })
        .catch((error) => {
            // Error returned when rejected
            console.error(error);
        });
    // sign
    // const message = "My email is john@doe.com - 1537836206101";
    // const msgParams = [
    //     accounts,
    //     message,
    // ];
    // walletConnector.signMessage(msgParams)
    // .then((result) => {
    //     // Returns signature.
    //     console.log(result)
    // })
    // .catch(error => {
    //     // Error returned when rejected
    //     console.error(error);
    // })

    // personal sign
    // const message = "My email is john@doe.com - 1537836206101";
    // const msgParams = [
    //     message,
    //     accounts,
    // ];
    // walletConnector.signPersonalMessage(msgParams)
    // .then((result) => {
    //     // Returns signature.
    //     console.log(result)
    // })
    // .catch(error => {
    //     // Error returned when rejected
    //     console.error(error);
    // })
});

walletConnector.on('session_update', (error, payload) => {
    if (error) {
        throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
    console.log('on session_update', accounts, chainId);
});

walletConnector.on('disconnect', (error, payload) => {
    if (error) {
        throw error;
    }
    // Delete walletConnector
    console.log('on disconnect');
});
