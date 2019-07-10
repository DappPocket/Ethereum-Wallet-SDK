const Portis = require('@portis/web3');
const Web3 = require('web3');
const $ = require('jquery');
require('bootstrap');
const modal = require('../static/asset/modal');

// const LocalMessageDuplexStream = require('post-message-stream');
// const MetamaskInpageProvider = require('metamask-inpage-provider');

// const WalletConnect = require("@walletconnect/browser");
// const WalletConnectQRCodeModal = require("@walletconnect/qrcode-modal");

module.exports = {

    showLoginQrcodeWithString: (string, end, onModalDismiss=()=>{}) => {
        // If modal not exist, append it?
        if ($('#dappQrcodeModal').length === 0) {
            $('body').append(modal);
        }

        const title = $(document).find("title").text();
        $('#dapp-title').text(title);

        const iconSrc = `https://www.google.com/s2/favicons?domain=${window.location.href}`;
        $('#dapp-icon').attr('src', iconSrc);
        // console.debug(window.location.href);

        // Add dismiss handler
        const listener = () => {
            console.log('on dappQrcodeModal close');
            onModalDismiss();
            $("#dappQrcodeModal").off();
        }

        $("#dappQrcodeModal").on("hidden.bs.modal", listener);

        $("#use-metamask-btn").click(() => {
            $("#loaderModal").modal('show');
            if(!windowProvider.isMetaMask) {
                console.debug('Can\'t find MetaMask');
                return;
            }
            console.debug('Use MetaMask');

            window.ethereum = windowProvider;
            window.web3 = windowWeb3;

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.log('res: ', res);
                $("#loaderModal").modal('hide');
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });
        $("#use-dapper-btn").click(() => {
            $("#loaderModal").modal('show');
            if(!windowProvider.isDapper) {
                console.debug('Can\'t find Dapper');
                return;
            }

            console.debug('Use Dapper');

            window.ethereum = windowProvider;
            window.web3 = windowWeb3;

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.log('res: ', res);
                $("#loaderModal").modal('hide');
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });
        $("#use-portis-btn").click(() => {
            console.debug('Use Portis');
            $("#loaderModal").modal('show');

            const portis = new Portis('696237e9-38fb-406a-a4d6-bfa3a4d63293', 'mainnet');
            const web3 = new Web3(portis.provider);
            window.ethereum = portis.provider;
            window.web3 = web3;
            portis.showPortis();

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.debug('res: ', res);
                $("#loaderModal").modal('hide');
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });
        $("#use-torus-btn").click(() => {
            console.debug('Use Torus');

            require("@toruslabs/torus-embed");

            $("#loaderModal").modal('show');
            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.debug('res: ', res);
                $("#loaderModal").modal('hide');
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
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

    dismissQrcode: () => {
        $('#dappQrcodeModal').modal('hide');
    },
};

const toggleQrcode = () => {
    $('#dappQrcodeModal').modal();
};
