const { inherits } = require('util');
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js');
const dappModal = require('./dappModal');

function RemoteLoginSubprovider() {
    const self = this;
    self.alreadyLogin = false;
    self.defaultAddress = '';
    self.walletConnector = null;
}

inherits(RemoteLoginSubprovider, Subprovider);

RemoteLoginSubprovider.prototype.handleRequest = function handleRequest(payload, next, end) {
    const self = this;

    switch (payload.method) {
        // enable
        case 'eth_requestAccounts': {
            console.debug('******* enable(), eth_requestAccounts *******');
            const { payload: { walletConnector } } = payload;

            console.debug(walletConnector);

            dappModal.showLoginQrcodeWithString(
                walletConnector,
                end,
                (login, accounts, connector) => {
                    self.alreadyLogin = login;
                    [self.defaultAddress] = accounts;
                    self.walletConnector = connector;
                },
            );

            break;
        }

        case 'eth_coinbase': {
            console.log('eth_coinbase');
            end(null, self.defaultAddress);
            break;
        }

        case 'eth_accounts': {
            console.log('eth_accounts');
            end(null, [self.defaultAddress]);
            break;
        }

        case 'eth_sendTransaction': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            const txData = payload.params[0];
            console.log('eth_sendTransaction txData: ', txData);
            self.walletConnector
                .sendTransaction(txData)
                .then((result) => {
                    // Returns transaction id (hash)
                    console.log('result: ', result);
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
                    console.log('error: ', error);
                    end(error);
                });
            break;
        }

        case 'eth_sign': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            console.log(payload.params);
            const { params: [address, data] } = payload;
            const msgParams = [
                address,
                data,
            ];
            self.walletConnector.signMessage(msgParams)
                .then((result) => {
                    // Returns signature.
                    console.log('result: ', result);
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
                    console.log('error: ', error);
                    end(error);
                });
            break;
        }

        case 'net_version': {
            break;
        }

        case 'personal_sign': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            const { params: [data, address] } = payload;
            const msgParams = [
                data,
                address,
            ];
            self.walletConnector.signPersonalMessage(msgParams)
                .then((result) => {
                    // Returns signature.
                    console.log('result: ', result);
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
                    console.log('error: ', error);
                    end(error);
                });
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

module.exports = RemoteLoginSubprovider;
