var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/components/app.jsx'],
    vendor: ['react']
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
          path.resolve(__dirname, 'src/store')
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
}
