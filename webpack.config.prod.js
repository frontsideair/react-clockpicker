var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/react-clockpicker'
  ],
  output: {
    libraryTarget: "umd",
    library: "react-clockpicker",
    filename: 'react-clockpicker.js',
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
    new ExtractTextPlugin("react-clockpicker.css")
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style", "css") }
    ]
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
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
