const { inherits } = require('util');
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js');
const TrezorConnect = require('trezor-connect').default;
const EthereumTx = require('ethereumjs-tx').Transaction;

const config = require('./config').default;

function CustomTrezorSubprovider(account) {
    const self = this;
    self.defaultAddress = account;
}

const trezorPath = "m/44'/60'/0'/0/0";

inherits(CustomTrezorSubprovider, Subprovider);

CustomTrezorSubprovider.prototype.handleRequest = async function handleRequest(payload, next, end) {
    const self = this;
    switch (payload.method) {
        // enable
        case 'eth_requestAccounts': {
            break;
        }

        case 'eth_coinbase': {
            end(null, self.defaultAddress);
            break;
        }

        case 'eth_accounts': {
            end(null, [self.defaultAddress]);
            break;
        }

        case 'eth_sendTransaction': {
            const txData = payload.params[0];

            // This props must be added for Trezor
            const nonce = await window.web3.eth.getTransactionCount(txData.from);
            txData.nonce = window.web3.utils.toHex(nonce);
            txData.gasLimit = txData.gas;
            txData.chainId = config.chainId;

            const result = await TrezorConnect.ethereumSignTransaction({
                path: trezorPath,
                transaction: txData,
            });
            const txSignature = result.payload; // v: recover ID, r s : ECDSA signature
            const newTxData = { ...txData, ...txSignature };

            const tx = new EthereumTx(newTxData, { chain: config.network });
            const rawTx = `0x${tx.serialize().toString('hex')}`;
            window.web3.eth.sendSignedTransaction(rawTx)
                .on('transactionHash', (hash) => { end(null, hash); })
                .on('error', err => end(err));
            break;
        }

        case 'eth_sign': {
            const response = await TrezorConnect.ethereumSignMessage({
                path: trezorPath,
                message: payload.params[1],
                hex: true,
            });
            if (response && response.success) {
                const sig = `0x${response.payload.signature}`;
                end(null, sig);
            } else {
                end(response.payload);
            }
            break;
        }

        case 'net_version': {
            break;
        }

        case 'personal_sign': {
            const result = await TrezorConnect.ethereumSignMessage({
                path: trezorPath,
                message: payload.params[1],
                hex: true,
            });
            if (result.success) {
                const sig = `0x${result.payload.signature}`;
                end(null, sig);
            } else {
                end(result.payload);
            }
            break;
        }


        default: {
            if (payload.method !== 'eth_getBlockByNumber') {
                // alert('payload.method: ' + payload.method);
                // alert('payload.params: ' + JSON.stringify(payload.params));
            }
            next();
        }
    }
};

module.exports = CustomTrezorSubprovider;
