var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: {
    eventPages: './src/eventPages/index',
    contentScripts: './src/contentScripts/parsePage'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exlucde: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './manifest.json'
      }
    ]),
    new ExtractTextPlugin('[name].css')
  ]
};

module.exports = config;
