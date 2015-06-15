var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(9000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:9000');
  });


var Bus = require("roof/lib/mixin/react.js")
var Bus = require("roof/lib/util/serverRendering.js")

var Bus = require("roof").Bus
var Bus = require("roof").Node
var Bus = require("roof").Nodes