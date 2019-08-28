const swal = require('sweetalert');
const i18next = require('i18next').default;

const metamask = () => swal({
    title: i18next.t('swal.notFound', { wallet: 'Metamask' }),
    text: i18next.t('swal.pleaseInstall'),
    icon: 'warning',
});

const dapper = () => swal({
    title: i18next.t('swal.notFound', { wallet: 'Dapper' }),
    text: i18next.t('swal.pleaseInstall'),
    icon: 'warning',
});

const dapperIsLocked = () => swal({
    title: 'Dapper is locked',
    text: 'Please login your Dapper wallet.',
    icon: 'warning',
});

const ledger = () => swal({
    title: i18next.t('swal.notFound', { wallet: 'Ledger' }),
    text: i18next.t('swal.checkLedger'),
    icon: 'warning',
});

const trezor = () => swal({
    title: i18next.t('swal.notFound', { wallet: 'Trezor' }),
    text: i18next.t('swal.checkTrezor'),
    icon: 'warning',
});

const wcUnsupport = () => swal({
    title: i18next.t('swal.unsupportedBrowser'),
    content: {
        element: 'div',
        attributes: {
            innerHTML: `
                ${i18next.t('swal.download')}
                <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a>
                ${i18next.t('swal.or')}
                <a href="https://dapppocket.io/" target="_blank">Dapp Pocket</a>
                ${i18next.t('swal.explore')}
            `,
        },
    },
});

const help = () => swal({
    title: i18next.t('swal.help.title', { app: document.title }),
    content: {
        element: 'div',
        attributes: {
            innerHTML: `
                ${i18next.t('swal.help.intro')}
                <a href="https://metamask.io/" target="_blank">MetaMask</a>,
                <a href="https://www.meetdapper.com" target="_blank">Dapper</a>,
                <a href="https://tor.us/" target="_blank">Torus</a>,
                <a href="https://www.portis.io/" target="_blank">Portis</a>,
                <a href="https://www.ledger.com/" target="_blank">Ledger</a>,
                ${i18next.t('swal.help.mobile')}
                <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a>
                ${i18next.t('swal.help.and')}
                <a href="https://dapppocket.io/" target="_blank">Dapp Pocket</a>.
            `,
        },
    },
});

module.exports = {
    metamask,
    dapper,
    dapperIsLocked,
    ledger,
    trezor,
    wcUnsupport,
    help,
};
