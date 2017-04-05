const path = require('path');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

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
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|png|gif|jpg|jpe?g|icon?)$/,
      loader: 'url-loader?limit=1118192&name=[name]-[hash].[ext]',
    }, {
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
