const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'dapp-sdk.bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()], // for ES6
    },
};