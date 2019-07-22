const swal = require('sweetalert');
const Portis = require('@portis/web3');
const Web3 = require('web3');
const $ = require('jquery');
require('bootstrap');
const modal = require('../static/asset/modal');

// const LocalMessageDuplexStream = require('post-message-stream');
// const MetamaskInpageProvider = require('metamask-inpage-provider');

// const WalletConnect = require("@walletconnect/browser");
// const WalletConnectQRCodeModal = require("@walletconnect/qrcode-modal");

const modalShow = () => {
    $('#dappQrcodeModal').modal('show');
};

const modalHide = () => {
    $('#dappQrcodeModal').modal('hide');
};

const modalStartLoading = () => {
    $('#walletGroup').hide();
    $('#spinner').show();
};

const toggleQrcode = () => {
    $('#dappQrcodeModal').modal();
};

module.exports = {

    showLoginQrcodeWithString: (string, end, onModalDismiss = () => {}) => {
        // If modal not exist, append it?
        if ($('#dappQrcodeModal').length === 0) {
            $('body').append(modal);
        }

        // Set modal title
        const title = $(document).find('title').text();
        $('#dapp-title').text(title);
        const iconSrc = `https://www.google.com/s2/favicons?domain=${window.location.href}`;
        $('#dapp-icon').attr('src', iconSrc);
        // console.debug(window.location.href);

        // Add dismiss handler
        const listener = () => {
            console.log('on dappQrcodeModal close');
            onModalDismiss();
            $('#dappQrcodeModal').off();
        };

        $('#dappQrcodeModal').on('hidden.bs.modal', listener);

        $('#use-metamask-btn').click(() => {
            if (!windowProvider.isMetaMask) {
                console.debug('Can\'t find MetaMask');
                swal({ title: 'Can\'t find MetaMask', text: 'Please enable or install it in the app store of your browser.', icon: 'warning' });
                return;
            }
            console.debug('Use MetaMask');

            window.ethereum = windowProvider;
            window.web3 = windowWeb3;

            modalStartLoading();
            window.ethereum.enable().then((res) => {
                console.log('res: ', res);
                modalHide();
                end(null, res);
            }).catch((err) => {
                modalHide();
                end(err);
            });
        });
        $('#use-dapper-btn').click(() => {
            if (!windowProvider.isDapper) {
                console.debug('Can\'t find Dapper');
                swal({ title: 'Can\'t find Dapper', text: 'Please enable or install it in the app store of your browser.', icon: 'warning' });
                return;
            }

            console.debug('Use Dapper');

            window.ethereum = windowProvider;
            window.web3 = windowWeb3;

            modalStartLoading();
            window.ethereum.enable().then((res) => {
                console.log('res: ', res);
                modalHide();
                end(null, res);
            }).catch((err) => {
                modalHide();
                end(err);
            });
        });
        $('#use-portis-btn').click(() => {
            console.debug('Use Portis');

            const portis = new Portis('696237e9-38fb-406a-a4d6-bfa3a4d63293', 'mainnet');
            const web3 = new Web3(portis.provider);
            window.ethereum = portis.provider;
            window.web3 = web3;
            portis.showPortis();

            modalStartLoading();
            window.ethereum.enable().then((res) => {
                console.debug('res: ', res);
                modalHide();
                end(null, res);
            }).catch((err) => {
                modalHide();
                end(err);
            });
        });
        $('#use-torus-btn').click(() => {
            console.debug('Use Torus');

            // Create web3 of Torus
            require('@toruslabs/torus-embed');

            modalStartLoading();
            const timerID = setInterval(() => {
                // Check if Web3 of Torus is loaded
                if (web3.currentProvider.isTorus) {
                    window.ethereum.enable().then((res) => {
                        console.debug('res: ', res);
                        modalHide();
                        end(null, res);
                    }).catch((err) => {
                        modalHide();
                        end(err);
                    });
                    clearInterval(timerID);
                }
            }, 1000);
        });
        // $("#use-wc-btn").click(() => {
        //     console.debug('Use WC');

        //     // Create a walletConnector
        //     const walletConnector = new WalletConnect({
        //         bridge: "https://bridge.walletconnect.org" // Required
        //     });

        //     // Check if connection is already established
        //     if (!walletConnector.connected) {
        //         // create new session
        //         walletConnector.createSession().then(() => {
        //         // get uri for QR Code modal
        //         const uri = walletConnector.uri;
        //         // display QR Code modal
        //         WalletConnectQRCodeModal.open(uri, () => {
        //             console.log("QR Code Modal closed");
        //         });
        //         });
        //     }

        //     $('#dappQrcodeModal').modal('hide');
        //     window.ethereum.enable().then((res) => {
        //         console.debug('res: ', res);
        //         end(null, res);
        //     }).catch((err)=>{
        //         end(err);
        //     });
        // });

        // document.getElementById("qrcode").src=`http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=${encodeString}`;

        toggleQrcode();
    },
};
