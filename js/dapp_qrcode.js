const Portis = require('@portis/web3');
const Web3 = require('web3');
const $ = require('jquery');
require('bootstrap');
const WalletConnect = require("@walletconnect/browser");
const WalletConnectQRCodeModal = require("@walletconnect/qrcode-modal");

module.exports = {
    
    showLoginQrcodeWithString: (string, end, onModalDismiss=()=>{}) => {
        const encodeString = encodeURIComponent(string);

        // If modal not exist, append it?
        if ($('#dappQrcodeModal').length === 0) {
            $('body').append('\
            <!-- Modal -->\
            <div id="dappQrcodeModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
                <div class="modal-dialog" role="document">\
                <div class="modal-content mx-auto" style="width: 400px;">\
                    <div class="modal-header">\
                        <h5 class="modal-title" id="exampleModalLabel">Choose your favorite wallet!</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                            <span aria-hidden="true">&times;</span>\
                        </button>\
                    </div>\
                    <div class="modal-body">\
                        <image id="use-metamask-btn" width="40%" src="https://en.bitcoinwiki.org/upload/en/images/thumb/e/eb/Metamask.png/400px-Metamask.png">\
                        <br>\
                        <image width="40%" class="mt-3" src="https://tor.us/assets/img/torus-logo.svg">\
                        <br>\
                        <image id="use-portis-btn" width="40%" class="mt-3" src="https://assets.portis.io/portis-logo/logo_with_name_medium.png">\
                        <br>\
                        <image width="40%" class="mt-3" src="https://cdn.worldvectorlogo.com/logos/ledger.svg">\
                        <br>\
                        <image id="use-wc-btn" width="40%" class="mt-3" src="https://discuss.walletconnect.org/uploads/default/original/1X/4626bb8c421ab0f5f869eb7a55852e9eba7442e4.png">\
                        <br>\
                        <image width="40%" class="mt-2" src="https://i.imgur.com/ZDO9KJO.png">\
                    </div>\
                </div>\
                </div>\
            </div>\
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\
            ');
        }
        
        // Add dismiss handler
        const listener = () => {
            console.log('on dappQrcodeModal close');
            onModalDismiss();
            $("#dappQrcodeModal").off();
        }
        $("#dappQrcodeModal").on("hidden.bs.modal", listener);
        $("#use-metamask-btn").click(() => {
            console.debug('Use MetaMask');
            console.debug(metamaskProvider);

            ethereum = metamaskProvider;
            web3 = metamaskWeb3;
            window.ethereum = metamaskProvider;
            window.web3 = metamaskWeb3;

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.log('res: ', res);
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });
        $("#use-portis-btn").click(() => {
            console.debug('Use Portis');

            const portis = new Portis('696237e9-38fb-406a-a4d6-bfa3a4d63293', 'mainnet');
            const web3 = new Web3(portis.provider);
            window.ethereum = portis.provider;
            window.web3 = web3;
            portis.showPortis();

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.debug('res: ', res);
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });
        $("#use-wc-btn").click(() => {
            console.debug('Use WC');

            // Create a walletConnector
            const walletConnector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org" // Required
            });
            
            // Check if connection is already established
            if (!walletConnector.connected) {
                // create new session
                walletConnector.createSession().then(() => {
                // get uri for QR Code modal
                const uri = walletConnector.uri;
                // display QR Code modal
                WalletConnectQRCodeModal.open(uri, () => {
                    console.log("QR Code Modal closed");
                });
                });
            }

            $('#dappQrcodeModal').modal('hide');
            window.ethereum.enable().then((res) => {
                console.debug('res: ', res);
                end(null, res);
            }).catch((err)=>{
                end(err);
            });
        });

        // document.getElementById("qrcode").src=`http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=${encodeString}`;

        toggleQrcode();
    },

    dismissQrcode: () => {
        $('#dappQrcodeModal').modal('hide');
    }
}
const toggleQrcode = () => { 
    $('#dappQrcodeModal').modal();
}