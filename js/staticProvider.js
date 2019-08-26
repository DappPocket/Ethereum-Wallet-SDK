const { inherits } = require('util');
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js');

function StaticProvider(defaultAddressGenerator, defaulNetVersionGenerator) {
    const self = this;
    self.defaultAddressGenerator = defaultAddressGenerator;
    self.defaulNetVersionGenerator = defaulNetVersionGenerator;

    self.staticResponses = {
        eth_accounts: () => {
            return [self.defaultAddressGenerator()];
        },
        eth_coinbase: () => {
            return self.defaultAddressGenerator();
        },
        net_version: () => {
            return self.defaulNetVersionGenerator();
        },
    };
}

inherits(StaticProvider, Subprovider);

StaticProvider.prototype.handleRequest = function handleRequest(payload, next, end) {
    // just pass to other
    next();
};

StaticProvider.prototype.handleSyncRequest = function handleSyncRequest(payload) {
    const self = this;
    const staticResponse = self.staticResponses[payload.method];
    if (typeof staticResponse === 'function') {
        return staticResponse();
    // static response - null is valid response
    } if (staticResponse !== undefined) {
        return staticResponse;
    // no prepared response - skip
    }
    return null;
};

module.exports = StaticProvider;
