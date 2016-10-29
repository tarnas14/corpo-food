var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/components/app.jsx'],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'react-router-redux',
            'redux-thunk',
            'node-polyglot',
            'locale',
            'socket.io-client',
            'bootstrap-webpack!./bootstrap.config.js',
        ],
    },

    output: {
        path: path.resolve(__dirname, './src/public/'),
        filename: '[name].js',
        publicPath: '/public/',
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',

                include: [
                    path.resolve(__dirname, 'src/components'),
                    path.resolve(__dirname, 'src/store'),
                    path.resolve(__dirname, 'src/validators'),
                    path.resolve(__dirname, 'src/utils'),
                ],

                test: [/\.js$/, /\.jsx$/],
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
            },
        ],
    },

    resolve: {extensions: ['', '.js', '.jsx']},

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery',
        }),
    ],

    devtool: 'source-map',
};
