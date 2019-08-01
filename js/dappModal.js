const WalletConnectQRCodeModal = require('@walletconnect/qrcode-modal').default;
const swal = require('sweetalert');
const Portis = require('@portis/web3');
const Web3 = require('web3');
const $ = require('jquery');
require('bootstrap');

const modal = require('../static/asset/modal');
const { windowWeb3, windowProvider } = require('./global');

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
    showLoginQrcodeWithString: (walletConnector, end, onLoginSuccess = () => {}) => {
        // If modal not exist, append it?
        if ($('#dappQrcodeModal').length === 0) {
            $('body').append(modal);
        }

        if (window.isMobile) {
            $('#use-metamask-btn').css('display', 'none');
            $('#use-dapper-btn').css('display', 'none');
            $('#use-ledger-btn').css('display', 'none');
        }

        // Set modal title
        const title = $(document).find('title').text();
        $('#dapp-title').text(title);
        const iconSrc = `https://www.google.com/s2/favicons?domain=${window.location.href}`;
        $('#dapp-icon').attr('src', iconSrc);
        // console.debug(window.location.href);

        // Set modal intro
        $('#modal-intro').text('Choose your favorite wallet');

        // Add dismiss handler
        const listener = () => {
            console.debug('on dappQrcodeModal close');
            $('#dappQrcodeModal').off();
        };

        $('#dappQrcodeModal').on('hidden.bs.modal', listener);

        $('#use-metamask-btn').click(() => {
            if (!(windowProvider && windowProvider.isMetaMask)) {
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
            if (!(windowProvider && windowProvider.isDapper)) {
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
        $('#use-wc-btn').click(() => {
            console.debug('Use WalletConnect');

            if (window.isMobile) { // Mobile
                if (windowWeb3 && windowProvider) { // Web3-compatible wallets
                    windowWeb3.eth.getAccounts((err, res) => {
                        if (err) {
                            modalHide();
                            end(err);
                        }
                        modalHide();
                        window.web3 = windowWeb3;
                        window.ethereum = windowProvider;
                        end(null, res);
                    });
                } else { // Web3-incompatible, e.g., Chrome, Firefox
                    swal({
                        title: 'Fasten your seat belts!',
                        content: {
                            element: 'div',
                            attributes: {
                                innerHTML: `
                                    Download <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a> or <a href="https://dapppocket.io/" target="_blank">Dapp Pocket</a> to explore the blockchain world!
                                `,
                            },
                        },
                    });
                }
            } else { // Broswer
                modalHide();

                if (walletConnector.connected) {
                    walletConnector.killSession();
                }

                // create new session
                walletConnector.createSession().then(() => {
                    // get uri for QR Code modal
                    const { uri } = walletConnector;
                    // display QR Code modal
                    WalletConnectQRCodeModal.open(uri, () => {
                        console.debug('QR Code Modal closed');
                    });
                });

                // Subscribe to connection events
                walletConnector.on('connect', (error, payload) => {
                    if (error) {
                        throw error;
                    }

                    // Close QR Code Modal
                    WalletConnectQRCodeModal.close();

                    // Get provided accounts and chainId
                    const { accounts, chainId } = payload.params[0];
                    onLoginSuccess(true, accounts, walletConnector);
                    end(null, accounts);
                });
            }
        });
        $('#help-button').click(() => {
            swal({
                title: `Welcome to ${title}!`,
                content: {
                    element: 'div',
                    attributes: {
                        innerHTML: `
                            You will need a <storng>Ethereum account</strong> to start exploring.
                            You can get a Ethereum account from a wallet application.
                            There are many wallets, here are the wallets we support:
                            <a href="https://metamask.io/" target="_blank">MetaMask</a>,
                            <a href="https://www.meetdapper.com" target="_blank">Dapper</a>,
                            <a href="https://tor.us/" target="_blank">Torus</a>,
                            <a href="https://www.portis.io/" target="_blank">Portis</a>,
                            <a href="https://www.ledger.com/" target="_blank">Ledger</a>,
                            and mobile wallet apps that support Wallet Connect like
                            <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a> and
                            <a href="https://dapppocket.io/" target="_blank">Dapp Pocket</a>.
                        `,
                    },
                },
            });
        });

        toggleQrcode();
    },
};
