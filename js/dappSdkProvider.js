const jwt = require('jsonwebtoken');

const inherits = require('util').inherits
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js')
const uuid = require("uuid");
import dappModal from './dappModal';

export default RemoteLoginSubprovider;

inherits(RemoteLoginSubprovider, Subprovider)

function RemoteLoginSubprovider() {
    var self = this;
    self.alreadyLogin = false;
    self.defaultAddress = '';
    self.walletConnector = null;
}

RemoteLoginSubprovider.prototype.handleRequest = function(payload, next, end){
    var self = this;

    switch(payload.method) {
        // enable
        case 'eth_requestAccounts': {
            console.debug('******* enable(), eth_requestAccounts *******');
            const qrcode_string = 'testforhackathon';
            dappModal.showLoginQrcodeWithString(qrcode_string, end, (login, accounts, walletConnector) => {
                console.log('hihihih accounts: ', accounts);
                self.alreadyLogin = login;
                self.defaultAddress = accounts[0];
                self.walletConnector = walletConnector;
            });
            
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
            .then(result => {
                // Returns transaction id (hash)
                console.log('result: ', result);
                end(null, result);
            })
            .catch(error => {
                // Error returned when rejected
                console.log("error: ", error);
                end(error);
            });
            break;
        }

        case 'eth_sign': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }

            console.log(payload.params);
            const address = payload.params[0]
            const data = payload.params[1]
            // sign
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
            .catch(error => {
                console.log(error);
                // Error returned when rejected
                console.log("error: ", error);
                end(error);
            });
                
            break;
        }

        case 'net_version': {
            break;
        }

        case 'personal_sign': {       
            const data = payload.params[0]
            const address = payload.params[1]
            const password = payload.params[2] || ""      
            // personal sign
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
            .catch(error => {
                // Error returned when rejected
                console.error(error);
                console.log("error: ", error);
                end(error);
            });
            break;
        }


        default: {
            if (payload.method != 'eth_getBlockByNumber') {
                // alert('payload.method: ' + payload.method);
                // alert('payload.params: ' + JSON.stringify(payload.params));
            }
            next();
        }
    }
    
}

const objectToQrueyString = (data) => {
    let result = ''
    for (let key in data) {
        let value = data[key];
        if (result === '') {
            result = `${key}=${value}`;
        } else {
            result = `${result}&${key}=${value}`;
        }
    }
    return result;
}
