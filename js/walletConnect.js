import WalletConnect from "@walletconnect/browser";
import WalletConnectProvider from 'walletconnect-web3-provider';

// Create a walletConnector
const walletConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org" // Required
});

/**
 * Use web3 provided by WalletConnect
 */
// const provider = new WalletConnectProvider({
//     bridge: "https://bridge.walletconnect.org" // Required
// }

export default walletConnector;
