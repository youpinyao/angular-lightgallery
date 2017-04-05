'use strict';

const webpack = require('webpack');

const webpackConfig = require('./webpack');

const compiler = webpack(webpackConfig);

// run webpack
compiler.run((err, stats) => {
  console.log(err ? err : '[webpack]: build done!');
  console.log(stats.toString());
});
