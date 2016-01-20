var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './examples/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ClockPicker.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("ClockPicker.css")
  ],
  module: {
    loaders: [
      { test: /\.jsx?/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  }
};
