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
            const { payload: { walletConnector } } = payload;


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
            end(null, self.defaultAddress);
            break;
        }

        case 'eth_accounts': {
            end(null, [self.defaultAddress]);
            break;
        }

        case 'eth_sendTransaction': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            const txData = payload.params[0];
            self.walletConnector
                .sendTransaction(txData)
                .then((result) => {
                    // Returns transaction id (hash)
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
                    end(error);
                });
            break;
        }

        case 'eth_sign': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            const { params: [address, data] } = payload;
            const msgParams = [
                address,
                data,
            ];
            self.walletConnector.signMessage(msgParams)
                .then((result) => {
                    // Returns signature.
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
                    end(error);
                });
            break;
        }

        case 'net_version': {
            next();
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
                    end(null, result);
                })
                .catch((error) => {
                    // Error returned when rejected
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
