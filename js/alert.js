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
    text: 'Please check your Ledger wallet is connect to your computer and navigate to the Ethereum app.',
    icon: 'warning',
});

const help = title => swal({
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

module.exports = {
    metamask,
    dapper,
    ledger,
    help,
};
