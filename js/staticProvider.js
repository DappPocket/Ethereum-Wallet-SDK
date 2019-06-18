const inherits = require('util').inherits
const Subprovider = require('web3-provider-engine/subproviders/subprovider.js')

module.exports = StaticProvider

inherits(StaticProvider, Subprovider)

function StaticProvider(defaultAddressGenerator, defaulNetVersionGenerator){
  const self = this;
  self.defaultAddressGenerator = defaultAddressGenerator;
  self.defaulNetVersionGenerator = defaulNetVersionGenerator;

  self.staticResponses = {
    eth_accounts: () => {
        console.log('****eth_accounts');
        return [self.defaultAddressGenerator()];
    },
    eth_coinbase: () => {
        console.log('****eth_coinbase');
        return self.defaultAddressGenerator();
    },
    net_version: () => {
        console.log('****net_version');
        return self.defaulNetVersionGenerator();
    },
  }
}

StaticProvider.prototype.handleRequest = function(payload, next, end){
    // just pass to other
    next()
}

StaticProvider.prototype.handleSyncRequest = function(payload) {
    const self = this;
    console.log('payload.method: ', payload.method);
    var staticResponse = self.staticResponses[payload.method];
    if ('function' === typeof staticResponse) {
        return staticResponse();
    // static response - null is valid response
    } else if (staticResponse !== undefined) {
        console.log(staticResponse)
        return staticResponse;
    // no prepared response - skip
    } else {
        return null;
    }
}
