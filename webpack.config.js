var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/js/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'components': __dirname + '/src/js/components',
      'data': __dirname + '/src/js/data',
      'utils': __dirname + '/src/js/utils',
    },
  },
  output: {
    path: __dirname + '/www',
    publicPath: '/',
    filename: 'flight-planner.min.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
