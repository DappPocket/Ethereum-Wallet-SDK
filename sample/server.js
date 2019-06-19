
var express = require('express');
var fs = require('fs');
var path = require('path');

//setting middleware
function start(route) {
	var app = express();

	console.log('Server start...');

	app.get('/', (req, res) => {
    	console.log("Request received.");
		fs.readFile('./sample/sample.html',(err, data) => {
			res.writeHead(200, {"Content-Type": "text/html", 'Content-Length':data.length});
			res.write(data);
			res.end();
		});
	})

	app.use('/static', express.static(path.join(__dirname, '../static')));
	var server = app.listen(8080);
}
/*
var test = () => {
	const ProviderEngine = require('web3-provider-engine')
	const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
	const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
	const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
	const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
	const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js')
	const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
	const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
	const Web3 = require('web3');

	var engine = new ProviderEngine()
	// static results
	engine.addProvider(new FixtureSubprovider({
	  web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
	  net_listening: true,
	  eth_hashrate: '0x00',
	  eth_mining: false,
	  eth_syncing: true,
	}))

	// cache layer
	engine.addProvider(new CacheSubprovider())

	// filters
	engine.addProvider(new FilterSubprovider())

	// pending nonce
	engine.addProvider(new NonceSubprovider())

	// vm
	engine.addProvider(new VmSubprovider())

	// id mgmt
	engine.addProvider(new HookedWalletSubprovider({
	  getAccounts: function(cb){ 
	  	cb(null, ['0x1952d797Ce4D282F6C83Ca32AE9840D869C9BDD1']) 
	  },
	  approveTransaction: function(txParams, cb) {  
	  	cb(null, true) 
	  },
	  signTransaction: function(txData, cb) {
	  	console.log('In signTransaction: self defined signTx.')
	  	cb(null, '0xfake_tx')
	  },
	}))

	// data source
	engine.addProvider(new RpcSubprovider({
	  rpcUrl: 'https://ropsten.infura.io/CRsRtBcNBIT6mykVudx0',
	}))

	// network connectivity error
	engine.on('error', function(err){
	  // report connectivity errors
	  console.error(err.stack)
	})

	// start polling for blocks
	engine.start()

	var web3 = new Web3(engine)

	var defulat_address

	console.log('current provider ', web3.currentProvider)

	web3.eth.getAccounts(
		(err, accounts) => {
			defulat_address = accounts[0]
			console.log('get account result: ', accounts);

		}
	)

	web3.eth.signTransaction({
	    from: '0x1952d797Ce4D282F6C83Ca32AE9840D869C9BDD1',
	    to: '0x1952d797Ce4D282F6C83Ca32AE9840D869C9BDD1',
	    value: '10000000000',
	    gas: 21000,
	}, '0x1952d797Ce4D282F6C83Ca32AE9840D869C9BDD1', (err, result) => {
		console.log('signed result:')
		console.log(result);
	})

}
*/
exports.start = start;