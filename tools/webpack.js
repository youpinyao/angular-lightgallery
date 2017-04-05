const path = require('path');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  devtool: 'source-map',
  entry: {
    index: './angular-lightgallery.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'eslint-loader!babel-loader',
      exclude: /node_modules/,
    }]
  },
  babel: {
    presets: ['es2015']
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

module.exports = webpackConfig;
