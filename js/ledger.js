const ProviderEngine = require('web3-provider-engine');
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch');
const LedgerWalletProvider = require('@ledgerhq/web3-subprovider');
const TransportU2F = require('@ledgerhq/hw-transport-u2f').default;

const createLedgerSubprovider = LedgerWalletProvider.default;

const networkId = 1;
const rpcUrl = 'https://mainnet.infura.io/v3/056c00b3a8d846369185946435ca1ea3';
const legacyPath = "44'/60'/0'/0";
const ledgerLivePath = "44'/60'/0'/0/0";

/**
 * Create a provider engine of Ledger
 * Support path m/44'/60'/0'/0 or 44'/60'/0'/0/0
 * Use U2F (it only works with HTTPS)
 * Based on the official example: https://github.com/LedgerHQ/ledgerjs/blob/master/docs/ethereum_ledger_integration.md#creating-a-web3-instance.
 */
function createWeb3Engine(pathName) {
    const engine = new ProviderEngine();
    let path;
    if (pathName === 'legacyPath') {
        path = legacyPath;
    } else {
        path = ledgerLivePath;
    }

    const getTransport = () => TransportU2F.create();
    const ledger = createLedgerSubprovider(getTransport, {
        networkId,
        accountsLength: 1, // If you set more than 1, user will need to confirm for each account
        path,
        // askConfirm: true,  // If true, user will need to confirm when get account
        // accountsOffset: number,
    });
    engine.addProvider(ledger);
    engine.addProvider(new FetchSubprovider({ rpcUrl }));
    engine.start();
    return engine;
}

module.exports = createWeb3Engine;
