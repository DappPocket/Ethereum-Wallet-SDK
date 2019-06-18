const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'dapp-sdk.bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: false,
    mode: 'production',
    // optimization: {
    //     minimizer: [new UglifyJsPlugin({})],
    // },
};