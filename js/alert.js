const swal = require('sweetalert');

const metamask = () => swal({
    title: 'Can\'t find MetaMask',
    text: 'Please enable or install it in the app store of your browser.',
    icon: 'warning',
});

const dapper = () => swal({
    title: 'Can\'t find Dapper',
    text: 'Please enable or install it in the app store of your browser.',
    icon: 'warning',
});

const ledger = () => swal({
    title: 'Can\'t find Ledger',
    text: 'Please check your Ledger wallet is connected to your computer and navigate to the Ethereum app.',
    icon: 'warning',
});

const trezor = () => swal({
    title: 'Can\'t find Trezor',
    text: 'Please check your trezor wallet is connected to your computer.',
    icon: 'warning',
});

const wcUnsupport = () => swal({
    title: 'Unsupported Browser',
    content: {
        element: 'div',
        attributes: {
            innerHTML: `
                Download <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a> or <a href="https://dapppocket.io/" target="_blank">Dapp Pocket</a> to explore the blockchain world!
            `,
        },
    },
});

const help = () => swal({
    title: `Welcome to ${document.title}!`,
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

module.exports = {
    metamask,
    dapper,
    ledger,
    trezor,
    wcUnsupport,
    help,
};
