var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/ClockPicker'
  ],
  output: {
    libraryTarget: "umd",
    library: "ClockPicker",
    filename: 'ClockPicker.js',
    path: "./dist/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("ClockPicker.css")
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  externals: [
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    },
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },
    {
      "react-bootstrap": {
        root: "ReactBootstrap",
        commonjs2: "react-bootstrap",
        commonjs: "react-bootstrap",
        amd: "react-bootstrap"
      }
    }
  ]
};
