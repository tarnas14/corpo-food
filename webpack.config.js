var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/components/app.jsx'],
        vendor: ['react', 'react-dom', 'react-bootstrap', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'node-polyglot', 'locale', 'socket.io-client']
    },

    output: {
        filename: './src/public/[name].js'
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',

                include: [
                    path.resolve(__dirname, 'src/components'),
                    path.resolve(__dirname, 'src/store'),
                    path.resolve(__dirname, 'src/validators')
                ],

                test: [/\.js$/, /\.jsx$/]
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: './src/public/vendor.js'
        })
    ],

    devtool: 'source-map'
};
