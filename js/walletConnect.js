import WalletConnect from '@walletconnect/browser';

const setupWalletConnector = (walletConnector) => {
    walletConnector.on('session_update', (error, payload) => {
        if (error) {
            throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
    });

    walletConnector.on('disconnect', (error, payload) => {
        if (error) {
            throw error;
        }

        // Delete walletConnector
        // eslint-disable-next-line no-alert
        alert('Log out successfully.');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    });
};

const getWallectConnector = () => {
    // Create a walletConnector
    const walletConnector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
    });

    setupWalletConnector(walletConnector);

    return walletConnector;
};

export default getWallectConnector;
