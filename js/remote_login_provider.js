const jwt = require('jsonwebtoken');

const inherits = require('util').inherits
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js')
const uuid = require("uuid");
const dapp_qrcode = require('./dapp_qrcode');

module.exports = RemoteLoginSubprovider

inherits(RemoteLoginSubprovider, Subprovider)

function RemoteLoginSubprovider() {
    var self = this;
    self.alreadyLogin = false;
    self.authToken = '';
}

const CHECK_LOGIN_URL = 'https://us-central1-dapp-pocket.cloudfunctions.net/dappLoginTestFunction/auth';
const SEND_REQUEST_URL = 'https://us-central1-dapp-pocket.cloudfunctions.net/dappSendTestFunction';
const SEND_RESULT_URL = 'https://us-central1-dapp-pocket.cloudfunctions.net/dappSendTestFunction/result';

RemoteLoginSubprovider.prototype.handleRequest = function(payload, next, end){
    var self = this;

    switch(payload.method) {
        // enable
        case 'eth_requestAccounts': {
            console.debug('******* enable(), eth_requestAccounts *******');
            // if (self.alreadyLogin) {
            //     console.log('already logged in');
            // }

            /*
            // gen token
            const uuidToken = uuid.v4();
            const dappHost = window.location.host;
            const title = document.title;
            self.authToken = jwt.sign({
                uuid: uuidToken,
            }, 'dapp-pocket-login-secret', { expiresIn: 10 * 60 });
            console.log(self.authToken);

            // gen qrcode with token
            const qrcode_string = `action=login&token=${self.authToken}&dapp=${title}&url=${dappHost}`;
            */

            const qrcode_string = 'testforhackathon';
            dapp_qrcode.showLoginQrcodeWithString(qrcode_string, end, () => {
                // Remove polling timer
                // clearInterval(pollingTimer);
            });
            
            /*
            // polling login info with token every 3 sec
            let pollingTimer = setInterval(() => {
                const url = `${CHECK_LOGIN_URL}?authToken=${self.authToken}&url=${dappHost}`;
                fetch(url).then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw Error('404');
                }).then((data) => {
                    const { msg, account } = data;
                    console.log(`account: ${account}`);
                    self._defaultAddress = account;
                    clearInterval(pollingTimer);
                    dapp_qrcode.dismissQrcode();
                    alreadyLogin = true;
                    end(null, [self._defaultAddress]);
                }).catch((err) => {
                    console.log(`err: ${err}`);
                });
            }, 3000);
            */

            // end(null, ['test']);

            break;
        }

        case 'eth_coinbase': {
            // if (self._defaultAddress === undefined) {
            //     end(Error('Please login.'));
            // } else {
            //     end(null, self._defaultAddress);
            // }
            break;
        }

        case 'eth_accounts': {
            // if (self._defaultAddress === undefined) {
            //     end(Error('Please login.'));
            // } else {
            //     end(null, [self._defaultAddress]);
            // }
            break;
        }
        
        case 'eth_sendTransaction': {
            if (!self.alreadyLogin) {
                end(Error('Please login.'));
            }
            txData = payload.params[0]
            if(!txData.gas) {
                txData.gas = '0xf4240';
            }
            const sendRequestId = uuid.v4();
            const data = {
                txData, sendRequestId, authToken: self.authToken,
            }
            console.log(`token: ${self.authToken}`);
            console.log(JSON.stringify(data));
            // Send send tx request
            fetch(SEND_REQUEST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw Error('404');
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(`err: ${err}`);
            });

            // polling send tx result with token every 3 sec
            let pollingTimer = setInterval(() => {
                const url = `${SEND_RESULT_URL}?authToken=${self.authToken}&sendRequestId=${sendRequestId}`;
                fetch(url).then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw Error('404');
                }).then((data) => {
                    clearInterval(pollingTimer);
                    console.log(data);
                    end(null, data);
                }).catch((err) => {
                    console.log(`err: ${err}`);
                });
            }, 3000);
            break;
        }

        case 'eth_sign': {
            break;
        }

        case 'net_version': {
            break;
        }

        case 'personal_sign': {
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
